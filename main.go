package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/exp/rand"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("mysql", "smrithika:musicpassword@tcp(127.0.0.1:3316)/musicdb")
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatalf("Failed to ping the database: %v", err)
	}

	log.Println("Database connected successfully")
}

func signup(c *gin.Context) {
	var request struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	_, err = DB.Exec("INSERT INTO login (username, email, Password) VALUES (?, ?, ?)", request.Username, request.Email, string(hashedPassword))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
}

func login(c *gin.Context) {
	var request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&request); err != nil {
		log.Printf("Error binding JSON: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var userId int
	var hashedPassword string
	err := DB.QueryRow("SELECT user_id, password FROM login WHERE email = ?", request.Email).Scan(&userId, &hashedPassword)
	if err != nil {
		log.Printf("Database query error: %v\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	log.Printf("Fetched User ID: %d, Hashed Password: %s\n", userId, hashedPassword)

	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(request.Password)); err != nil {
		log.Printf("Password mismatch for user %s\n", request.Email)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	log.Printf("User %s logged in successfully\n", request.Email)
	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "userId": userId})
}

func GetRandomImage(c *gin.Context) {
	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM images").Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	rand.Seed(uint64(time.Now().UnixNano()))
	randomIndex := rand.Intn(count)

	var imageData []byte
	err = DB.QueryRow("SELECT image_data FROM images LIMIT ?, 1", randomIndex).Scan(&imageData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}


	c.Header("Content-Type", "image/jpeg")
	c.Header("Content-Length", fmt.Sprintf("%d", len(imageData)))
	c.Data(http.StatusOK, "image/jpeg", imageData)
}

func uploadAudio(c *gin.Context) {
	userId := c.PostForm("userId")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	file, err := c.FormFile("audio")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve the file"})
		return
	}

	filePath := fmt.Sprintf("./uploads/%s/", userId)
	os.MkdirAll(filePath, os.ModePerm) 

	fullPath := filePath + file.Filename
	if err := c.SaveUploadedFile(file, fullPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save the file"})
		return
	}

	
	_, err = DB.Exec("INSERT INTO audio_files (user_id, file_path) VALUES (?, ?)", userId, fullPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file record in the database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})
}

func getAudioFiles(c *gin.Context) {
    userId := c.Query("userId")
    if userId == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User  ID is required"})
        return
    }

    rows, err := DB.Query("SELECT file_path FROM audio_files WHERE user_id = ?", userId)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch files"})
        return
    }
    defer rows.Close()

    var files []string
    for rows.Next() {
        var filePath string
        if err := rows.Scan(&filePath); err == nil {
       
            fileName := filepath.Base(filePath) 
            files = append(files, fileName)
        }
    }

    c.JSON(http.StatusOK, gin.H{"files": files})
}
func deleteAudioFile(c *gin.Context) {
	userId := c.DefaultQuery("userId", "")
	fileName := c.DefaultQuery("fileName", "")

	if userId == "" || fileName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID and file name are required"})
		return
	}

	
	filePath := fmt.Sprintf("./uploads/%s/%s", userId, fileName)
	if err := os.Remove(filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete the file from the server"})
		return
	}

	_, err := DB.Exec("DELETE FROM audio_files WHERE user_id = ? AND file_path = ?", userId, filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete the file record from the database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File deleted successfully"})
}



func main() {
	InitDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "DELETE","OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Define routes
	r.POST("/signup", signup)
	r.POST("/login", login)
	r.GET("/random-image", GetRandomImage)
	r.POST("/upload", uploadAudio)
	r.GET("/files", getAudioFiles)
	r.Static("/audio", "./uploads")
	r.DELETE("/delete", deleteAudioFile)



	log.Println("Server is running on port 8080")
	r.Run(":8080")
}

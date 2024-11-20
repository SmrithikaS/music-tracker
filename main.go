package main

import (
	"database/sql"
	"net/http"
	"log"
	// "music-practice-tracker/database"
	//"github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {

	InitDB()

    r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3316"}, // Replace with your frontend's URL
		AllowMethods:     []string{"GET", "POST", "OPTIONS"}, // Allow only these methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Allow these headers
		AllowCredentials: true,
	}))

    r.POST("/signup", signup)
    r.POST("/login", login)

	log.Println("Server is running on port 8080")
	r.Run(":8080")
}

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
	//defer DB.Close()

    r := gin.Default()

    r.POST("/signup", signup)
    r.POST("/login", login)

    r.Run(":8080") 
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
        Password string `json:"Password"`
    }

    if err := c.BindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    var hashedPassword string
    err := DB.QueryRow("SELECT password FROM login WHERE email = ?", request.Email).Scan(&hashedPassword)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(request.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

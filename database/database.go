package database

// import (
// 	"database/sql"
// 	"log"


//     "net/http"

//     "github.com/gin-gonic/gin"
//     _ "github.com/go-sql-driver/mysql"
//     "golang.org/x/crypto/bcrypt"
// )

// var DB *sql.DB

// func InitDB() {
// 	var err error
// 	// Update the connection string to use the Docker MySQL container
// 	DB, err = sql.Open("mysql", "smrithika:musicpassword@tcp(127.0.0.1:3316)/musicdb")
// 	if err != nil {
// 		log.Fatalf("Failed to connect to the database: %v", err)
// 	}

// 	// Ping the database to verify the connection
// 	err = DB.Ping()
// 	if err != nil {
// 		log.Fatalf("Failed to ping the database: %v", err)
// 	}

// 	log.Println("Database connected successfully")
// 	defer DB.Close()

//     r := gin.Default()

//     r.POST("/signup", signup)
//     r.POST("/login", login)

//     r.Run(":8080") // Backend runs on localhost:8080
// }

// func signup(c *gin.Context) {
//     var request struct {
//         Username string `json:"username"`
//         Email    string `json:"email"`
//         Password string `json:"password"`
//     }
// 	if err := c.BindJSON(&request); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
//         return
//     }

//     hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
//         return
//     }

//     _, err = DB.Exec("INSERT INTO login (username, email, password) VALUES (?, ?, ?)", request.Username, request.Email, string(hashedPassword))
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving user"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
// }
// func login(c *gin.Context) {
//     var request struct {
//         Email    string `json:"email"`
//         Password string `json:"password"`
//     }

//     if err := c.BindJSON(&request); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
//         return
//     }

//     var hashedPassword string
//     err := DB.QueryRow("SELECT password FROM users WHERE email = ?", request.Email).Scan(&hashedPassword)
//     if err != nil {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
//         return
//     }

//     if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(request.Password)); err != nil {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
// }



const express = require("express");
const initializeDatabase = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const JWT_SECRET = "MY_SECRET_KEY";

// Middleware to read JSON request bodies
app.use(express.json());

// Database connection
let db;

// User Registration API
app.post("/register/", async (request, response) => {
    try {
        const { username, name, password } = request.body;

        // Validate required fields
        if (!username || !name || !password) {
            return response.status(400).json({
                error: "Username, name and password are required"
            });
        }

        // Check whether username already exists
        const existingUser = await db.get(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (existingUser) {
            return response.status(400).json({
                error: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        await db.run(
            "INSERT INTO users (username, name, password) VALUES (?, ?, ?)",
            [username, name, hashedPassword]
        );

        return response.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
});

// User Login API
app.post("/login/", async (request, response) => {
    try {
        const { username, password } = request.body;

        // Validate required fields
        if (!username || !password) {
            return response.status(400).json({
                error: "Username and password are required"
            });
        }

        // Find user by username
        const user = await db.get(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (!user) {
            return response.status(400).json({
                error: "Invalid user"
            });
        }

        // Compare entered password with hashed password
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return response.status(400).json({
                error: "Invalid password"
            });
        }

        // Generate JWT token containing only username
        const jwtToken = jwt.sign(
            { username: username },
            JWT_SECRET
        );

        return response.status(200).json({
            jwt_token: jwtToken
        });

    } catch (error) {
        console.error("Login error:", error.message);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
});

// Start server after database initialization
const startServer = async () => {
    try {
        db = await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Unable to start server:", error.message);
    }
};

startServer();

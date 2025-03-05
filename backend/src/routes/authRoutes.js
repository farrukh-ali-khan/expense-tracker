const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: "Sign up a new user"
 *     description: "Register a new user with name, email, and password."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice"
 *               email:
 *                 type: string
 *                 example: "alice@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: "User successfully created"
 *       400:
 *         description: "User already exists or invalid input"
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: "Login an existing user"
 *     description: "Authenticate a user and return a JWT token."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "alice@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: "Authentication successful"
 *       400:
 *         description: "Invalid credentials"
 */
router.post("/login", authController.login);

module.exports = router;

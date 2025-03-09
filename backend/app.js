require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const prisma = require("./src/config/prisma");

// Import the aggregated routes from our routes index file
const routes = require("./src/routes/index");

// Import Swagger configuration
const { swaggerDocs, swaggerUi } = require("./src/swagger");

const app = express();

// Middleware
app.use(helmet());
// backend/app.js
// Add to backend app.js before routes

// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} ${req.url}`);
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api", routes);

// Swagger UI Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Global error handler (should be registered after routes)
const errorHandler = require("./src/middleware/errorHandler");
app.use(errorHandler);

app.get("/api/db-check", async (req, res) => {
  try {
    console.log("Prisma instance:", prisma); // Debug check
    const result = await prisma.$queryRaw`SELECT version()`;
    res.json({ databaseVersion: result[0].version });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      prismaStatus: prisma ? "Initialized" : "Undefined", // Debug info
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
 // Example of Neon-related code (commented out)
 const http = require("http");
 const { neon } = require("@neondatabase/serverless");

 const sql = neon(process.env.DATABASE_URL);

 const requestHandler = async (req, res) => {
   const result = await sql`SELECT version()`;
   const { version } = result[0];
   res.writeHead(200, { "Content-Type": "text/plain" });
   res.end(version);
 };

 http.createServer(requestHandler).listen(3000, () => {
   console.log("Server running at http://localhost:3000");
 });
*/

// *** Rate Limiting & Security Enhancements *** :

// Implement rate limiting (e.g., using packages like express-rate-limit) to prevent abuse.
// Consider adding input sanitization (e.g., using xss-clean) to protect against cross-site scripting.
// Use secure HTTP headers (Helmet is already in use, but review your configuration).
//  *** Environment & Configuration Management *** :

// Separate configuration for development, staging, and production (using tools like dotenv or configuration management libraries).
// Ensure sensitive data is securely managed (e.g., JWT secrets, database credentials).
//  *** Logging & Monitoring *** :

// Enhance logging with a more robust logger like Winston or Bunyan to log errors and important events.
// Consider integrating with a monitoring solution (like Sentry, New Relic, or Loggly) to track errors in production.
//  *** Testing *** :

// Develop comprehensive unit and integration tests for your endpoints (using frameworks like Jest, Mocha, or Supertest).
// Set up CI/CD pipelines to run tests automatically on commit or pull requests.
// Caching:

// For endpoints that are read-heavy (like summaries or reports), consider caching responses using Redis or a similar solution to improve performance.
//  *** API Versioning *** :

// As your API evolves, consider versioning your endpoints (e.g., /api/v1/...) to avoid breaking changes for existing clients.
//  *** Soft Deletes *** :

// Instead of hard deleting records, consider implementing soft deletes (e.g., adding a deletedAt field) to maintain historical data and for audit purposes.
//  *** Additional Endpoints & Features *** :

// Password reset endpoints.
// User profile update endpoints.
// Notifications or email integration (if needed for reminders on recurring transactions, for example).

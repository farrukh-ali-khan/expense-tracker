const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         name:
   *           type: string
   *         email:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *     UserInput:
   *       type: object
   *       required:
   *         - name
   *         - email
   *         - password
   *       properties:
   *         name:
   *           type: string
   *         email:
   *           type: string
   *         password:
   *           type: string
   *
   *     Category:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         name:
   *           type: string
   *         type:
   *           type: string
   *           enum: [INCOME, EXPENSE]
   *         userId:
   *           type: integer
   *     CategoryInput:
   *       type: object
   *       required:
   *         - name
   *         - type
   *         - userId
   *       properties:
   *         name:
   *           type: string
   *         type:
   *           type: string
   *           enum: [INCOME, EXPENSE]
   *         userId:
   *           type: integer
   *
   *     Transaction:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         description:
   *           type: string
   *         amount:
   *           type: number
   *         date:
   *           type: string
   *           format: date-time
   *         categoryId:
   *           type: integer
   *         userId:
   *           type: integer
   *     TransactionInput:
   *       type: object
   *       required:
   *         - description
   *         - amount
   *         - date
   *         - categoryId
   *       properties:
   *         description:
   *           type: string
   *         amount:
   *           type: number
   *         date:
   *           type: string
   *           format: date-time
   *         categoryId:
   *           type: integer
   *
   *     Budget:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         amount:
   *           type: number
   *         month:
   *           type: string
   *         categoryId:
   *           type: integer
   *         userId:
   *           type: integer
   *         createdAt:
   *           type: string
   *           format: date-time
   *     BudgetInput:
   *       type: object
   *       required:
   *         - amount
   *         - month
   *         - categoryId
   *       properties:
   *         amount:
   *           type: number
   *         month:
   *           type: string
   *           example: "2025-03"
   *         categoryId:
   *           type: integer
   */

  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description: "API documentation for the Expense Tracker application",
      contact: {
        name: "Farrukh",
        email: "Farrukh@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
  },
  // Paths to files containing OpenAPI definitions (e.g., route files, controllers)
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };

# Expense Tracker

Expense Tracker is a web application that helps users manage their expenses efficiently. It provides features to add, edit, and delete expenses, and visualize spending patterns.

## Project Structure

### Backend

The backend is responsible for handling the server-side logic, database interactions, and API endpoints.

### Frontend

The frontend is responsible for the user interface and client-side logic.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL (or any other supported database)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies for both backend and frontend:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the [backend](http://_vscodecontentref_/2) directory and add your database connection string and other necessary environment variables.
   - Create a `.env.local` file in the [frontend](http://_vscodecontentref_/3) directory and add any necessary environment variables.

4. Run database migrations:
   ```sh
   cd backend
   npx prisma migrate dev
   ```

### Running the Application

1. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

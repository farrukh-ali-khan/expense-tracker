#!/bin/bash
# Step 1: Create a new Next.js app with TypeScript
yarn create next-app frontend --typescript && \
echo "Next.js app created successfully!" || \
{ echo "Error creating Next.js app."; exit 1; }

# Step 2: Change into the project directory
cd frontend || { echo "Error: frontend folder not found"; exit 1; }
echo "Entered frontend directory successfully!"

# Step 3: Install essential packages for data fetching and API calls
yarn add axios swr && \
echo "Axios and SWR installed successfully!" || \
echo "Error installing axios and swr."

# Step 4: Install Tailwind CSS along with PostCSS and Autoprefixer for styling
yarn add -D tailwindcss postcss autoprefixer && \
echo "Tailwind CSS and dependencies installed successfully!" || \
echo "Error installing Tailwind CSS packages."

# Step 5: Initialize Tailwind CSS configuration
npx tailwindcss init -p && \
echo "Tailwind CSS config initialized!" || \
echo "Error initializing Tailwind CSS config."

# Step 6: Start the development server
yarn dev && \
echo "Development server started successfully!" || \
echo "Error starting the development server."

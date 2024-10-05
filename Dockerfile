# Use Node.js base image for React
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the React app will run on (default 3000 for dev mode)
EXPOSE 3000

# Start React app in development mode
CMD ["npm", "run", "start"]
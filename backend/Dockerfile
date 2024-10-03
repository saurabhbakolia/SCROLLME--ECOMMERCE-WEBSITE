# Use official Node.js image as the base
FROM node:20-alpine

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Copy the node_modules folder from your local machine
COPY node_modules ./node_modules

# Copy the rest of the application code
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
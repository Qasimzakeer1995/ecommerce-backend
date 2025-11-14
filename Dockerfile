# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Default command to start the app
CMD ["npm", "run", "start"]

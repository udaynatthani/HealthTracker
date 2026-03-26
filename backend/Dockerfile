# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy rest of the code
COPY . .

# Expose your backend port (change if needed)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
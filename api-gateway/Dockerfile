FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install ALL packages (including nodemon)
RUN npm ci

# Copy source files
COPY . .

EXPOSE 3000

# Fire up nodemon using package.json script
CMD ["npm", "run", "dev"]

FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install ALL packages (including nodemon)
RUN npm ci

# Copy source files
COPY . .

EXPOSE 3002

HEALTHCHECK --interval=10s --timeout=3s --retries=3 --start-period=10s \
  CMD wget -qO- http://localhost:3002/health || exit 1

# Fire up nodemon using package.json script
CMD ["npm", "run", "dev"]

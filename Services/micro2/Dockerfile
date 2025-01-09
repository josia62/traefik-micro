FROM node:22.8.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 4001 REST and 8001 GRPC
EXPOSE 4001 8001

# Start the app
CMD npm run start

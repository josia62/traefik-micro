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

# Expose port 4000 REST and 8000 GRPC
EXPOSE 4000 8000

# Start the app
CMD npm run start

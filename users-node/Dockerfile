# Layer 1: Telling Docker to use the node:17-alpine image as the base image for the container.
# FROM node:17-alpine
FROM node:20.11.1-alpine

# We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

# Use script specified in package,json
CMD ["npm", "run", "dev"]


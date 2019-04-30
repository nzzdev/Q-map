# Use following version of Node as the base image
FROM node:10

# Set work directory for run/cmd
WORKDIR /app

# Copy everthing to work directory
COPY . /app
RUN npm install -g jspm
RUN npm install --production
RUN jspm install

# Expose server port
EXPOSE 3000

# Run node
CMD ["node", "/app/index.js"]

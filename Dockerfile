FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#kafka broker
ENV KAFKA_BROKER=host.docker.internal:9092

# Set the environment variable for port number
ENV PORT=8004

# Expose the port
EXPOSE 8004

CMD ["node", "src/server.js"]
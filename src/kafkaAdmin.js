// const { Kafka } = require('kafkajs');
import { Kafka } from 'kafkajs';
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})
const admin = kafka.admin()
console.log(await admin.listTopics())

// remember to connect and disconnect when you are done
await admin.connect()
await admin.disconnect()

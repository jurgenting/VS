import { Kafka } from 'kafkajs';


const kafkaBroker = process.env.KAFKA_BROKER.replaceAll(' ', '').split(',') || 'host.docker.internal:9092';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [kafkaBroker]
});

const producer = kafka.producer();

export const runProducer = async () => {
  await producer.connect();
};

export const sendMessage = async (topic, message) => {
  const result = await producer.send({
    topic,
    messages: [{ value: message }],
  });
  return result;
};


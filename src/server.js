import express from 'express';
import bodyParser from 'body-parser';
import { runProducer, sendMessage } from './kafkaProducer.js';

var messageCount = 0;

const app = express();
const port = process.env.PORT || 8004;

app.use(bodyParser.json());

// Post Messages to Kafka topics
app.post('/topics/:message', async (req, res) => {
  console.log(req.url)
  // const testStr = '/topics/my-topic/'
  const topic = req.url.split('/')[2];
  console.log(topic)
  const message = JSON.stringify(req.body);

  try {
    const result = await sendMessage(topic, message);
    console.log(result)
    const partition = result[0].partition
    const offset = result[0].baseOffset
    console.log("partition = %d, offset = %s", partition, offset);
    messageCount = messageCount + 1;
    console.log("messageCount = %d", messageCount)
    res.json({ partition, offset });
  } catch (error) {
    res.status(500).send('Error sending message to Kafka');
  }
});

const startServer = async () => {
  await runProducer();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();

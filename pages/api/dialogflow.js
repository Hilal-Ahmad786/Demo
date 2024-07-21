import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Ensure the GOOGLE_APPLICATION_CREDENTIALS environment variable is set
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'elaborate-truth-428317-v6-4734c2d1a20d.json');
}

const sessionClient = new SessionsClient();

export default async (req, res) => {
  const { query } = req.body;
  const sessionId = uuidv4();
  const sessionPath = sessionClient.projectAgentSessionPath('elaborate-truth-428317-v6', sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: 'tr',
      },
    },
  };

  try {
    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;

    res.json({ response: result.fulfillmentText });
  } catch (error) {
    console.error('Error detecting intent:', error);
    res.status(500).json({ error: 'Error detecting intent' });
  }
};

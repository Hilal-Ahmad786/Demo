import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { query } = req.body;
  
  const projectId = 'elaborate-truth-428317-v6';
  const sessionId = uuidv4();
  const sessionClient = new SessionsClient();

  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: 'tr', // Use Turkish language code
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.status(200).json({ fulfillmentText: result.fulfillmentText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// pages/api/dialogflow.js
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const projectId = 'elaborate-truth-428317-v6'; // Replace with your Dialogflow project ID
    const sessionId = uuidv4();
    const languageCode = 'tr'; // Turkish language code

    try {
        const sessionClient = new SessionsClient();
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.query,
                    languageCode: languageCode,
                },
            },
        };

        const [response] = await sessionClient.detectIntent(request);
        const result = response.queryResult;

        res.status(200).json({
            fulfillmentText: result.fulfillmentText,
            intent: result.intent.displayName,
        });
    } catch (error) {
        console.error('Dialogflow API request error:', error);
        res.status(500).json({ error: 'Failed to process the request' });
    }
}

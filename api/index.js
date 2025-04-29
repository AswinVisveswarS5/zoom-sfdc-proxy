import axios from 'axios';

export default async function handler(req, res) {
  const targetURL = process.env.SALESFORCE_ENDPOINT;

  if (!targetURL) {
    return res.status(500).send("SALESFORCE_ENDPOINT is not configured.");
  }

  try {
    const method = req.method;
    const headers = {
      'Content-Type': req.headers['content-type'] || 'application/json'
    };

    let response;

    if (method === 'POST') {
      // Ensure body is parsed correctly
      const body =
        typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');

      response = await axios.post(targetURL, body, { headers });
    } else if (method === 'GET') {
      response = await axios.get(targetURL, { headers });
    } else {
      return res.status(405).send('Method Not Allowed');
    }

    return res.status(response.status).send(`Forwarded to Salesforce: ${response.status}`);
  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    return res.status(500).send('Failed to forward to Salesforce');
  }
}

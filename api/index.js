const axios = require('axios');

module.exports = async function handler(req, res) {
  // Check for Zoom's challenge request (GET with 'challenge' query param)
  if (req.method === 'GET' && req.query.challenge) {
    console.log('Zoom CRC challenge received:', req.query.challenge);

    // Respond with the challenge token in a JSON body
    return res.status(200).json({ challenge: req.query.challenge });
  }

  const targetURL = 'https://orgfarm-6f123a62a3-dev-ed.develop.my.salesforce-sites.com/services/apexrest/ZoomWebhook/';

  try {
    const response = await axios({
      method: req.method,
      url: targetURL,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      data: req.body,
      validateStatus: false
    });

    res.status(response.status).send(`Forwarded to Salesforce: ${response.status}`);
  } catch (error) {
    console.error('Proxy forwarding error:', error.message);
    res.status(500).send('Failed to forward to Salesforce');
  }
};

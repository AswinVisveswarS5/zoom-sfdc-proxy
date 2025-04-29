module.exports = async function handler(req, res) {
  console.log('Zoom validation request received');
  
  // Always immediately respond 200 OK for GET (Zoom Validation)
  if (req.method === 'GET') {
    return res.status(200).send('Zoom validation OK');
  }

  const axios = require('axios');
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

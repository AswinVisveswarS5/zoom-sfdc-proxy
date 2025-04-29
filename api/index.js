const axios = require('axios');

module.exports = async function handler(req, res) {
  const targetURL = 'https://orgfarm-6f123a62a3-dev-ed.develop.my.salesforce-sites.com/services/apexrest/ZoomWebhook/';

  try {
    const response = await axios({
      method: req.method,
      url: targetURL,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      data: req.method === 'POST' ? req.body : undefined,
      validateStatus: false // allows handling 4xx/5xx
    });

    console.log('✅ Forwarded successfully:', response.status);
    res.status(response.status).send(`Forwarded to Salesforce: ${response.status}`);
  } catch (error) {
    console.error('❌ Proxy forwarding failed:', error.message);
    res.status(500).send('Failed to forward to Salesforce');
  }
};

const axios = require("axios");

export default async function handler(req, res) {
  const targetURL = process.env.SALESFORCE_ENDPOINT;

  if (!targetURL) {
    return res.status(500).send("Salesforce endpoint not configured.");
  }

  try {
    const forwardRes = await axios({
      method: req.method,
      url: targetURL,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json"
      },
      data: req.body,
      validateStatus: false // So we can forward even non-200
    });

    res
      .status(forwardRes.status)
      .send(`Forwarded to Salesforce: ${forwardRes.status}`);
  } catch (err) {
    console.error("Forwarding error:", err);
    res.status(500).send("Failed to forward to Salesforce");
  }
}

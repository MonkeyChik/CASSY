// api-chat.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', // Replace with your actual OpenAI API key
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const botResponse = data.choices[0].text;

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

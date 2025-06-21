
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const sendMessage = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendMessage };

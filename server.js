import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.XAI_API_KEY}`
        },
        body: JSON.stringify({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userMessage }
            ],
            model: 'grok-4-latest',
            stream: false
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });
});

app.listen(3000, () => console.log('Servidor escoltant al port 3000'));

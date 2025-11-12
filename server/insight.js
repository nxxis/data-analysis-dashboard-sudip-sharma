import "dotenv/config"; 
import express from 'express';
import cors from 'cors';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import OpenAI from 'openai';

console.log('🔍 Checking environment variables...');
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10));
console.log('-----')

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('✅ OpenAI provider configured successfully');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/insight', async (req, res) => {
  try {
    const { prompt } = req.body;
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt, 
      maxTokens: 500,
    });
    res.json({ insight: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI call failed' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI insight server is running' });
});



// POST /generate-image
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, size = "1024x1024" } = req.body || {};
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    // Use the Images API - model name may be "gpt-image-1" 
    const response = await openaiClient.images.generate({
      model: "dall-e-3",
      prompt,
      size, // "1024x1024"
      response_format: "b64_json"
    });

    // Newer SDK returns base64 in response.data[0].b64_json
    const b64 = response?.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(502).json({ error: 'No image returned from provider' });
    }

    // Return a data URL so front-end can display <img src={dataUrl} />
    const dataUrl = `data:image/png;base64,${b64}`;
    res.json({ image: dataUrl });
  } catch (err) {
    console.error('Error generating image', err);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀AI insight and Image server listening on port ${PORT}`);
});
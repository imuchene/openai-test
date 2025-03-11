import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openAI = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

async function main(){
  const completion = await openAI.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant'}],
    model: 'deepseek-chat'
  });

  console.log('completion', completion.choices[0].message.content)
}

main();
import '@dotenvx/dotenvx/config';
import OpenAI from 'openai';


// Querying OpenAI
const openAI = new OpenAI();
const response = await openAI.chat.completions.create({
  model: 'gpt-4o-mini',
  temperature: 0,
  messages: [
    {
      role: 'system',
      content: `You are a helpful assistant that recommends products to users.`
    },
    {
      role: 'user',
      content: `I'm looking for a pair of running shoes.`
    }
  ]
})

console.log('response', response.choices[0]);


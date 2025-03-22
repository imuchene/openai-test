import '@dotenvx/dotenvx/config';
import  { OpenAI } from 'openai';
import { getProductId } from '../realtime-data/lib/get-product-id.js';

const functions: any = {
  async recommendProduct(obj: { description: string }) {
    console.log('Recommend product function called by OpenAI', obj.description);
    const productId = await getProductId(obj.description);

    return {
      url: `https://example.com/products/${productId}`
    }
  }
}



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
      content: `I'm a skater. I'm looking for skateboarding shoes.`
    }
  ],
  functions: [
    {
      name: 'recommendProduct',
      description: 'Takes a description and returns a recommended product',
      parameters: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: "A short description of the product the user is looking for, ideally a copy paste from the user's message"
          }
        }
      }
    }
  ],
})

console.log('response', response.choices[0]);

const function_call = response.choices[0].message.function_call;


console.log('function call', function_call);


if (function_call) {
  const fn = functions[function_call.name];
  const args = JSON.parse(function_call.arguments);
  const result = await fn(args);
  console.log('result', result);
}


import '@dotenvx/dotenvx/config';
import { OpenAI } from 'openai';
import { ChatCompletionTool } from 'openai/resources/index';
import { getProductId } from '../realtime-data/lib/get-product-id';


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

const tools: ChatCompletionTool[] = [{
  type: 'function',
  function: {
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
}]

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
  tools: tools,
  store: true,
})

console.log('response', response.choices[0]);

const tool_calls = response.choices[0].message.tool_calls;

console.log('tool calls', tool_calls);


if (tool_calls) {
  const fn = functions[tool_calls[0].function.name];
  const args = JSON.parse(tool_calls[0].function.arguments);
  const result = await fn(args);
  console.log('result', result);
}


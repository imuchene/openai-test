import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openAI = new OpenAI();

const functions: any = {
  add: (obj: { num1: number, num2: number}) => {
    const sum = obj.num1 + obj.num2;
    console.log('Sum is', sum);
  },
  subtract: (obj: { num1: number, num2: number}) => {
    const difference = obj.num1 - obj.num2;
    console.log('Difference is', difference);
  }
}


const response = await openAI.chat.completions.create({
  model: 'gpt-4o-mini',
  store: true,
  messages: [
    {
      role: "system",
      content: "You are a smart calculator."
    },
    {
      role: "user",
      content: "How much is 10 minus 2?"
    }
  ],
  functions: [
    {
      name: 'add',
      description: 'Adds two numbers',
      parameters: {
        type: 'object',
        properties: {
          num1: {
            type: 'number'
          },
          num2: {
            type: 'number'
          }
        }
      }
    },
    {
      name: 'subtract',
      description: 'Subtracts two numbers',
      parameters: {
        type: 'object',
        properties: {
          num1: {
            type: 'number'
          },
          num2: {
            type: 'number'
          }
        }
      }
    }
  ]
})

console.log('response choices', response.choices[0]);

const function_call = response.choices[0].message.function_call

if (function_call) {
  const name = function_call.name;
  const args = JSON.parse(function_call.arguments)

  const fn = functions[name];

  fn(args);
}
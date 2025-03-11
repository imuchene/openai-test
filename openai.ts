import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openAI = new OpenAI();

const goal = 'Renovate a kitchen';
const numTasks = 5


const response = await openAI.chat.completions.create({
  model: 'gpt-4o-mini',
  store: true,
  messages: [

    {
      role: 'system',
      content: `
      
      You are a talented task planner. 
      
      The user will tell you their goals and you will generate a list of tasks for them.
      
      You must respond in JSON, strictly following the following schema:

      {
        tasks: {
        title: string, // Max 120 characters
        description: string, // Max 120 characters
        difficulty: "easy" | "medium" | "hard"
         }[]
      }

      `
    },
    {
      role: 'user',
      content: `Tell me how to achieve ${goal}, produce ${numTasks} tasks`
    }
  ]
})

console.log('response choices', JSON.parse(response.choices[0].message.content as string));
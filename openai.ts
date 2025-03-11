import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openAI = new OpenAI();

const knowledge = {
  NewYork: {
    stock: {
      "Nike SB": {
        "size 9": 1,
        "size 10": 1,
        "size 11": 3,
        "size 12": 4
      }
    }
  },
  LosAngeles: {
    stock: {
      "Nike SB": {
        "size 13": 1,
      }
    }
  }
}

const response = await openAI.chat.completions.create({
  model: 'gpt-4o-mini',
  store: true,
  messages: [
    // {
    //   role: 'system',
    //   content: 'You are an angry chat bot that responds in upper case letters and is very rude.'
    // },
    // {
    //   role: 'system',
    //   content: 'You are a sophisticated bot who responds in morse code.'
    // },
    // {
    //   role: 'system',
    //   content: 'You are the BestShoes chat bot, make sure to introduce yourself as BestShoes Bot on your first interaction with the user. '
    // },
    {
      role: 'system',
      content: `You are the BestShoes chat bot. Here is your entire knowledge. You know nothing but this knowledge: ${JSON.stringify(knowledge)}`
    },
    // {
    //   role: 'user',
    //   content: 'My name is Isaiah, a software engineer and football player. Greet me.'
    // }
    {
      role: 'user',
      content: 'Hey, I want to buy Nike SB shoes size 13. Do you have them in stock in New York?'
    }
  ]
})

console.log('response', response);
console.log('response choices', response.choices);
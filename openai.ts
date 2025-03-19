import dotenv from 'dotenv';
import OpenAI from 'openai';
import { LlamaParseReader, VectorStoreIndex, Settings, TextNode } from 'llamaindex';

dotenv.config();

const reader = new LlamaParseReader({ resultType: 'text' });
const document = await reader.loadData('./embeddings/thesis.pdf');

Settings.chunkSize = 4000;
Settings.chunkOverlap = 500;


console.log('Creating the index');
const index = await VectorStoreIndex.fromDocuments(document);
console.log('index created', index);

const query = 'Which technologies can be used to solve congestion at airports?';


const retriever = index.asRetriever({ similarityTopK: 3 });

const matchingNodes = await retriever.retrieve({ query: query });

const knowledge = matchingNodes.map(node => {
  const textNode = node.node as TextNode;
  return textNode.text;
}).join('\n\n');

// Querying OpenAI

const openAI = new OpenAI();
const response = await openAI.chat.completions.create({
  model: 'gpt-4o-mini',
  temperature: 0,
  messages: [
    {
      role: 'system',
      content: `You are an aviation expert. Here is your knowledge to answer the user's  question: ${knowledge}`
    },
    {
      role: 'user',
      content: query,
    }
  ]
})

console.log('response', response.choices[0]);

import dotenv from 'dotenv';
import OpenAI from 'openai';
import { LlamaParseReader, storageContextFromDefaults, VectorStoreIndex } from 'llamaindex';

dotenv.config();

const reader = new LlamaParseReader({ resultType: 'text'});
const document = await reader.loadData('./embeddings/thesis.pdf');
const storageContext = await storageContextFromDefaults({
  persistDir: './storage'
});


console.log('Creating the index');
const index = await VectorStoreIndex.fromDocuments(document, storageContext);

console.log('index created', index);

const openAI = new OpenAI();

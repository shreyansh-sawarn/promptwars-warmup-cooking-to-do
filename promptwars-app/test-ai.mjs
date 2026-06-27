import { GoogleGenAI } from '@google/genai';

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: "test" });
    console.log("SDK initialized correctly.");
  } catch (error) {
    console.error("SDK Error:", error);
  }
}

test();

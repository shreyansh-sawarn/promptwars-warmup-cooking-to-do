import { GoogleGenAI, Type } from '@google/genai';

async function test() {
  const ai = new GoogleGenAI({ apiKey: "bad_key" });
  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: { test: { type: Type.STRING } },
      required: ["test"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "say hi",
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });
    console.log("Success", response.text);
  } catch (error) {
    console.error("SDK Error Message:", error.message);
  }
}

test();

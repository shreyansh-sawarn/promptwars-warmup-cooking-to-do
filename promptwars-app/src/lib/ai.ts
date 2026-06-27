import { GoogleGenAI, Type } from '@google/genai';

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the exact JSON schema required for the response
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    breakfast: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        prepTimeMins: { type: Type.INTEGER },
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
        instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["name", "prepTimeMins", "ingredients", "instructions"]
    },
    lunch: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        prepTimeMins: { type: Type.INTEGER },
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
        instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["name", "prepTimeMins", "ingredients", "instructions"]
    },
    dinner: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        prepTimeMins: { type: Type.INTEGER },
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
        instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["name", "prepTimeMins", "ingredients", "instructions"]
    },
    groceryList: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Comprehensive list of all ingredients needed for the day."
    },
    substitutions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING },
          substitute: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["original", "substitute", "reason"]
      }
    },
    budgetLogic: {
      type: Type.OBJECT,
      properties: {
        estimatedCost: { type: Type.INTEGER },
        withinBudget: { type: Type.BOOLEAN },
        savingsTips: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["estimatedCost", "withinBudget", "savingsTips"]
    },
    adaptationSummary: {
      type: Type.STRING,
      description: "A 1-2 sentence explanation of how the plan was adapted to their specific day, pantry, and constraints."
    }
  },
  required: ["breakfast", "lunch", "dinner", "groceryList", "substitutions", "budgetLogic", "adaptationSummary"]
};

export async function generateMealPlan(data: Record<string, string | number>) {
  const prompt = `
You are a master culinary planner and budget optimizer.
Create a personalized daily cooking to-do list based EXACTLY on this user's day:

Budget: ₹${data.budget}
Dietary Preference: ${data.diet}
Number of People: ${data.people}
Time Available: ${data.time} minutes
Cooking Experience: ${data.experience}
Day Description / Constraints: "${data.dayDescription}"

Constraints:
1. Adapt the meal complexity, prep time, and macros directly to their day description and time available.
2. If they have pantry items, use them to minimize grocery cost.
3. Ensure the estimated cost respects the budget constraint.
4. Include an 'adaptationSummary' explaining exactly how you adapted the meal plan to fit their schedule, budget, and pantry constraints in 1-2 sentences.
5. Return ONLY valid JSON matching the exact schema. No markdown, no explanation.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for consistent JSON structure
      }
    });

    if (!response.text) {
      throw new Error("No text returned from Gemini");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate meal plan. Please try again.");
  }
}

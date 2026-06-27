"use client";

import { useState } from "react";

type Meal = {
  name: string;
  prepTimeMins: number;
  ingredients: string[];
  instructions: string[];
};

type Substitution = {
  original: string;
  substitute: string;
  reason: string;
};

type BudgetLogic = {
  estimatedCost: number;
  withinBudget: boolean;
  savingsTips: string[];
};

type MealPlan = {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  groceryList: string[];
  substitutions: Substitution[];
  budgetLogic: BudgetLogic;
  adaptationSummary: string;
};

export default function Home() {
  const [formData, setFormData] = useState({
    budget: "",
    diet: "None",
    people: "1",
    time: "",
    experience: "Intermediate",
    dayDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMealPlan(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: Number(formData.budget),
          diet: formData.diet,
          people: Number(formData.people),
          time: Number(formData.time),
          experience: formData.experience,
          dayDescription: formData.dayDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate meal plan");
      }

      setMealPlan(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderMeal = (title: string, meal: Meal) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}: {meal.name}</h3>
      <p className="text-sm text-zinc-500 mb-4">Prep time: {meal.prepTimeMins} mins</p>
      
      <div className="mb-4">
        <h4 className="font-medium mb-1">Ingredients:</h4>
        <ul className="list-disc list-inside text-sm text-zinc-700">
          {meal.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Instructions:</h4>
        <ol className="list-decimal list-inside text-sm text-zinc-700">
          {meal.instructions.map((step, idx) => (
            <li key={idx} className="mb-1">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-zinc-50 p-6 sm:p-12 text-zinc-900 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Cooking To-Do Planner</h1>
          <p className="text-zinc-600">Tell us about your day, and we&apos;ll plan your meals!</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-zinc-200 h-fit">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="budget" className="block text-sm font-medium">Budget (₹)</label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  required
                  placeholder="e.g. 500"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="time" className="block text-sm font-medium">Time (mins)</label>
                  <input
                    id="time"
                    name="time"
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 30"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="people" className="block text-sm font-medium">People</label>
                  <input
                    id="people"
                    name="people"
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 2"
                    value={formData.people}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="diet" className="block text-sm font-medium">Diet</label>
                  <select
                    id="diet"
                    name="diet"
                    value={formData.diet}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="None">None</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Keto">Keto</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium">Skill</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermed</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dayDescription" className="block text-sm font-medium">Describe your day</label>
                <textarea
                  id="dayDescription"
                  name="dayDescription"
                  required
                  rows={3}
                  placeholder="e.g. Busy workday, gym after work. I have eggs and rice."
                  value={formData.dayDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-medium py-3 px-4 rounded-md hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {loading ? "Planning..." : "Generate Meal Plan"}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7" aria-live="polite">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200 mb-6">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-zinc-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                <p>Analyzing your day and crafting the perfect plan...</p>
              </div>
            )}

            {!loading && !error && !mealPlan && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-zinc-400 border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center bg-zinc-50/50">
                <p>Your personalized meal plan, grocery list, and budget analysis will appear here.</p>
              </div>
            )}

            {!loading && mealPlan && (
              <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* Wow Feature: Day-Aware Adaptation Summary */}
                <section className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-sm">
                  <h3 className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                    <span className="text-xl">✨</span> Why this plan?
                  </h3>
                  <p className="text-indigo-800 text-sm leading-relaxed">
                    {mealPlan.adaptationSummary}
                  </p>
                </section>

                {/* Budget Logic */}
                <section className={`p-6 rounded-lg shadow-sm border ${mealPlan.budgetLogic.withinBudget ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <h3 className="text-xl font-semibold mb-2">Budget Analysis</h3>
                  <p className="mb-2">
                    Estimated Cost: <span className="font-bold">₹{mealPlan.budgetLogic.estimatedCost}</span> 
                    {' '}({mealPlan.budgetLogic.withinBudget ? "Within Budget 🎉" : "Over Budget ⚠️"})
                  </p>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Savings Tips:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {mealPlan.budgetLogic.savingsTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Meals */}
                <section>
                  <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Menu</h2>
                  {renderMeal("Breakfast", mealPlan.breakfast)}
                  {renderMeal("Lunch", mealPlan.lunch)}
                  {renderMeal("Dinner", mealPlan.dinner)}
                </section>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Grocery List */}
                  <section className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-bold mb-4">Grocery List</h3>
                    <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
                      {mealPlan.groceryList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  {/* Substitutions */}
                  <section className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-bold mb-4">Substitutions</h3>
                    <ul className="space-y-3 text-sm text-zinc-700">
                      {mealPlan.substitutions.map((sub, idx) => (
                        <li key={idx} className="border-b pb-2 last:border-0">
                          <p><span className="font-medium line-through">{sub.original}</span> ➔ <span className="font-medium text-green-700">{sub.substitute}</span></p>
                          <p className="text-zinc-500 text-xs mt-1">{sub.reason}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

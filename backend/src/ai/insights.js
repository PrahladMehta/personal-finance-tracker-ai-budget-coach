const { Configuration, OpenAIApi } = require("openai");
const db = require('../db'); // Assuming a database connection is established here

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateFinancialInsights(userId, financialData) {
  try {
    //Sanitize user input to prevent injection attacks.  This is a placeholder and needs robust implementation.
    const sanitizedData = sanitizeInputData(financialData);

    const prompt = `Analyze the following financial data and provide personalized insights and recommendations:\n\n${JSON.stringify(sanitizedData, null, 2)}\n\nUser ID: ${userId}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or a suitable model
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
      n: 1,
      stop: null,
      temperature: 0.7, // Adjust for creativity vs. accuracy
    });

    const insights = response.data.choices[0].text.trim();
    return insights;
  } catch (error) {
    console.error("Error generating financial insights:", error);
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    }
    throw new Error("Failed to generate financial insights.");
  }
}


// Placeholder for input sanitization.  Replace with a robust solution.
function sanitizeInputData(data) {
  //Implement robust input sanitization here to prevent vulnerabilities.
  return data;
}


module.exports = { generateFinancialInsights };
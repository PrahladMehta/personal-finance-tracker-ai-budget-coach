const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateText(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or another suitable model
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
      n: 1,
      stop: null,
      temperature: 0.7, // Adjust as needed
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    }
    throw new Error("Failed to generate text from OpenAI API.");
  }
}


module.exports = { generateText };
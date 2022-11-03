const { Configuration, OpenAIApi } = require("openai");
import dotenv from "dotenv";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env" });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const predictOperation = async (text: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Convert this text to a programmatic command:\n\nExample: Can you please add the following numbers together - 13 and 25\nOutput: addition, 13, 25\n\nExample: Remove 5 from 10\nOutput: subtraction, 5, 10\n\nExample: Please add these numbers together\nOutput: addition\n\n${text}\n`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
  });

  console.log(response.data.choices[0].text);
  return response.data.choices[0].text;
};

export default predictOperation;

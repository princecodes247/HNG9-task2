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
  console.log(text);

  const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: `Perform the arithmetic operation given and return the operation type and result.\nRules:\n1. Division is not allowed\n2. Multiple operations would be computed and the returned operator_type should be:\noperation1 - operation2\n\nExample: Can you please add the following numbers together - 13 and 25\nOutput: addition, 38\n\nExample: Remove 5 from 10\nOutput: subtraction, 5\n\nExample: Remove 6 from 10 then, multiply the result by 3\nOutput: subtraction - multiplication, 12\n\nExample: Please add these numbers together\nOutput: addition\n\nExample: What is 4 divided by 2\nOutput: Operation not allowed, 0\n\nExample: divide 8 by 4\nOutput: Operation not allowed, 0\n\nExample: What is 4 plus 3 minus 7\nOutput: subtraction - addition, 0\n\nExample: please add -40 and 99 then multiply the result by 4\nOutput:subtraction - multiplication, -156\n\n ${text}`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
  });

  let result = response.data.choices[0].text?.trim();
  // Remove "Output: " if it exists
  if (result.startsWith("Output: ")) {
    result = result.slice(8);
  }
  return result;
};

export default predictOperation;

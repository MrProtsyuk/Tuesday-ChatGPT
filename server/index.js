import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = 3001;

import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  organization: "org-eLYEcR9RvI7O6ow2tt60gjdA",
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    temperature: 0,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  console.log(response.data);
  if (response.data.choices) {
    res.json({ message: response.data.choices[0].text });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

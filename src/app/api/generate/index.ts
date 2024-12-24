import OpenAI from "openai";
import { ChatCompletion } from "openai/resources/index.mjs";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function generateNames(description: string, gender: string): Promise<ChatCompletion> {
	const chatCompletion = await client.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				"role": "developer",
				"content": [
					{
						"type": "text",
						"text": `You are a helpful assistant tasked with coming up with names for AI agent applications.
		Names are in the format <FIRST NAME> the <TITLE>. An example is "Brian the AI notetaker."
		Use the description provided by the user to come up with names. If a title is given in the description, use that title in the first generated name.
		Use the gender provided to pick first names of that gender. 
		If no description is given, be creative! Come up with 
		two normal names and one funny name. Only provide the names.`
					}
				]
			},
			{
				"role": "user",
				"content": [
					{
						"type": "text",
						"text": "Description: " + description + "Gender: " + gender
					}
				]
			}
		]
	});
	return chatCompletion;
};

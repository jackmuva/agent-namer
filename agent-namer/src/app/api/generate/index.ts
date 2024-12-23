import OpenAI from "openai";
import { ChatCompletion } from "openai/resources/index.mjs";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function generateNames(description: string, keywords: string): Promise<ChatCompletion> {
	const chatCompletion = await client.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{
				"role": "developer",
				"content": [
					{
						"type": "text",
						"text": `You are a helpful assistant tasked with coming up with names for AI agent applications.
		Use the description provided by the user to come up with names. If keywords are provided,
		you must use at least one of those keywords in your AI agent names. If no descriptions or keywords are given, be creative! Come up with 
		three normal names and two fun names. Only provide the names.`
					}
				]
			},
			{
				"role": "user",
				"content": [
					{
						"type": "text",
						"text": "Description: " + description + "Keyword: " + keywords
					}
				]
			}
		]
	});
	return chatCompletion;
};

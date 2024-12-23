import { generateNames } from ".";

export async function POST(request: Request) {
	const res = await request.json();
	const chat = await generateNames(res.description, res.gender);
	console.log(chat.choices[0].message);
	return Response.json({ message: chat.choices[0].message.content })
}


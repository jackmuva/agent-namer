import { generateNames } from ".";
import { insertRecord } from "@/lib/postgres-utils";

export async function POST(request: Request) {
	const res = await request.json();
	const chat = await generateNames(res.description, res.gender);
	if ((res.website && res.website !== "") || (res.description && res.description !== "")) {
		const queryStatus = await insertRecord({ website: res.website, datetime: new Date().toLocaleDateString(), description: res.description });
		console.log(queryStatus);
	}
	return Response.json({ message: chat.choices[0].message.content })
}


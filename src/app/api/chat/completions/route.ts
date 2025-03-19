import { NextResponse } from "next/server";
import OpenAI from "openai";

const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY environment variable is required");
    }
    return new OpenAI();
};

export async function POST(req: Request) {
  try {
    const { model, messages } = await req.json();
    const openai = getOpenAIClient();

    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    return NextResponse.json(completion);
  } catch (error: any) {
    console.error("Error in /chat/completions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();
  const apiKey = process.env.UNDETECTABLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  try {
    const response = await fetch("https://api.undetectable.ai/humanize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to humanize text");
    return NextResponse.json({ output: data.output });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An error occurred" }, { status: 500 });
  }
} 
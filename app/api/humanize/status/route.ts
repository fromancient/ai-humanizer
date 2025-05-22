import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { documentId } = await request.json();
  const apiKey = process.env.UNDETECTABLE_AI_API_KEY;

  if (!documentId) {
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch("https://humanize.undetectable.ai/document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
      },
      body: JSON.stringify({
        id: documentId
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to retrieve document");

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An error occurred" }, { status: 500 });
  }
} 
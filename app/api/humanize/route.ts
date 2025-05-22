import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text, readability = "High School", purpose = "General Writing", strength = "Balanced", model = "v2" } = await request.json();
  const apiKey = process.env.UNDETECTABLE_AI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  if (!text || text.length < 50) {
    return NextResponse.json({ error: "Text must be at least 50 characters long" }, { status: 400 });
  }

  if (text.length > 15000) {
    return NextResponse.json({ error: "Text must not exceed 15000 characters" }, { status: 400 });
  }

  try {
    const response = await fetch("https://humanize.undetectable.ai/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey,
      },
      body: JSON.stringify({
        content: text,
        readability,
        purpose,
        strength,
        model
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to submit text for humanization");
    
    // Return the document ID for polling
    return NextResponse.json({ documentId: data.documentId });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An error occurred" }, { status: 500 });
  }
} 
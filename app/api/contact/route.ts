import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    console.log("Contact form submission:", { name, email, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
} 
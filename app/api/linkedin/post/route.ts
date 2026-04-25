import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;

  if (!token || !personUrn) {
    return NextResponse.json(
      { error: "LinkedIn not configured. Set LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_URN." },
      { status: 500 }
    );
  }

  const body = await req.json();
  const text = body.text?.trim();

  if (!text) {
    return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
  }

  if (text.length > 3000) {
    return NextResponse.json({ error: "Post text exceeds 3000 characters" }, { status: 400 });
  }

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "LinkedIn-Version": "202401",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author: `urn:li:person:${personUrn}`,
      commentary: text,
      visibility: "PUBLIC",
      distribution: { feedDistribution: "MAIN_FEED" },
      lifecycleState: "PUBLISHED",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: "LinkedIn API error", details: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ success: true, postId: data.id });
}

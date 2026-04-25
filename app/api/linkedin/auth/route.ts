import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "LinkedIn OAuth not configured. Set LINKEDIN_CLIENT_ID and LINKEDIN_REDIRECT_URI." },
      { status: 500 }
    );
  }

  const url =
    `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}` +
    `&scope=w_member_social%20openid%20profile%20email`;

  return NextResponse.redirect(url);
}

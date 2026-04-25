import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: "LinkedIn OAuth env vars missing" }, { status: 500 });
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok || !tokenData.access_token) {
    return NextResponse.json({ error: "Token exchange failed", details: tokenData }, { status: 500 });
  }

  const accessToken = tokenData.access_token;

  // Get person URN via userinfo
  let personUrn = "";
  try {
    const userInfoRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfo = await userInfoRes.json();
    personUrn = userInfo.sub || "";
  } catch {
    // non-fatal
  }

  // Return HTML page with the token info
  const html = `<!DOCTYPE html>
<html><head><title>LinkedIn Connected</title></head>
<body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#0a0a0a;color:#fff">
<div style="text-align:center;max-width:600px;padding:2rem">
<h1>✅ LinkedIn Connected</h1>
<p>Token received. Person URN: <code>${personUrn}</code></p>
<p style="font-size:0.85rem;color:#888">Add these to your Vercel env vars:</p>
<pre style="background:#111;padding:1rem;border-radius:8px;text-align:left;overflow-x:auto;font-size:0.8rem">
LINKEDIN_ACCESS_TOKEN=${accessToken}
LINKEDIN_PERSON_URN=${personUrn}
</pre>
<p style="margin-top:1rem;color:#888">You can close this tab.</p>
</div></body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}

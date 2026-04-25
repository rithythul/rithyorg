const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export function getLinkedInToken(): string | undefined {
  return process.env.LINKEDIN_ACCESS_TOKEN;
}

export function getLinkedInPersonUrn(): string | undefined {
  return process.env.LINKEDIN_PERSON_URN;
}

export async function postToLinkedIn(text: string): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const res = await fetch(`${baseUrl}/api/linkedin/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Failed to post" };
    return { success: true, postId: data.postId };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

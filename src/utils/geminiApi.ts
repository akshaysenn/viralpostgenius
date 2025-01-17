interface GeneratePostParams {
  topic: string;
  platform: string;
}

export const generatePost = async (apiKey: string, { topic, platform }: GeneratePostParams) => {
  const prompt = `Create a viral ${platform} post about ${topic}. The tone should be professional yet engaging, using concise and impactful writing. Include relevant hashtags and trending emojis to increase engagement.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate post");
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text,
      viralityScore: Math.floor(Math.random() * 30) + 70, // Simulated score between 70-100
    };
  } catch (error) {
    console.error("Error generating post:", error);
    throw error;
  }
};
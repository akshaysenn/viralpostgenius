interface GeneratePostParams {
  topic: string;
  platform: string;
}

export const generatePost = async (apiKey: string, { topic, platform }: GeneratePostParams) => {
  const prompt = `const prompt = `Generate a highly engaging and viral ${platform} post about ${topic}. If a URL is provided, analyze its key points and summarize them in a compelling way. The tone should be attention-grabbing yet natural, using psychological triggers like curiosity, urgency, and relatability. Structure the post for readability, incorporating line breaks, trending emojis, and relevant hashtags. End with a strong call to action to boost engagement. Also, provide a virality score from 1 to 100 based on engagement potential.`;
`;

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

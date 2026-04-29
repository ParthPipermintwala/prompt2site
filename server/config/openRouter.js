const openRouterUrl = process.env.OPENROUTER_URL;
const model = process.env.MODEL;

const genrateResponse = async (prompt) => {
  const response = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "<YOUR_SITE_URL>",
      "X-OpenRouter-Title": "prompt2site",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: `
                You are a strict JSON generator.

                RULES:
                - Output ONLY valid JSON
                - No markdown
                - No explanations
                - No extra text
                - Do not wrap in \`\`\`
                - Ensure JSON is parseable
        `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  });
  if(!response.ok){
    const err=await response.text()
    throw new Error(`OpenRouter API error: ${err}`)
  }
  const data = await response.json();
    return data;
};

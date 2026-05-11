const extractJson = (text) => {
  if (!text) return null;

  try {
    const cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const match = cleanedText.match(/\{[\s\S]*\}/);

    if (!match) {
      console.error("No JSON found");
      return null;
    }

    const jsonText = match[0];

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
    return null;
  }
};

export default extractJson;
const extractJson = (text) => {
  if (!text) return null;
  const cleanedText = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  const firstBrace = cleanedText.indexOf("{");
  const lastBrace = cleanedText.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) return null;
  const jsonText = cleanedText.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};
export default extractJson;

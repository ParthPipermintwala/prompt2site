const extractJson = (text) => {
  if (!text || typeof text !== "string") {
    return null;
  }

  try {
    // Remove markdown wrappers
    let cleanedText = text
      .replace("```json", "")
      .replace("```", "")
      .trim();

    // Extract JSON object
    const start = cleanedText.indexOf("{");
    const end = cleanedText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      console.error("No valid JSON found");
      return null;
    }

    const jsonText = cleanedText.slice(start, end + 1);

    // Parse JSON directly
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error parsing JSON:", error.message);

    // Debug nearby broken content
    const match = error.message.match("position ");

    if (match) {
      const posMatch = error.message.match(/\d+/);

      if (posMatch) {
        const pos = Number(posMatch[0]);

        console.log(
          "Around error:\n",
          text.slice(
            Math.max(0, pos - 120),
            pos + 120
          )
        );
      }
    }

    return null;
  }
};

export default extractJson;
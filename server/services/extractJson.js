const extractJson = (text) => {
  if (!text || typeof text !== "string") return null;

  try {
    // Remove markdown wrappers
    let cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract first valid JSON object
    const start = cleanedText.indexOf("{");
    const end = cleanedText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      console.error("No JSON found");
      return null;
    }

    let jsonText = cleanedText.slice(start, end + 1);

    // Remove invalid control characters
    jsonText = jsonText.replace(
      /[\u0000-\u0019]+/g,
      ""
    );

    // Fix broken backslashes
    jsonText = jsonText.replace(
      /\\(?!["\\/bfnrtu])/g,
      "\\\\"
    );

    // Fix escaped template literals
    jsonText = jsonText
      .replace(/\\`/g, "`")
      .replace(/\\\$/g, "$");

    // Try parsing
    return JSON.parse(jsonText);

  } catch (error) {
    console.error(
      "Error parsing JSON:",
      error.message
    );

    // Debug broken location
    const match = error.message.match(
      /position (\d+)/
    );

    if (match) {
      const pos = Number(match[1]);

      console.log(
        "Around error:\n",
        text.slice(pos - 120, pos + 120)
      );
    }

    return null;
  }
};

export default extractJson;
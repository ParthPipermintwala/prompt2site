const extractWebsiteResponse = (text) => {
  if (!text || typeof text !== "string") {
    return null;
  }

  try {
    const cleaned = text.replace(/\r/g, "").trim();

    const titleMatch = cleaned.match(/TITLE:\s*([\s\S]*?)\nMESSAGE:/);

    const messageMatch = cleaned.match(/MESSAGE:\s*([\s\S]*?)\nCODE:/);

    const codeMatch = cleaned.match(/```html\s*([\s\S]*?)```/);

    let formattedMessage = "";

    if (messageMatch) {
      const items = messageMatch[1]
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          line = line.replace(/^[-•]\s*/, "");

          return `
            <li>
              ${line}
            </li>
          `;
        })
        .join("");

      formattedMessage = `
        <ul class=" text-zinc-200 space-y-1" style="margin-left:18px;list-style-type: disc;">
          ${items}
        </ul>
      `;
    }

    const result = {
      title: titleMatch ? titleMatch[1].trim() : "",

      message: formattedMessage,

      code: codeMatch ? codeMatch[1].trim() : "",
    };

    // Validate
    if (!result.code) {
      console.error("No HTML code found");
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error extracting response:", error.message);

    return null;
  }
};

export default extractWebsiteResponse;

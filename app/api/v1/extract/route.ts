import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

// Create Anthropic API client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: Request) {
  const res = await fetch(
    "https://res.cloudinary.com/dh7z4ooeo/image/upload/v1712409752/ocr-temp/tynjr0y4n3yx6wxjtdbz.jpg"
  );
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Request the Anthropic API for the response based on the prompt
  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    // model: 'claude-3-sonnet-20240229',
    // model: 'claude-3-opus-20240229',
    stream: true,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: Buffer.from(bytes).toString("base64"),
            },
          },
          {
            type: "text",
            text: "Given an image that includes text, tables, and visual elements like mathematical formulas, your task is to extract all content accurately while preserving the original layout and reading order.\
          Ensure paragraph integrity is maintained without introducing extra line breaks.\
          Put small descriptions of images in brackets, when applicable.\
          The final output must be in plain text and include only the extracted information, with no added introductions, titles, descriptions, or extraneous characters.\
          All tables, should be formatted in markdown format.\
          This approach ensures the fidelity of the original document's content and structure in the extraction process.",
          },
        ],
      },
    ],
    max_tokens: 1024,
    temperature: 1,
    top_k: 1,
    top_p: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

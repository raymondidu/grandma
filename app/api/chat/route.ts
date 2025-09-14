// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// // Initialize OpenAI client (on server side)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   try {
//     const { message } = await req.json();

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // small, fast, cheap model
//       messages: [
//         { role: "system", content: "You are a Grandma with a savage wisdom, roasty response or blessing meme." },
//         { role: "user", content: message },
//       ],
//     });

//     return NextResponse.json({
//       reply: response.choices[0].message.content,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Parse form data (supports text + file upload)
    const formData = await req.formData();
    const message = formData.get("message") as string | null;
    const file = formData.get("image"); // Changed this line

    // If there's no message and no file, return error
    if (!message && !file) {
      return NextResponse.json(
        { error: "Please provide a message or an image." },
        { status: 400 }
      );
    }

    let reply = "";

    // Explicitly check if 'file' is an instance of the 'File' object
    if (file instanceof File) { 
      // Example: send image + text to GPT-4o (vision model)
      const base64Image = Buffer.from(await file.arrayBuffer()).toString("base64");
      const imageData = `data:${file.type};base64,${base64Image}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // supports images + text
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: message ?? "Please describe this image." },
              { type: "image_url", image_url: { url: imageData } },
            ],
          },
        ],
      });

      reply = response.choices[0].message.content ?? "";

    } else if (message) {
      // Text-only case
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a Grandma with a savage wisdom, roasty response or blessing meme." },
          { role: "user", content: message },
        ],
      });

      reply = response.choices[0].message.content ?? "";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

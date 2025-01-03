import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { prompt } = await req.json();

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt: prompt,
          apply_watermark: false
        }
      }
    );

    console.log('Generated output:', output);
    return NextResponse.json({ output });

  } catch (error) {
    console.error('Error generating emoji:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate emoji' },
      { status: 500 }
    );
  }
} 
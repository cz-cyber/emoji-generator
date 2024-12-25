# Project overview
Use this guide to buiild a web app where users can give a text prompt to generate emoj using model hosted on replicate. 

# Freature requirements
- we will use Next.js, shadcn, lucid, Superbase, Clerk for authentication
- create a form where users can input a text prompt, and clicking a button that calls the replicate model to generate an emoji
- have a nice UI animation when the emoji is being generated or blank
- Display all the images generated in a grid
- When hover each emoj image, an icon button for download, and an icon button for like should appear


# Relevant docs
## how to use replicate emoji generator model
- https://replicate.com/fofr/sdxl-emoji

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });

import { writeFile } from "node:fs/promises";
for (const [index, item] of Object.entries(output)) {
  await writeFile(`output_${index}.png`, item);
}
//=> output_0.png written to disk

# Current File Structure
EMOJI-MAKER/
├── .next/
├── app/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/
├── node_modules/
├── requirements/
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified
- All new pages go in /app

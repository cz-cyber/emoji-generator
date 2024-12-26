import { EmojiForm } from '@/components/emoji-form';
import { EmojiGrid } from '@/components/emoji-grid';
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-6xl mx-auto flex justify-end mb-8">
        <UserButton afterSignOutUrl="/"/>
      </header>
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Emoji Maker</h1>
          <p className="text-muted-foreground">
            Generate custom emojis using AI. Just describe what you want!
          </p>
        </div>
        
        <div className="flex justify-center">
          <EmojiForm />
        </div>

        <EmojiGrid initialEmojis={[]} />
      </main>
    </div>
  );
}

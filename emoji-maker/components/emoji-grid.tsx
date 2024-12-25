'use client';

import { useState } from 'react';
import { Card } from './ui/card';
import { Download, Heart } from 'lucide-react';
import Image from 'next/image';

interface Emoji {
  id: string;
  imageUrl: string;
  prompt: string;
  likes: number;
}

interface EmojiGridProps {
  initialEmojis?: Emoji[];
}

export function EmojiGrid({ initialEmojis = [] }: EmojiGridProps) {
  const [emojis, setEmojis] = useState<Emoji[]>(initialEmojis);

  const addEmoji = (imageUrl: string, prompt: string) => {
    const newEmoji: Emoji = {
      id: Date.now().toString(),
      imageUrl,
      prompt,
      likes: 0,
    };
    setEmojis(prev => [newEmoji, ...prev]);
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `emoji-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading emoji:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {emojis.map((emoji) => (
        <Card key={emoji.id} className="group relative">
          <div className="aspect-square relative">
            <Image
              src={emoji.imageUrl}
              alt={emoji.prompt}
              fill
              className="object-cover rounded-lg p-2"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
              <button 
                className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
                onClick={() => handleDownload(emoji.imageUrl)}
              >
                <Download className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 
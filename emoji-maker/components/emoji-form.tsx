'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface EmojiFormProps {
  onEmojiGenerated?: (imageUrl: string) => void;
}

export function EmojiForm({ onEmojiGenerated }: EmojiFormProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate emoji');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // The output is now an array of image URLs
      if (!data.output || !Array.isArray(data.output)) {
        throw new Error('Invalid response from the model');
      }

      toast({
        title: "Success",
        description: "Emoji generated successfully!",
      });

      // Get the first image URL from the output
      const imageUrl = data.output[0];
      console.log('Generated emoji URL:', imageUrl);

      // Call the callback with the new image URL
      onEmojiGenerated?.(imageUrl);

      // Clear the input after successful generation
      setPrompt('');

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate emoji",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        placeholder="Describe your emoji... (e.g., 'a cute happy sun with sunglasses')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Emoji'
        )}
      </Button>
    </form>
  );
} 
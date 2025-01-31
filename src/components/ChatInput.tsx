import React, { useRef } from 'react';
import { Camera, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onImageUpload: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onImageUpload }) => {
  const [message, setMessage] = React.useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="hover:bg-secondary"
        onClick={() => fileInputRef.current?.click()}
      >
        <Camera className="h-5 w-5" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className={cn(
          "flex-1",
          "focus-visible:ring-1",
          "focus-visible:ring-offset-0"
        )}
      />
      <Button type="submit" size="icon" disabled={!message.trim()}>
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

interface Message {
  content: string;
  isImage: boolean;
  isSent: boolean;
}

const Index = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { content: "Hello! How can I help you today?", isImage: false, isSent: false }
  ]);
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { content: message, isImage: false, isSent: true }]);
  };

  const handleImageUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setMessages(prev => [...prev, { content: imageUrl, isImage: true, isSent: true }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              isImage={message.isImage}
              isSent={message.isSent}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} onImageUpload={handleImageUpload} />
    </div>
  );
};

export default Index;
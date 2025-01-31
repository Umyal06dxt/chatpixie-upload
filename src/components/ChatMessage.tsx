import React from 'react';
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isImage?: boolean;
  isSent?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isImage, isSent }) => {
  return (
    <div className={cn(
      "message-appear max-w-[80%] mb-2",
      isSent ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        "rounded-2xl p-3",
        isSent ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        isImage ? "p-1" : "p-3"
      )}>
        {isImage ? (
          <img src={content} alt="Uploaded" className="max-w-full rounded-xl max-h-[300px] object-contain" />
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
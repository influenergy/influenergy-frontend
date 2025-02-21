"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isStarred: boolean;
  isRead: boolean;
  type: "system" | "message";
}

const Page = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      author: "Alex Morgan",
      avatar: "https://avatar.iran.liara.run/public/boy",
      content:
        "System Update: Scheduled Maintenance\nOur servers will undergo maintenance on October 31, 2024, from 1 AM to 3...",
      timestamp: "08:43 PM",
      isStarred: true,
      isRead: false,
      type: "system",
    },
    {
      id: "2",
      author: "Jamie Nguyen",
      avatar: "https://avatar.iran.liara.run/public/boy",
      content:
        "Weekly Dev Team Meeting:\n Reminder: Join our weekly dev team meeting to discuss progress and blockers.",
      timestamp: "08:43 PM",
      isStarred: true,
      isRead: false,
      type: "message",
    },
  ]);

  const toggleStar = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-2 py-1">
            {messages.filter((m) => !m.isRead).length} Unread
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`transition-all hover:shadow-md ${
                !message.isRead ? "bg-muted/30" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {message.type === "system" && (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    {message.type === "message" && (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Image
                          src={message.avatar}
                          alt={message.author}
                          width={40}
                          height={40}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{message.author}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStar(message.id)}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        message.isStarred
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMessage(message.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;

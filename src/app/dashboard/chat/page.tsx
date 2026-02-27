'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Send, Paperclip, Search, MoreVertical, Phone, Video, Circle } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

const mockConversations: Conversation[] = [
  { id: '1', name: 'Sarah Okonkwo', lastMessage: 'I\'d like to discuss the coffee plantation...', timestamp: '2m ago', unread: 2, avatar: 'SO', online: true },
  { id: '2', name: 'James Mwangi', lastMessage: 'The soil analysis report looks great!', timestamp: '1h ago', unread: 0, avatar: 'JM', online: true },
  { id: '3', name: 'Amira Hassan', lastMessage: 'When can we schedule a site visit?', timestamp: '3h ago', unread: 1, avatar: 'AH', online: false },
  { id: '4', name: 'David Kamau', lastMessage: 'Contract has been signed. Thank you!', timestamp: 'Yesterday', unread: 0, avatar: 'DK', online: false },
];

const mockMessages: Message[] = [
  { id: '1', sender: 'Sarah Okonkwo', content: 'Hi, I noticed your coffee plantation listing in Kericho. It looks very promising!', timestamp: '10:30 AM', isOwn: false },
  { id: '2', sender: 'You', content: 'Thank you! Yes, it\'s a 50-hectare certified organic farm with excellent soil conditions.', timestamp: '10:32 AM', isOwn: true },
  { id: '3', sender: 'Sarah Okonkwo', content: 'That sounds excellent. What\'s the estimated ROI based on current market conditions?', timestamp: '10:35 AM', isOwn: false },
  { id: '4', sender: 'You', content: 'Based on our AI analysis, we project around 12-15% annual ROI. I can share the detailed report if you\'re interested.', timestamp: '10:37 AM', isOwn: true },
  { id: '5', sender: 'Sarah Okonkwo', content: 'I\'d like to discuss the coffee plantation further. Could we arrange a virtual tour?', timestamp: '10:40 AM', isOwn: false },
];

export default function ChatPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: String(Date.now()),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');

    // Simulate typing + response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'Sarah Okonkwo',
          content: 'That sounds great! Let me check my schedule and get back to you.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
        },
      ]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = mockConversations.find((c) => c.id === selectedConversation);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full flex items-center gap-3 p-4 transition-all duration-200 border-b border-border/50 ${
                selectedConversation === conv.id
                  ? 'bg-primary/5 border-l-2 border-l-primary'
                  : 'hover:bg-muted'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <Circle className="absolute -bottom-0.5 -right-0.5 h-4 w-4 fill-emerald-500 text-card" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground truncate">{conv.name}</span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  {selectedConv.avatar}
                </div>
                {selectedConv.online && (
                  <Circle className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 fill-emerald-500 text-card" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{selectedConv.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedConv.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.isOwn
                      ? 'bg-primary text-white rounded-br-md slide-in-right'
                      : 'bg-card border border-border text-foreground rounded-bl-md slide-in-left'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1.5 ${msg.isOwn ? 'text-white/60' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Select a conversation</h3>
            <p className="text-muted-foreground">Choose from your existing conversations to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}
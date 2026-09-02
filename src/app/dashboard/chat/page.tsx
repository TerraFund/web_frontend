'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Send,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  Circle,
  ShieldCheck,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';

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
  landTitle?: string;
  landLocation?: string;
  proposedAmount?: string;
  proposedDuration?: string;
}

export default function ChatPage() {
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function loadChatData() {
      try {
        const res = await fetch('/api/chat');
        const data = await res.json();
        if (data.success && data.data) {
          setConversations(data.data.conversations || []);
          if (data.data.messages && data.data.messages['1']) {
            setMessages(data.data.messages['1']);
          }
        }
      } catch (err) {
        console.error('Error loading chat:', err);
      } finally {
        setLoading(false);
      }
    }
    loadChatData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || newMessage;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: 'm-' + Date.now(),
      sender: 'You',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setNewMessage('');

    // Trigger API call
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: selectedConversation, content: textToSend }),
    }).catch((err) => console.error(err));

    // Simulated partner auto-reply after 1.5 seconds
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const autoReplyText =
        textToSend.includes('Visit') || textToSend.includes('Schedule')
          ? 'That works perfectly! I can meet you at the site this Friday at 10 AM.'
          : textToSend.includes('Offer') || textToSend.includes('Counter')
          ? 'Thank you for the counter-proposal! I have reviewed the terms and updated our escrow draft.'
          : 'Thank you for your message! I am reviewing the agronomy details and will confirm shortly.';

      setMessages((prev) => [
        ...prev,
        {
          id: 'm-' + (Date.now() + 1),
          sender: selectedConv?.name || 'Partner',
          content: autoReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
        },
      ]);
    }, 1600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.landTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] bg-background p-6 space-x-6">
        <div className="w-80 h-full bg-muted rounded-2xl animate-pulse" />
        <div className="flex-1 h-full bg-muted rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* SIDEBAR: CONVERSATION LIST */}
      <div className="w-80 border-r border-border bg-card flex flex-col flex-shrink-0">
        {/* Header & Search */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight">Lease Negotiations</h2>
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
              Escrow Secured
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts or land plots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted/20 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/50">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full flex items-center gap-3 p-4 transition-all text-left ${
                selectedConversation === conv.id
                  ? 'bg-primary/10 border-l-4 border-l-primary'
                  : 'hover:bg-muted/30'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <Circle className="absolute bottom-0 right-0 h-3.5 w-3.5 fill-emerald-500 text-card" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground truncate">{conv.name}</span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                {conv.landTitle && (
                  <p className="text-[10px] text-emerald-600 font-semibold truncate mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {conv.landTitle}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT MAIN AREA */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                  {selectedConv.avatar}
                </div>
                {selectedConv.online && (
                  <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-emerald-500 text-card" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">{selectedConv.name}</h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" /> Verified Partner ({selectedConv.online ? 'Online' : 'Offline'})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDetailsSidebar(!showDetailsSidebar)}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  showDetailsSidebar ? 'bg-primary text-white border-primary' : 'bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                <Info className="h-4 w-4" /> Plot Deal Info
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.isOwn
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-card border border-border text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="font-medium">{msg.content}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.isOwn ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-6 py-2 bg-card border-t border-border flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex-shrink-0">Quick Templates:</span>
            {[
              '📅 Schedule Site Visit',
              '📄 Send Lease Counter-Offer',
              '🌱 Request Agronomy Report',
              '🔒 Check Escrow Status',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="px-3 py-1.5 bg-muted/30 hover:bg-muted border border-border rounded-xl text-xs font-semibold text-foreground flex-shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
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
                placeholder="Type your message or lease negotiation term..."
                className="flex-1 px-4 py-3 rounded-xl bg-muted/20 border border-border text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => handleSend()}
                disabled={!newMessage.trim()}
                className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Send className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Select a Negotiation Conversation</h3>
            <p className="text-xs text-muted-foreground">Pick a lease proposal thread to negotiate terms with verified partners.</p>
          </div>
        </div>
      )}

      {/* RIGHT SIDEBAR: DEAL SUMMARY */}
      {selectedConv && showDetailsSidebar && (
        <div className="w-80 border-l border-border bg-card p-6 flex-shrink-0 space-y-6 hidden lg:block overflow-y-auto">
          <div className="border-b border-border pb-4">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> Property Deal Summary
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Target Agricultural Plot</p>
              <p className="font-bold text-foreground text-sm">{selectedConv.landTitle || 'Gasabo Plot #1'}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {selectedConv.landLocation || 'Gasabo, Kigali'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">Offered Lease Value</p>
              <p className="text-xl font-extrabold text-emerald-800 dark:text-emerald-200">
                {selectedConv.proposedAmount || '$42,000 / yr'}
              </p>
              <p className="text-xs text-emerald-600 font-medium">Term: {selectedConv.proposedDuration || '36 Months'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Escrow Contract</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                  Active Draft
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Standardized 3-Year Escrow Agreement Draft</p>
              <button
                onClick={() => router.push('/proposals/1')}
                className="w-full mt-2 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
              >
                <FileText className="h-3.5 w-3.5" /> View Proposal Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Loader2 } from 'lucide-react';

const mockMessages = [
  { id: '1', sender: 'Sarah Johnson', content: 'Hi! I\'m interested in your coffee farm plot.', timestamp: '10:30 AM', isMe: false },
  { id: '2', sender: 'Me', content: 'Hello Sarah! Thank you for your interest.', timestamp: '10:32 AM', isMe: true },
  { id: '3', sender: 'Sarah Johnson', content: 'I have some questions about the soil quality and irrigation.', timestamp: '10:35 AM', isMe: false },
  { id: '4', sender: 'Me', content: 'The soil is volcanic with excellent fertility. We have drip irrigation.', timestamp: '10:37 AM', isMe: true },
  { id: '5', sender: 'Sarah Johnson', content: 'That sounds perfect! Looking forward to our partnership!', timestamp: '10:40 AM', isMe: false },
];

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockConversations = [
    { id: '1', name: 'Sarah Johnson', lastMessage: 'Looking forward to our partnership!', time: '2m ago', unread: 2 },
    { id: '2', name: 'Mike Chen', lastMessage: 'Contract details sent', time: '1h ago', unread: 0 },
    { id: '3', name: 'Landowner Group', lastMessage: 'Welcome to TerraFund!', time: '1d ago', unread: 0 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'Me',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'Sarah Johnson',
          content: 'Thank you for the information! I\'ll review the details.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  return (
    <div className="flex-1 flex">
      {/* Conversations Sidebar */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {mockConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedConversation === conv.id ? 'bg-primary bg-opacity-10 border-r-2 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">{conv.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full mt-1">
                      {conv.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {mockConversations.find(c => c.id === selectedConversation)?.name}
                </h3>
                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex animate-in ${msg.isMe ? 'justify-end slide-in-from-right-4' : 'justify-start slide-in-from-left-4'} duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                    msg.isMe
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in slide-in-from-left-4 duration-300">
                  <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Sarah is typing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 hover:scale-110">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-3 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  {message.trim() && (
                    <button
                      onClick={handleSendMessage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-primary text-white rounded-md hover:bg-accent transition-all duration-200 hover:scale-105"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {!message.trim() && (
                  <button
                    onClick={handleSendMessage}
                    disabled
                    className="p-2 bg-gray-300 dark:bg-gray-600 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
    </div>
  );
}
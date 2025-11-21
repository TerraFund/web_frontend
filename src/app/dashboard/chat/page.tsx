'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { Send, Paperclip, MoreVertical } from 'lucide-react';

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [message, setMessage] = useState('');

  const mockConversations = [
    { id: '1', name: 'Sarah Johnson', lastMessage: 'Looking forward to our partnership!', time: '2m ago', unread: 2 },
    { id: '2', name: 'Mike Chen', lastMessage: 'Contract details sent', time: '1h ago', unread: 0 },
    { id: '3', name: 'Landowner Group', lastMessage: 'Welcome to TerraFund!', time: '1d ago', unread: 0 },
  ];

  const mockMessages = [
    { id: '1', sender: 'Sarah Johnson', content: 'Hi! I\'m interested in your coffee farm plot.', timestamp: '10:30 AM', isMe: false },
    { id: '2', sender: 'Me', content: 'Hello Sarah! Thank you for your interest.', timestamp: '10:32 AM', isMe: true },
    { id: '3', sender: 'Sarah Johnson', content: 'I have some questions about the soil quality and irrigation.', timestamp: '10:35 AM', isMe: false },
    { id: '4', sender: 'Me', content: 'The soil is volcanic with excellent fertility. We have drip irrigation.', timestamp: '10:37 AM', isMe: true },
    { id: '5', sender: 'Sarah Johnson', content: 'That sounds perfect! Looking forward to our partnership!', timestamp: '10:40 AM', isMe: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock send
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 flex">
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
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
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
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
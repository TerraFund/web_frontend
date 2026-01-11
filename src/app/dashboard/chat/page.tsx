'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Loader2, X } from 'lucide-react';

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
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockConversations = [
    { id: '1', name: 'Sarah Johnson', lastMessage: 'Looking forward to our partnership!', time: '2m ago', unread: 2 },
    { id: '2', name: 'Mike Chen', lastMessage: 'Contract details sent', time: '1h ago', unread: 0 },
    { id: '3', name: 'Landowner Group', lastMessage: 'Welcome to TerraFund!', time: '1d ago', unread: 0 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'Me',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        attachments: attachments.length > 0 ? attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })) : undefined,
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setAttachments([]);

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
          <div className="w-80 bg-white">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {mockConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50
                    selectedConversation === conv.id ? 'bg-primary bg-opacity-10 border-r-2 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{conv.name}</h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{conv.lastMessage}</p>
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
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {mockConversations.find(c => c.id === selectedConversation)?.name}
                </h3>
                <button className="p-2 text-gray-400">
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
                      : 'bg-gray-200
                  }`}>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mb-2 space-y-1">
                        {msg.attachments.map((attachment, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <Paperclip className="h-3 w-3 mr-1" />
                            <span className="truncate">{attachment.name}</span>
                            <span className="ml-1 opacity-75">({(attachment.size / 1024).toFixed(1)}KB)</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isMe ? 'text-primary-100' : 'text-gray-500
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in slide-in-from-left-4 duration-300">
                  <div className="bg-gray-200">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Sarah is typing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center bg-white">
                      <Paperclip className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
               <div className="flex items-center space-x-2">
                 <input
                   ref={fileInputRef}
                   type="file"
                   multiple
                   accept="image/*,.pdf,.doc,.docx"
                   onChange={handleFileSelect}
                   className="hidden"
                 />
                 <button
                   onClick={() => fileInputRef.current?.click()}
                   className="p-2 text-gray-400"
                 >
                   <Paperclip className="h-5 w-5" />
                 </button>
                 <div className="flex-1 relative">
                   <input
                     type="text"
                     placeholder="Type a message..."
                     className="w-full px-3 py-2 pr-12 border border-gray-300"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                   />
                   {(message.trim() || attachments.length > 0) && (
                     <button
                       onClick={handleSendMessage}
                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-primary text-white rounded-md hover:bg-accent transition-all duration-200 hover:scale-105"
                     >
                       <Send className="h-4 w-4" />
                     </button>
                   )}
                 </div>
                 {!(message.trim() || attachments.length > 0) && (
                   <button
                     onClick={handleSendMessage}
                     disabled
                     className="p-2 bg-gray-300"
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
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { ArrowLeft, MessageSquare, FileText, CheckCircle, XCircle, AlertTriangle, Send, User, Calendar } from 'lucide-react';

export default function DisputeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [resolution, setResolution] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [disputeData, setDisputeData] = useState<any>(null);

  useEffect(() => {
    // Mock API call - in real app, fetch from /api/admin/disputes/[id]
    const fetchDispute = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setDisputeData({
          id: params.id,
          title: 'Contract Breach - Payment Delay',
          parties: 'John Doe vs Sarah Smith',
          status: 'open',
          priority: 'high',
          created: '2024-01-20',
          description: 'Investor claims landowner delayed payment release after milestone completion. The contract specifies payments should be released within 7 days of milestone verification, but landowner has not complied.',
          plaintiff: {
            id: '2',
            name: 'Sarah Smith',
            role: 'investor',
            email: 'sarah@example.com',
          },
          defendant: {
            id: '1',
            name: 'John Doe',
            role: 'landowner',
            email: 'john@example.com',
          },
          contract: {
            id: 'C001',
            title: 'Coffee Farm Investment Agreement',
            value: 37500,
            signed: '2024-01-15',
          },
          evidence: [
            { id: '1', name: 'Milestone Completion Report', type: 'Report', uploaded: '2024-01-18', uploadedBy: 'John Doe' },
            { id: '2', name: 'Payment Request Email', type: 'Email', uploaded: '2024-01-19', uploadedBy: 'Sarah Smith' },
            { id: '3', name: 'Contract Terms', type: 'Document', uploaded: '2024-01-20', uploadedBy: 'System' },
          ],
          messages: [
            {
              id: '1',
              sender: 'Sarah Smith',
              senderRole: 'investor',
              message: 'The milestone was completed on January 15th, but I have not received payment yet. According to the contract, payment should be released within 7 days.',
              timestamp: '2024-01-20 10:30 AM',
            },
            {
              id: '2',
              sender: 'John Doe',
              senderRole: 'landowner',
              message: 'I apologize for the delay. There was an issue with the escrow service. I will resolve this immediately.',
              timestamp: '2024-01-20 2:15 PM',
            },
            {
              id: '3',
              sender: 'Admin',
              senderRole: 'admin',
              message: 'I have reviewed the contract and evidence. The payment is indeed overdue. Please provide an update on when the payment will be released.',
              timestamp: '2024-01-21 9:45 AM',
            },
          ],
        });
      } catch (error) {
        setError('Failed to load dispute data');
      } finally {
        setLoading(false);
      }
    };

    fetchDispute();
  }, [params.id]);

  const handleResolve = (status: 'resolved' | 'dismissed') => {
    if (!resolution.trim()) return;

    setDisputeData({
      ...disputeData,
      status: status === 'resolved' ? 'resolved' : 'dismissed',
    });

    // Mock API call
    console.log(`Resolving dispute ${params.id} with status: ${status}, resolution: ${resolution}`);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: 'Admin',
      senderRole: 'admin',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setDisputeData({
      ...disputeData,
      messages: [...disputeData.messages, message],
    });

    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-300 rounded"></div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !disputeData) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Dispute</h2>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{disputeData.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">Dispute ID: {disputeData.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              disputeData.status === 'open'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : disputeData.status === 'investigating'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {disputeData.status}
            </span>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              disputeData.priority === 'high'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : disputeData.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {disputeData.priority} Priority
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dispute Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Dispute Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <p className="text-gray-600 dark:text-gray-400">{disputeData.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</label>
                    <p className="text-gray-900 dark:text-white flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {disputeData.created}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Related Contract</label>
                    <p className="text-gray-900 dark:text-white">{disputeData.contract.title} (${disputeData.contract.value.toLocaleString()})</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parties Involved */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Parties Involved</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Plaintiff</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {disputeData.plaintiff.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{disputeData.plaintiff.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{disputeData.plaintiff.email}</p>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Defendant</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {disputeData.defendant.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{disputeData.defendant.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{disputeData.defendant.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Evidence
              </h2>
              <div className="space-y-3">
                {disputeData.evidence.map((evidence) => (
                  <div key={evidence.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{evidence.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type: {evidence.type} • Uploaded by: {evidence.uploadedBy} • {evidence.uploaded}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution */}
            {disputeData.status !== 'resolved' && disputeData.status !== 'dismissed' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Resolution</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Resolution Details
                    </label>
                    <textarea
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      rows={4}
                      placeholder="Describe how this dispute was resolved..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleResolve('resolved')}
                      disabled={!resolution.trim()}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Resolved
                    </Button>
                    <Button
                      onClick={() => handleResolve('dismissed')}
                      variant="outline"
                      disabled={!resolution.trim()}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Dismiss Dispute
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Communication */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Communication
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {disputeData.messages.map((message) => (
                  <div key={message.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">
                        {message.sender} ({message.senderRole})
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{message.message}</p>
                  </div>
                ))}
              </div>
              {disputeData.status !== 'resolved' && disputeData.status !== 'dismissed' && (
                <div className="mt-4 space-y-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                    placeholder="Send a message to both parties..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Escalate Priority
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Contact Parties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
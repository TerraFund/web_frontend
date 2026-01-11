'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { CreditCard, Download, Eye, Lock } from 'lucide-react';

export default function Payments() {
  const [activeTab, setActiveTab] = useState<'history' | 'methods'>('history');

  const mockPayments = [
    {
      id: '1',
      type: 'escrow_deposit',
      amount: 25000,
      status: 'completed',
      date: '2024-01-15',
      description: 'Escrow deposit for Maize Field #12',
      contractId: 'C-001',
    },
    {
      id: '2',
      type: 'escrow_release',
      amount: 25000,
      status: 'pending',
      date: '2024-01-20',
      description: 'Escrow release for Maize Field #12',
      contractId: 'C-001',
    },
    {
      id: '3',
      type: 'revenue_share',
      amount: 1250,
      status: 'completed',
      date: '2024-01-10',
      description: 'Revenue share from Coffee Farm #5',
      contractId: 'C-002',
    },
  ];

  const mockPaymentMethods = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600
      case 'pending':
        return 'text-yellow-600
      case 'failed':
        return 'text-red-600
      default:
        return 'text-gray-600
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
         <h1 className="text-3xl font-bold mb-8 text-gray-900">Payments</h1>

         {/* Tabs */}
         <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'history'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Payment History
                  </button>
                  <button
                    onClick={() => setActiveTab('methods')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'methods'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Payment Methods
                  </button>
                </nav>
              </div>
         </div>

         {activeTab === 'history' && (
              <div className="bg-white">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {mockPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <p className="font-medium">{payment.description}</p>
                              <p className="text-gray-500">Contract: {payment.contractId}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-accent mr-2">
                              <Eye className="h-4 w-4 inline mr-1" />
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Download className="h-4 w-4 inline mr-1" />
                              Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
         )}

         {activeTab === 'methods' && (
              <div className="space-y-6">
                <div className="bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                    <Button>Add New Method</Button>
                  </div>

                  <div className="space-y-4">
                    {mockPaymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200">
                        <div className="flex items-center space-x-3">
                          {method.type === 'card' ? (
                            <CreditCard className="h-8 w-8 text-gray-400" />
                          ) : (
                            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">P</span>
                            </div>
                          )}
                          <div>
                            {method.type === 'card' ? (
                              <>
                                <p className="font-medium text-gray-900">
                                  {method.brand} **** {method.last4}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Expires {method.expiry}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-gray-900">PayPal</p>
                                <p className="text-sm text-gray-500">{method.email}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.isDefault && (
                            <span className="text-xs bg-primary text-white px-2 py-1 rounded">Default</span>
                          )}
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      All payment information is encrypted and stored securely. We never store full card details.
                    </p>
                  </div>
                </div>
              </div>
         )}
       </div>
     </div>
  );
}
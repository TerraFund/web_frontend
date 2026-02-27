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
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
         <h1 className="text-3xl font-bold mb-8 text-foreground">Payments</h1>

         {/* Tabs */}
         <div className="mb-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'history'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground/80 hover:border-border'
                    }`}
                  >
                    Payment History
                  </button>
                  <button
                    onClick={() => setActiveTab('methods')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'methods'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground/80 hover:border-border'
                    }`}
                  >
                    Payment Methods
                  </button>
                </nav>
              </div>
         </div>

         {activeTab === 'history' && (
              <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card">
                      {mockPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{payment.date}</td>
                          <td className="px-6 py-4 text-sm text-foreground">
                            <div>
                              <p className="font-medium">{payment.description}</p>
                              <p className="text-muted-foreground">Contract: {payment.contractId}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
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
                            <button className="text-muted-foreground hover:text-foreground">
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
                <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-foreground">Payment Methods</h2>
                    <Button>Add New Method</Button>
                  </div>

                  <div className="space-y-4">
                    {mockPaymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-border">
                        <div className="flex items-center space-x-3">
                          {method.type === 'card' ? (
                            <CreditCard className="h-8 w-8 text-muted-foreground" />
                          ) : (
                            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">P</span>
                            </div>
                          )}
                          <div>
                            {method.type === 'card' ? (
                              <>
                                <p className="font-medium text-foreground">
                                  {method.brand} **** {method.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Expires {method.expiry}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-foreground">PayPal</p>
                                <p className="text-sm text-muted-foreground">{method.email}</p>
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

                <div className="bg-yellow-50 rounded-2xl p-4">
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
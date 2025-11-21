'use client';

import { useState } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';
import Input from './Input';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  contractId: string;
  onPayment: (paymentData: { method: string; amount: number }) => void;
}

export default function PaymentModal({ amount, contractId, onPayment }: PaymentModalProps) {
  const { closeModal } = useUI();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock payment processing
    setTimeout(() => {
      onPayment({
        method: paymentMethod,
        amount,
      });
      setLoading(false);
      closeModal();
    }, 2000);
  };

  return (
    <div className="max-w-md w-full">
      <div className="flex items-center mb-6">
        <Lock className="h-6 w-6 text-green-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Secure Payment
        </h2>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Amount to Pay</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${amount.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          This will be held in escrow until contract completion
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <CreditCard className="h-4 w-4 mr-2" />
              Credit/Debit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                required
              />
              <Input
                label="CVV"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                required
              />
            </div>
            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              required
            />
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Pay ${amount.toLocaleString()}
          </Button>
        </div>
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Your payment information is encrypted and secure
      </p>
    </div>
  );
}
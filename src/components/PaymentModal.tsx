'use client';

import { useState } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';
import Input from './Input';
import { CreditCard, Lock, CheckCircle, DollarSign, Shield } from 'lucide-react';

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
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock payment processing
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        onPayment({
          method: paymentMethod,
          amount,
        });
        setLoading(false);
        closeModal();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="max-w-md w-full animate-in zoom-in-95 duration-300">
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-green-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Secure Escrow Payment
        </h2>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-4 rounded-lg mb-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-400">Investment Amount</span>
          <span className="text-2xl font-bold text-primary">${amount.toLocaleString()}</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Principal</span>
            <span className="text-gray-900 dark:text-white">${(amount * 0.95).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Escrow Fee (5%)</span>
            <span className="text-gray-900 dark:text-white">${(amount * 0.05).toLocaleString()}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center">
          <Lock className="w-3 h-3 mr-1" />
          Funds held securely until project completion
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Payment Method
          </label>
          <div className="space-y-3">
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
              paymentMethod === 'card'
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary'
            }`}>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3 text-primary focus:ring-primary"
              />
              <CreditCard className="h-5 w-5 mr-3 text-primary" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Visa, Mastercard, Amex</div>
              </div>
            </label>
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
              paymentMethod === 'paypal'
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary'
            }`}>
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3 text-primary focus:ring-primary"
              />
              <div className="w-5 h-5 mr-3 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">PayPal</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Fast and secure</div>
              </div>
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
            className="flex-1 hover:scale-105 transition-transform duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1 hover:scale-105 transition-transform duration-200"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Pay ${amount.toLocaleString()}
          </Button>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center animate-in zoom-in duration-300">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-in zoom-in duration-500" />
              {/* Simple confetti effect */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  >
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: ['#0B6E4F', '#F4A261', '#1E3932'][Math.floor(Math.random() * 3)],
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ${amount.toLocaleString()} has been deposited into escrow
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                Funds will be released upon successful project completion
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center flex items-center justify-center">
        <Lock className="w-3 h-3 mr-1" />
        Your payment information is encrypted and secure
      </p>
    </div>
  );
}
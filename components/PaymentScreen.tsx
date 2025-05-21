'use client';

import React, { useState } from 'react';
import { FaPaypal, FaCreditCard, FaBitcoin } from 'react-icons/fa';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactElement;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'paypal', name: 'PayPal', icon: <FaPaypal size={24} color="#0070ba" /> },
  { id: 'card', name: 'Mastercard', icon: <FaCreditCard size={24} color="#ff5f00" /> },
  { id: 'crypto', name: 'Crypto', icon: <FaBitcoin size={24} color="#f7931a" /> },
];

interface PaymentScreenProps {
  amount?: number;
}

export default function PaymentScreen({ amount }: PaymentScreenProps) {
  const [activeTab, setActiveTab] = useState('paypal');
  const [customAmount, setCustomAmount] = useState(amount?.toString() || '');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    console.log(`Processing ${activeTab} payment for $${customAmount}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
      
      {/* Payment Method Tabs */}
      <div className="flex space-x-4 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setActiveTab(method.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === method.id
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {method.icon}
            <span>{method.name}</span>
          </button>
        ))}
      </div>

      {/* Payment Form */}
      <form onSubmit={handlePayment} className="space-y-6">
        {!amount && (
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (USD)
            </label>
            <input
              type="number"
              id="amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>
        )}

        {/* Payment Method Specific Fields */}
        {activeTab === 'paypal' && (
          <div className="space-y-4">
            <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
          </div>
        )}

        {activeTab === 'card' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crypto' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cryptoAddress" className="block text-sm font-medium text-gray-700">
                Your Crypto Wallet Address
              </label>
              <input
                type="text"
                id="cryptoAddress"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0x..."
                required
              />
            </div>
            <p className="text-sm text-gray-500">
              Supported cryptocurrencies: Bitcoin, Ethereum, USDT
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Pay ${amount || customAmount || '0.00'}
        </button>
      </form>
    </div>
  );
} 
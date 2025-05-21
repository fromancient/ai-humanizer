'use client';

import { useSearchParams } from 'next/navigation';
import PaymentScreen from '@/components/PaymentScreen';

const planPrices = {
  basic: 9.99,
  pro: 19.99,
  enterprise: 49.99
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'basic';
  const price = planPrices[plan as keyof typeof planPrices] || planPrices.basic;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="mt-2 text-lg text-gray-600">
            {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - ${price}/month
          </p>
        </div>
        <PaymentScreen amount={price} />
      </div>
    </div>
  );
} 
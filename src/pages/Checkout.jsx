import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import HeroSection from "../components/HeroSection";
import { Images } from "../constants/Images";
import Header from "../components/Header";
export const mockCartItems = [
  { id: "1", name: "Wireless Earbuds", price: 79.99, quantity: 1 },
  { id: "2", name: "Smartphone Case", price: 19.99, quantity: 2 },
  { id: "3", name: "USB-C Cable", price: 9.99, quantity: 3 },
];

// CheckoutForm Component

export function CheckoutForm({ items }) {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePaymentSuccess = (details) => {
    console.log("Payment completed successfully:", details);
    setPaymentComplete(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {paymentComplete ? (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">
            Payment Successful!
          </h3>
          <p>Thank you for your purchase. Your order has been processed.</p>
        </div>
      ) : (
        <PayPalScriptProvider options={{ "client-id": "test" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              if (actions.order) {
                return actions.order.capture().then(handlePaymentSuccess);
              } else {
                console.error(
                  "Order capture failed: actions.order is undefined."
                );
                return Promise.reject("Order capture failed.");
              }
            }}
            style={{ layout: "vertical" }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
}

// OrderSummary Component
export function OrderSummary({ items }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-4 flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

// CheckoutPage Component
export default function Checkout() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* <div className="w-full overflow-x-hidden"> */}
      <Header backgroundColor={"bg-gray-800 relative"} />
      <div className="w-[80%] mx-auto my-10">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <OrderSummary items={mockCartItems} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            <CheckoutForm items={mockCartItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

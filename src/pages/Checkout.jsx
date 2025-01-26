import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import HeroSection from "../components/HeroSection";
import { Images } from "../constants/Images";
import Header from "../components/Header";
import axios from "axios";
export const mockCartItems = [
  { id: "1", name: "Wireless Earbuds", price: 79.99, quantity: 1 },
  { id: "2", name: "Smartphone Case", price: 19.99, quantity: 2 },
  { id: "3", name: "USB-C Cable", price: 9.99, quantity: 3 },
];

// CheckoutForm Component

export function CheckoutForm({ items }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    console.log('submit');
    
    const authData = {
      clientKey: "your_client_key", // Replace with your credentials
      apiLoginID: "your_api_login_id", // Replace with your credentials
    };

    const cardData = {
      cardNumber,
      month: expirationDate.split("/")[0],
      year: expirationDate.split("/")[1],
      cardCode: cvv,
    };

    const secureData = {
      authData,
      cardData,
    };

    window.Accept.dispatchData(secureData, (response) => {
      if (response.messages.resultCode === "Ok") {
        // Send token to backend
        console.log('123');
        axios
          .post("https://localhost:5000/process-payment", {
            amount,
            opaqueData: response.opaqueData,
          })
          .then((res) => {
            alert(
              `Payment successful! Transaction ID: ${res.data.transactionId}`
            );
          })
          .catch((err) => {
            console.error(err);
            alert("Payment failed.");
          });
      } else {
        alert("Error: " + response.messages.message[0].text);
      }
    });
  };
  useEffect(() => {
    if (!window.Accept) {
      console.error("Authorize.Net Accept.js not loaded");
    }
  }, []);
 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Payment Form</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
          className="space-y-4"
        >
          {/* Card Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter card number"
              required
            />
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Expiration Date (MM/YYYY)</label>
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YYYY"
              required
            />
          </div>

          {/* CVV */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CVV"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};


// OrderSummary Component
export function OrderSummary({ items }) {
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const data = async () => {
      const response = await axios(
        "https://gyroserver.vercel.app/user/v1/operation/get_order_list?user_id=676b01ba33b36b339b6f6a33&&status=pending"
      );

      const total = response.data.orders.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      setTotal(total);
      console.log(response.data.orders);
      setOrderList(response.data.orders);
    };
    data();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ul className="divide-y divide-gray-200">
        {orderList.map((item) => (
          <li key={item.id} className="py-4 flex justify-between">
            <div>
              <p className="font-medium">{item.item_name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">${item.amount.toFixed(2)}</p>
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

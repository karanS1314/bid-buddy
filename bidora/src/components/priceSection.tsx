"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Script from "next/script";
import { checkPremiumUser, createPremiumUser } from "@/app/payment/actions";

declare global {
  interface Window {
    Razorpay: unknown;
  }
}
export default function PriceSection() {
  const includedFeatures = [
    "Join as many auctions as you want, anytime.",
    "Enjoy dedicated customer support for a seamless experience",
  ];

  const AMOUNT = 1; // amount in INR
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // create order
      const premiumUser = await checkPremiumUser();
      if (premiumUser) {
        return;
      }
      const response = await fetch("/api/create-order", {
        method: "POST",
      });
      const data = await response.json();

      // initialize razorpay
      const options = {
        key: process.env.RAZORPAY_KEY_ID!,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "Bidora",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: function (response: unknown) {
          console.log("Payment successful", response);
          createPremiumUser();
        },
        prefill: {
          name: "XYZ",
          email: "XYZ@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#1976d2",
        },
      };
      if (typeof window.Razorpay === "function") {
        const RazorpayConstructor = window.Razorpay as unknown as new (
          options: unknown
        ) => { open: () => void };
        const rzp1 = new RazorpayConstructor(options);
        rzp1.open();
      } else {
        throw new Error("Razorpay SDK is not loaded");
      }
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Bidora, we believe in providing our users with the best value.
            Our lifetime membership allows you to participate in unlimited
            auctions without any additional fees.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Lifetime membership
            </h3>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-indigo-600"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    ₹100
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    INR
                  </span>
                </p>
                <Button
                  className="mt-10 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Get access"}
                </Button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

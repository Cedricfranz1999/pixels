"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react"; // Adjust according to your TRPC setup

const Page = () => {
  const { id } = useParams(); // Get dynamic route parameter
  const { user } = useUser(); // Get current user info using Clerk

  // Use TRPC to fetch order data based on userId and orderId
  const { data, isLoading, error } = api.orders.getStatusOfOrder.useQuery({
    userId: user?.id ?? "", // Ensure user is logged in
    orderId: Number(id), // Ensure id is passed as a number
  });
  console.log(data);

  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Order Details</h1>
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Order Information</h2>
        <p className="text-gray-600">
          <strong>Order ID:</strong> {id}
        </p>
        <p className="text-gray-600">
          <strong>User ID:</strong> {user?.id}
        </p>
        <strong>Product Name {}:</strong>{" "}
        {data?.[0]?.checkout.order?.[0]?.product.name}
      </div>

      {/* If no data is found */}
      {!data ? (
        <div className="text-center text-lg text-gray-500">
          No order data found
        </div>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-semibold">Status History</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((statusHistory) => (
              <div
                key={statusHistory.id}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  Order Status History
                </h3>
                <p>
                  <strong>Previous Status:</strong>{" "}
                  {statusHistory.previousStatus}
                </p>
                <p>
                  <strong>New Status:</strong> {statusHistory.newStatus}
                </p>
                <p>
                  <strong>Changed At:</strong>{" "}
                  {new Date(statusHistory.changedAt).toLocaleString()}
                </p>

                <div className="mt-4"></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

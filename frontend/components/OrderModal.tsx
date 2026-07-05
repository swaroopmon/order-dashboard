"use client";

import { useEffect, useState } from "react";

interface Order {
  id?: number;
  customer_name: string;
  amount: number;
  status: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  order?: Order | null;
  token: string;
}

const API = "http://127.0.0.1:8000";

export default function OrderModal({
  isOpen,
  onClose,
  onSave,
  order,
  token,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setCustomerName(order.customer_name);
      setAmount(order.amount);
      setStatus(order.status);
    } else {
      setCustomerName("");
      setAmount(0);
      setStatus("Pending");
    }
  }, [order]);

  if (!isOpen) return null;

  async function saveOrder() {
    setLoading(true);

    try {
      if (order) {
        await fetch(`${API}/orders/${order.id}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        });
      } else {
        await fetch(`${API}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customer_name: customerName,
            amount,
            status,
          }),
        });
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to save order");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl w-[420px] p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">

          {order ? "Edit Order" : "Create Order"}

        </h2>

        {!order && (
          <>
            <label className="block mb-2 font-semibold">

              Customer Name

            </label>

            <input
              className="border rounded-lg w-full p-2 mb-4"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label className="block mb-2 font-semibold">

              Amount

            </label>

            <input
              type="number"
              className="border rounded-lg w-full p-2 mb-4"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </>
        )}

        <label className="block mb-2 font-semibold">

          Status

        </label>

        <select
          className="border rounded-lg w-full p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>

        <div className="flex justify-end gap-3 mt-8">

          <button
            className="px-5 py-2 rounded bg-gray-400 text-white"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={saveOrder}
            className="px-5 py-2 rounded bg-green-600 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}
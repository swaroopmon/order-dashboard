"use client";

import { useMemo, useState } from "react";

import { Order } from "@/types/order";
import StatusBadge from "./StatusBadge";

interface Props {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
}

export default function OrderTable({
  orders,
  onEdit,
  onDelete,
}: Props) {

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {

      const matchesSearch =
        order.customer_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.status
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [orders, searchTerm, statusFilter]);

  return (

    <div>

      <div className="flex flex-col md:flex-row gap-4 mb-5">

        <input
          type="text"
          placeholder="Search customer or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-200">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">ID</th>

              <th className="px-4 py-3 text-left">Customer</th>

              <th className="px-4 py-3 text-left">Amount</th>

              <th className="px-4 py-3 text-left">Amount (USD)</th>

              <th className="px-4 py-3 text-left">Status</th>

              <th className="px-4 py-3 text-left">Created</th>

              <th className="px-4 py-3 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No matching orders found.
                </td>

              </tr>

            )}

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-4 py-3">
                  {order.id}
                </td>

                <td className="px-4 py-3">
                  {order.customer_name}
                </td>

                <td className="px-4 py-3">
                  ₹ {Number(order.amount).toFixed(2)}
                </td>

                <td className="px-4 py-3">
                    {order.amount_usd !== undefined
                        ? `$ ${order.amount_usd.toFixed(2)}`
                        : "-"}
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>

                <td className="px-4 py-3">
                  {new Date(order.created_at).toLocaleString()}
                </td>

                <td className="px-4 py-3">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onEdit(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(order)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
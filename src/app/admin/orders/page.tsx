"use client";

import { useAdminStore } from "@/store/adminStore";

export default function AdminOrdersPage() {
  const orders = useAdminStore((state) => state.orders);
  const updateOrderStatus = useAdminStore((state) => state.updateOrderStatus);

  const statuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-white mb-8">Orders</h1>

      <div className="bg-brand-card rounded-2xl border border-brand-border-hairline overflow-hidden">
        <table className="w-full text-left text-sm text-brand-soft-white">
          <thead className="bg-[#111] text-brand-muted border-b border-brand-border-hairline">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-brand-muted">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-brand-border-hairline last:border-0 hover:bg-[#151515] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-white">{order.customerName}</p>
                    <p className="text-xs text-brand-muted">{order.email}</p>
                  </td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-white">₹{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="bg-[#111] border border-brand-border-strong rounded px-2 py-1 text-xs text-white"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

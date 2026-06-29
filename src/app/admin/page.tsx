"use client";

import { useAdminStore } from "@/store/adminStore";
import { useProductStore } from "@/store/productStore";

export default function AdminDashboard() {
  const orders = useAdminStore((state) => state.orders);
  const products = useProductStore((state) => state.products);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  
  const productsSold = products.reduce((sum, p) => sum + (p.soldCount || 0), 0);
  const mostSoldProduct = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))[0];
  
  const lowStockProducts = products.filter(p => p.stock < 5);

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
    { label: "Total Orders", value: totalOrders.toString() },
    { label: "Products Sold", value: productsSold.toString() },
    { label: "Most Sold Product", value: mostSoldProduct?.name || "N/A" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-white mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-brand-card border border-brand-border-hairline rounded-2xl p-6 hover:border-brand-border-strong transition-colors">
            <h3 className="text-brand-muted text-sm font-medium tracking-wider mb-2">{stat.label}</h3>
            <p className="font-heading text-2xl font-semibold text-white truncate">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-card border border-brand-border-hairline rounded-2xl p-6">
          <h2 className="font-heading text-xl font-medium text-white mb-6">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-brand-muted text-sm">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex justify-between items-center pb-4 border-b border-brand-border-hairline last:border-0 last:pb-0">
                  <div>
                    <p className="text-white font-medium">{order.id}</p>
                    <p className="text-brand-muted text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white">₹{order.total.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-accent-blue mt-1">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-brand-card border border-brand-border-hairline rounded-2xl p-6">
          <h2 className="font-heading text-xl font-medium text-white mb-6">Low Stock Alerts</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-brand-muted text-sm">All products are well stocked.</p>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map(p => (
                <div key={p.id} className="flex justify-between items-center pb-4 border-b border-brand-border-hairline last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#111] rounded overflow-hidden">
                      <img src={p.frontImage} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white text-sm">{p.name}</p>
                  </div>
                  <span className="text-accent-red font-medium text-sm">{p.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

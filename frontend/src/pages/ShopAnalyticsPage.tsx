const STAT_CARDS = [
  { label: "Total Revenue", value: "PHP 84,320.00", change: "+12.4%", up: true },
  { label: "Total Orders", value: "312", change: "+8.1%", up: true },
  { label: "Products Sold", value: "1,045", change: "+5.3%", up: true },
  { label: "Avg. Order Value", value: "PHP 3,500", change: "-2.7%", up: false },
];

const MONTHLY_SALES = [
  { month: "Jan", revenue: 5200 },
  { month: "Feb", revenue: 7800 },
  { month: "Mar", revenue: 6400 },
  { month: "Apr", revenue: 9100 },
  { month: "May", revenue: 11200 },
  { month: "Jun", revenue: 8700 },
  { month: "Jul", revenue: 13400 },
  { month: "Aug", revenue: 10500 },
  { month: "Sep", revenue: 12100 },
  { month: "Oct", revenue: 9800 },
  { month: "Nov", revenue: 15600 },
  { month: "Dec", revenue: 14320 },
];

const TOP_PRODUCTS = [
  { name: "PUMA Speedcat ", sold: 183, revenue: "PHP 21,400.00" },
  { name: "New Balance 550 Retro Sneakers", sold: 178, revenue: "PHP 8,900.00" },
  { name: "Birkenstock Arizona", sold: 132, revenue: "PHP 13,200.00" },
  { name: "Nike Air Force 1", sold: 98, revenue: "PHP 9,800.00" },
  { name: "Vans Old Skool", sold: 76, revenue: "PHP 15,200.00" },
];

const ORDER_STATUS_BREAKDOWN = [
  { status: "Delivered", count: 241, color: "bg-green-500" },
  { status: "Shipped", count: 38, color: "bg-purple-500" },
  { status: "Confirmed", count: 21, color: "bg-blue-500" },
  { status: "Placed", count: 12, color: "bg-yellow-400" },
];

const maxRevenue = Math.max(...MONTHLY_SALES.map((m) => m.revenue));
const totalOrders = ORDER_STATUS_BREAKDOWN.reduce((s, r) => s + r.count, 0);

const ShopAnalyticsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <header className="pb-2">
        <h2 className="text-xl font-bold tracking-tight">Shop Analytics</h2>
        <p className="text-sm mt-1 text-neutral-500">
          Insights into your shop's traffic and sales performance.
        </p>
        <p className="text-xs mt-1 text-neutral-400 italic">
          Showing sample data — live data coming soon.
        </p>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.label}
            className="border border-neutral-200 rounded p-4 flex flex-col gap-1"
          >
            <p className="text-xs text-neutral-500">{card.label}</p>
            <p className="text-lg font-bold tracking-tight">{card.value}</p>
            <p
              className={`text-xs font-medium ${card.up ? "text-green-600" : "text-red-500"}`}
            >
              {card.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Monthly revenue bar chart */}
      <div className="border border-neutral-200 rounded p-4">
        <p className="text-sm font-semibold mb-4">Monthly Revenue (PHP)</p>
        <div className="flex items-end gap-1.5 h-40">
          {MONTHLY_SALES.map((m) => (
            <div key={m.month} className="flex flex-col items-center flex-1 gap-1">
              <div
                className="w-full bg-black rounded-t"
                style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-[10px] text-neutral-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Top products */}
        <div className="border border-neutral-200 rounded p-4">
          <p className="text-sm font-semibold mb-3">Top Products</p>
          <div className="flex flex-col gap-2">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 w-4">{i + 1}</span>
                  <span className="truncate max-w-[160px]">{p.name}</span>
                </div>
                <div className="flex gap-4 text-right shrink-0">
                  <span className="text-neutral-500 text-xs">{p.sold} sold</span>
                  <span className="font-medium text-xs">{p.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="border border-neutral-200 rounded p-4">
          <p className="text-sm font-semibold mb-3">Order Status Breakdown</p>
          <div className="flex flex-col gap-3">
            {ORDER_STATUS_BREAKDOWN.map((row) => (
              <div key={row.status} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>{row.status}</span>
                  <span>{row.count} orders ({((row.count / totalOrders) * 100).toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div
                    className={`${row.color} h-2 rounded-full`}
                    style={{ width: `${(row.count / totalOrders) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAnalyticsPage;

const REPORTS = [
  {
    id: "RPT-001",
    name: "June 2025 Sales Summary",
    type: "Sales",
    generated: "2025-07-01",
    size: "42 KB",
  },
  {
    id: "RPT-002",
    name: "Q2 2025 Revenue Report",
    type: "Revenue",
    generated: "2025-07-03",
    size: "118 KB",
  },
  {
    id: "RPT-003",
    name: "Top Products — H1 2025",
    type: "Products",
    generated: "2025-07-05",
    size: "67 KB",
  },
  {
    id: "RPT-004",
    name: "Order Fulfilment Rate — June",
    type: "Orders",
    generated: "2025-07-06",
    size: "29 KB",
  },
];

const TYPE_COLOR: Record<string, string> = {
  Sales: "bg-blue-100 text-blue-700",
  Revenue: "bg-green-100 text-green-700",
  Products: "bg-purple-100 text-purple-700",
  Orders: "bg-yellow-100 text-yellow-700",
};

const MyReportsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <header className="pb-2">
        <h2 className="text-xl font-bold tracking-tight">My Reports</h2>
        <p className="text-sm mt-1 text-neutral-500">
          Generate and download reports for your shop.
        </p>
        <p className="text-xs mt-1 text-neutral-400 italic">
          Showing sample reports — report generation coming soon.
        </p>
      </header>

      {/* Generate button (disabled placeholder) */}
      <div className="flex justify-end">
        <button
          disabled
          title="Coming soon"
          className="text-sm bg-black text-white px-4 py-2 rounded opacity-40 cursor-not-allowed"
        >
          + Generate Report
        </button>
      </div>

      {/* Reports table */}
      <div className="border border-neutral-200 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Report</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Generated</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Size</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {REPORTS.map((report) => (
              <tr key={report.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-neutral-800">{report.name}</p>
                  <p className="text-xs text-neutral-400 font-mono">{report.id}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLOR[report.type]}`}>
                    {report.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-500">{report.generated}</td>
                <td className="px-4 py-3 text-neutral-500">{report.size}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    disabled
                    title="Coming soon"
                    className="text-xs border border-neutral-200 px-3 py-1 rounded text-neutral-400 cursor-not-allowed"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReportsPage;

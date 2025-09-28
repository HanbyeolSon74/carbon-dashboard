export default function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 h-[450px]">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>

        <div className="h-80 bg-gray-200 rounded"></div>

        <div className="flex justify-center pt-4 space-x-4">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

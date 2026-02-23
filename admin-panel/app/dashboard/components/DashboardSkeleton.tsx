export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-6 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-28 bg-gray-200 rounded-xl"
        />
      ))}
    </div>
  )
}
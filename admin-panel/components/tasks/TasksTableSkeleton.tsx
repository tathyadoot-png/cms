import Skeleton from '@/components/ui/Skeleton'

export default function TasksTableSkeleton() {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  )
}
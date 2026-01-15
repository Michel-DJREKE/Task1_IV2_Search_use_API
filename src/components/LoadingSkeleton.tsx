export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image skeleton */}
            <div className="w-full sm:w-40 h-48 sm:h-auto skeleton-shimmer" />

            {/* Content skeleton */}
            <div className="flex-1 p-5 space-y-4">
              {/* Title */}
              <div className="flex items-start justify-between gap-3">
                <div className="h-6 w-3/4 rounded-lg skeleton-shimmer" />
                <div className="h-6 w-14 rounded-full skeleton-shimmer" />
              </div>

              {/* Genres */}
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded-full skeleton-shimmer" />
                <div className="h-5 w-20 rounded-full skeleton-shimmer" />
                <div className="h-5 w-14 rounded-full skeleton-shimmer" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded skeleton-shimmer" />
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
              </div>

              {/* Meta */}
              <div className="flex gap-4">
                <div className="h-4 w-12 rounded skeleton-shimmer" />
                <div className="h-4 w-16 rounded skeleton-shimmer" />
                <div className="h-5 w-20 rounded-full skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

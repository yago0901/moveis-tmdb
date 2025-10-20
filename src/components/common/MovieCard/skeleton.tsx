export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-[#1b263b] shadow-md animate-pulse">
      <div className="relative">
        <div className="w-full aspect-[2/3] bg-gray-700"></div>
        
        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/60 p-3">
          <div className="h-4 bg-gray-600 rounded mb-2"></div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="w-12 h-6 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MovieDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="md:flex gap-8">
          <div className="md:w-2/5">
            <div className="w-full h-[600px] bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          <div className="md:w-3/5 space-y-4">
            <div className="h-8 bg-gray-700 rounded animate-pulse w-3/4"></div>
            
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-20 h-6 bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="w-48 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-32 h-5 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="w-1/3 h-6 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="w-48 h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
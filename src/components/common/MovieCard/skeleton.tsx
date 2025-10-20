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
import { twMerge } from 'tailwind-merge';

// Shimmer effect
const TableShimmer = ({ className }: { className?: string }) => {
  return (
    <div className="mt-2 w-full animate-pulse">
      <div
        className={twMerge(
          'h-10 bg-shimmerColorLight dark:bg-shimmerColorDark w-full',
          className,
        )}
      ></div>
    </div>
  );
};

export default TableShimmer;

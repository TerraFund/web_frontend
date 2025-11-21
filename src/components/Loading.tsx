interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton';
  text?: string;
}

export default function Loading({ size = 'md', variant = 'spinner', text }: LoadingProps) {
  if (variant === 'skeleton') {
    return (
      <div className="animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        {text && <p className="text-sm text-gray-500 mt-2">{text}</p>}
      </div>
    );
  }

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
      {text && <p className="text-sm text-gray-500 mt-4">{text}</p>}
    </div>
  );
}
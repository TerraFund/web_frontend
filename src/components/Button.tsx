import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

   const variantClasses = {
     primary: 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg focus:ring-primary rounded-xl',
     secondary: 'bg-secondary text-white hover:bg-secondary/90 hover:shadow-lg focus:ring-secondary rounded-xl',
     outline: 'border-2 border-gray-300
     ghost: 'text-gray-700
     gradient: 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:from-primary/90 hover:to-accent/90 focus:ring-primary rounded-xl',
     danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500 rounded-xl',
   };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      )}
      {children}
    </button>
  );
}
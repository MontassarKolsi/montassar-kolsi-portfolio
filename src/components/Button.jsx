import { memo } from "react";

export const Button = memo(({
  className = "px-4 py-4 text-sm md:px-8 w-full md:text-lg",
  size = "",
  children,
  disabled = false,
  type = "button",
  ariaLabel,
  ...props
}) => {
  const baseClasses = "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-4 py-4 text-sm ",
    md: "px-8 py-8 text-lg",
  };
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${className}`} 
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
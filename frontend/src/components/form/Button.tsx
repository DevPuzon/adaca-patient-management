import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const ButtonComponent = ({
  loading = false,
  disabled,
  children,
  className,
  type = 'submit',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 cursor-pointer',
        className,
      )}
      {...rest}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

const Button = React.memo(ButtonComponent);
Button.displayName = 'Button';
export default Button;

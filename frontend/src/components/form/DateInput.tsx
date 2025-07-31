import React from 'react';
import type { FieldError } from 'react-hook-form';

type DateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError | string;
};

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <input
          type="date"
          ref={ref}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />

        {error && (
          <p className="text-red-600 text-sm">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';

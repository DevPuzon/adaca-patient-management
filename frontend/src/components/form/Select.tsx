import React from 'react';
import type { FieldError } from 'react-hook-form';

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  placeholder?: string;
  error?: FieldError | string;
};

const SelectComponent = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm text-gray-600"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        >
          {props?.placeholder && (
            <option value="" disabled hidden>
              {props?.placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-red-600 text-sm">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
    );
  },
);

const Select = React.memo(SelectComponent);
Select.displayName = 'Select';
export default Select;

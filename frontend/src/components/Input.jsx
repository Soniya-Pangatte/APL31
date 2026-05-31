import React, { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Accessible form Input component with label association and error state support.
 * Uses React's useId() for automatic unique ID generation.
 */
const Input = forwardRef(({ label, error, className, id: externalId, ...props }, ref) => {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 ml-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={twMerge(
          'w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-black transition-all placeholder:text-slate-400',
          error ? 'border-black ring-1 ring-black' : '',
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs font-bold text-black ml-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

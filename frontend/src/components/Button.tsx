import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Props for the `Button` component.
 * - `isLoading`: when true, shows a spinner and disables the button.
 * - `loadingText`: text to display while loading.
 * Extends the native `button` attributes to maintain standard behavior.
 */
interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

/**
 * Generic button component with an optional loading state.
 */
export const Button = ({
  isLoading = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <button aria-busy={isLoading} disabled={isLoading || disabled} {...props}>
      <span className="inline-flex items-center justify-center gap-2">
        {isLoading && (
          <svg
            aria-hidden="true"
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              fill="currentColor"
            />
          </svg>
        )}
        <span>{isLoading ? loadingText : children}</span>
      </span>
    </button>
  );
};

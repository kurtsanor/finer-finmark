type NumberStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};
const NumberStepper = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
}: NumberStepperProps) => {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center border-r border-gray-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M5 12h14" />
        </svg>
      </button>

      <input
        type="number"
        value={value}
        readOnly
        className="h-10 w-16 appearance-none text-center focus:outline-none"
      />

      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center border-l border-gray-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
};

export default NumberStepper;

export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          px-4
          py-2
          border
          rounded-lg
          outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          ${className}
        `}
      />

      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}
export function Button({ className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition ${className}`}
      {...props}
    />
  );
}

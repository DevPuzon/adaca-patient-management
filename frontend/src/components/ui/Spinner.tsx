export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}

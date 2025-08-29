export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded font-bold text-white bg-gradient-to-r from-primary-purple via-primary-pink to-primary-orange hover:from-primary-pink hover:to-primary-yellow ${className}`}
    >
      {children}
    </button>
  );
}

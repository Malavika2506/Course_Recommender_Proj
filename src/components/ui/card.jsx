export function Card({ className = "", ...props }) {
  return <div className={`bg-white shadow-lg rounded-2xl p-4 ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`mb-2 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-xl font-semibold ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`${className}`} {...props} />;
}

import Image from "next/image";

export default function LogoBadge({ size = 48, className, priority = false }) {
  const wrapperClasses = [
    "relative overflow-hidden rounded-2xl bg-black ring-1 ring-purple-700/60 shadow-lg shadow-purple-900/40",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses} style={{ width: size, height: size }}>
      <Image
        src="/SSL-banner.webp"
        alt="Security Society at LSU logo"
        fill
        sizes={`${size}px`}
        priority={priority}
        className="object-contain p-1.5"
      />
    </div>
  );
}

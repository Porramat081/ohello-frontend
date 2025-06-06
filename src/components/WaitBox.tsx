import { useEffect, useState } from "react";

export default function WaitingBox() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev < 3 ? prev + 1 : 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-600 text-2xl flex items-center justify-between gap-2">
      <span>Please wait</span>
      <span className="tracking-widest">{".".repeat(dotCount)}</span>
    </div>
  );
}

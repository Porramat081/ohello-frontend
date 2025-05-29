import { useEffect, useState } from "react";

interface VerifyCountDownInterface {
  timeStr: string;
}

const mockTime = new Date().getTime();

export default function VerifyCountDown({ timeStr }: VerifyCountDownInterface) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const startTime = new Date(mockTime).getTime();
    const endTime = startTime + 10 * 60 * 1000;

    const updateCountDown = () => {
      const now = Date.now();
      const diff = endTime - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    updateCountDown();
    const interval = setInterval(updateCountDown, 1000);

    return () => clearInterval(interval);
  }, [timeStr]);

  const min = Math.floor(timeLeft / (1000 * 60));
  const sec = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const formattedTime = `${min.toString().padStart(2, "0")} : ${sec
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="text-foreground text-sm">
      {timeLeft > 0 ? `Time left: ${formattedTime}` : "Code is Expired!"}
    </div>
  );
}

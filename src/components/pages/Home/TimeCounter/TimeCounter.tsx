import { getRemaingTime } from "@/utils/dateUtils";
import { useEffect, useState } from "react";

interface TimeCounterProps {
  endDate: Date;
}

export default function TimeCounter({ endDate }: TimeCounterProps) {
  const remainingTime = getRemaingTime(endDate);

  const [time, setTime] = useState(remainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getRemaingTime(endDate);
      setTime(t);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex">
      {/* Day */}
      <div className="mr-4">
        <div className="text-xs font-medium">Ngày</div>
        <div>
          <span className="text-2xl font-bold mr-4">
            {time.days_count / 10 < 1 ? `0${time.days_count}` : time.days_count}
          </span>
          <span className="text-2xl font-bold text-secondary">:</span>
        </div>
      </div>
      {/* Hour */}
      <div className="mr-4">
        <div className="text-xs font-medium">Giờ</div>
        <div>
          <span className="text-2xl font-bold mr-4">
            {time.hours_count / 10 < 1
              ? `0${time.hours_count}`
              : time.hours_count}
          </span>
          <span className="text-2xl font-bold text-secondary">:</span>
        </div>
      </div>
      {/* Minute */}
      <div className="mr-4">
        <div className="text-xs font-medium">Phút</div>
        <div>
          <span className="text-2xl font-bold mr-4">
            {time.minutes_count / 10 < 1
              ? `0${time.minutes_count}`
              : time.minutes_count}
          </span>
          <span className="text-2xl font-bold text-secondary">:</span>
        </div>
      </div>
      {/* Second */}
      <div className="mr-4">
        <div className="text-xs font-medium">Giây</div>
        <div>
          <span className="text-2xl font-bold mr-4">
            {time.seconds_count / 10 < 1
              ? `0${time.seconds_count}`
              : time.seconds_count}
          </span>
        </div>
      </div>
    </div>
  );
}

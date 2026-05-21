"use client";
import React, { useState, useEffect } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

// Define the type for the props
interface CountdownTimerProps {
    endTime: number; // Unix timestamp in seconds
}

// Define the type for the state
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// CountdownTimer Component
const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date(); // local time
        const targetTime = new Date(endTime * 1000); // local time

        // Convert to UTC to avoid timezone issues
        const nowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        const targetUtc = Date.UTC(targetTime.getUTCFullYear(), targetTime.getUTCMonth(), targetTime.getUTCDate(), targetTime.getUTCHours(), targetTime.getUTCMinutes(), targetTime.getUTCSeconds());

        const totalSeconds = (targetUtc - nowUtc) / 1000; // Total seconds difference
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        return {
            days,
            hours: hours - 6,
            minutes,
            seconds,
        };
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This runs only on the client side
            setTimeLeft(calculateTimeLeft());

            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [endTime]);

    if (!timeLeft) return null; // Prevent rendering until client-side data is available

    return (
        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-800">
                MYSTERY DEALS <span className="font-normal">ENDS IN</span>
            </div>

            <div className="flex space-x-4 text-center">
                {timeLeft.days > 0 && (
                    <div>
                        <span className="text-2xl font-bold text-gray-800">
                            {String(timeLeft.days).padStart(2, "0")}
                        </span>
                        <div className="text-xs text-gray-500">DAYS</div>
                    </div>
                )}
                <div>
                    <span className="text-2xl font-bold text-gray-800">
                        {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <div className="text-xs text-gray-500">HOURS</div>
                </div>
                <div>
                    <span className="text-2xl font-bold text-gray-800">
                        {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <div className="text-xs text-gray-500">MINS</div>
                </div>
                <div>
                    <span className="text-2xl font-bold text-gray-800">
                        {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <div className="text-xs text-gray-500">SECS</div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;

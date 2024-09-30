import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/redux/store";
import { format, set } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return format(date, "EEE, dd MMM");
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Function to handle time parsing and return date with time
export const parseTimeAndSet = (
  baseDate: Date,
  timeMatch: RegExpMatchArray | null
) => {
  if (!timeMatch) return baseDate; // No time provided, return date as it is

  const hours = parseInt(timeMatch[1], 10); // Extract hour part
  const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0; // Extract minute part, or default to 0
  const period = timeMatch[3]?.toLowerCase(); // Extract "am" or "pm"

  let finalHours = hours;
  if (period === "pm" && hours < 12) {
    finalHours += 12; // Convert PM to 24-hour format
  } else if (period === "am" && hours === 12) {
    finalHours = 0; // Midnight case
  }

  // Set time to the parsed date
  return set(baseDate, { hours: finalHours, minutes });
};

// function to display date
export const displayDate = (date: Date, today: Date, tomorrow: Date) => {
  if (!date) return null;

  switch (formatDate(date)) {
    case formatDate(today):
      return "Today";
    case formatDate(tomorrow):
      return "Tomorrow";
    default:
      return format(date, "EEE, dd MMM");
  }
};

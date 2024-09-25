import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/redux/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

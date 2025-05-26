import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genInputFormClass(checker: boolean, otherText: string) {
  const text = `${otherText} ${checker && "border border-red-500"}`;
  return text;
}

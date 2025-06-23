import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ErrorResponse {
  email: string;
  password: string;
  firstName: string;
  surName: string;
}

export interface ErrorResponseType {
  response: { data: { message: string } & ErrorResponse };
  message: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genInputFormClass(checker: boolean, otherText: string) {
  const text = `${otherText} ${checker && "border border-red-500"}`;
  return text;
}

export function genErrorResponse(
  error: unknown & ErrorResponseType,
  process: string
) {
  if (error.response?.data?.message) {
    return error.response?.data?.message;
  } else if (error.message) {
    return error.message;
  } else {
    return `There's an error in ${process} process.`;
  }
}

export function genAbbration(firstname: string, surname: string) {
  return firstname[0].toUpperCase() + surname[0].toUpperCase();
}

// utils/route-change-listener.ts
export function listenToRouteChanges(callback: (status: boolean) => void) {
  const pushState = history.pushState;
  const replaceState = history.replaceState;

  // Patch pushState
  history.pushState = function (...args) {
    const result = pushState.apply(this, args);
    callback(true);
    return result;
  };

  // Patch replaceState
  history.replaceState = function (...args) {
    const result = replaceState.apply(this, args);
    callback(true);
    return result;
  };

  // Listen to back/forward
  window.addEventListener("popstate", () => {
    callback(true);
  });

  if (document.readyState === "complete") {
    callback(false);
  } else {
    window.addEventListener("load", () => callback(false));
  }
}

export function formatDateWithAmPm(
  createdDate: Date,
  updatedDate: Date
): string {
  const date = new Date(updatedDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // convert '0' to '12'

  const hourString = String(hours).padStart(2, "0");
  const finalString = `${day}/${month}/${year} ${hourString}:${minutes} ${ampm}`;

  if (createdDate < updatedDate) {
    return "edited " + finalString;
  }

  return finalString;
}

export function formatMonthYear(createdAt: Date | undefined) {
  if (!createdAt) return;
  const date = new Date(createdAt);
  const formatted = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  return formatted;
}

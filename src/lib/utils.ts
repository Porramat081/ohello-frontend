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

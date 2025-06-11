"use client";

import {
  userGetTimeVerify,
  userResendCodeVerify,
  verifyUser,
} from "@/apis/user";
import { Button } from "@/components/Button";
import VerifyCountDown from "@/components/VerifyCountdown";
import { useAuthorize } from "@/hooks/useForm";
import { errorAxios } from "@/lib/errorHandle";
import { useLoading } from "@/providers/LoaderProvider";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function VerifyPage() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [startTime, setStartTime] = useState("");
  const router = useRouter();
  const loadingProvider = useLoading();

  const { existVerify } = useAuthorize();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const next = document.getElementById(`code-${index + 1}`);
    if (value && next) (next as HTMLInputElement).focus();
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    try {
      const res = await verifyUser(code.join(""));
      if (res.success) {
        toast.success(res.message);
        router.replace("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      errorAxios(error);
    }
  };

  const handleClickX = () => {
    loadingProvider?.setLoading(true);
    router.replace("/");
  };

  const handleResend = async () => {
    try {
      loadingProvider?.setLoading(true);
      const result = await userResendCodeVerify();
      if (result) {
        setStartTime(result.updatedAt?.toString());
      } else {
        setStartTime("");
      }
    } catch (error) {
      errorAxios(error);
    } finally {
      loadingProvider?.setLoading(false);
    }
  };

  const fetchVerifyObj = async () => {
    existVerify();
    try {
      const result = await userGetTimeVerify();
      if (result.isExceedTime) {
        setStartTime("");
      } else {
        setStartTime(result.updatedAt?.toString() || "");
      }
    } catch (error) {
      errorAxios(error);
    }
  };

  useEffect(() => {
    fetchVerifyObj();
  }, []);

  return (
    <div className="min-h-svh flex items-center justify-center bg-gray-200 dark:bg-gray-500">
      <div className="relative mt-[-10rem] p-6 bg-background min-w-[300px] w-[60%] max-w-[900px] shadow-md rounded-xl text-center space-y-4">
        <button
          className="cursor-pointer rounded-full bg-red-500 absolute top-0 right-0 z-10 translate-x-[30%] translate-y-[-30%]"
          onClick={handleClickX}
          type="button"
        >
          <X />
        </button>
        <h1 className="text-xl font-semibold text-foreground">
          Verify Your Account
        </h1>
        <p className="text-foreground">
          Enter the 6-digit code sent to your email
        </p>
        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 text-center border rounded-md text-lg focus:outline-blue-500"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="flex flex-col-reverse gap-4 items-center">
          <div className="flex items-center justify-between gap-10 mt-3">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm hover:underline hover:text-primary text-muted-foreground cursor-pointer"
            >
              Resend Code
            </button>

            <VerifyCountDown timeStr={startTime} />
          </div>
          <Button
            onClick={handleSubmit}
            className="text-md mt-4 px-4 py-2 bg-primary text-white rounded cursor-pointer"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

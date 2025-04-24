import Form from "next/form";
import { Label } from "./Label";
import { Input } from "./Input";
import { Button } from "./Button";
import { useState } from "react";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import SubmitBtn from "./SubmitBtn";
import { Separator } from "./Separator";
import Link from "next/link";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form action="" className="px-4">
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <Label
            htmlFor="email-username"
            className="text-xs font-medium text-foreground"
          >
            Email / Username <span className="text-red-500">*</span>
          </Label>
          <Input
            name="email-username"
            id="email-username"
            placeholder="email or username"
            className="bg-foreground/10 placeholder:text-gray-400"
          ></Input>
          {}
        </div>
        <div>
          <Label
            htmlFor="login-password"
            className="text-xs font-medium text-foreground"
          >
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              name="login-password"
              id="login-password"
              className="bg-foreground/10"
            ></Input>
            <Button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="cursor-pointer p-0 h-auto absolute top-[50%] right-3 translate-y-[-50%]"
              variant={"ghost"}
            >
              {showPassword ? <Eye size={10} /> : <EyeClosed size={10} />}
            </Button>
          </div>
          {}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <SubmitBtn name="Login" icon={LogIn} />
        <span className="text-xs underline hover:text-primary cursor-pointer">
          Forget Password?
        </span>
      </div>
      <div className="text-xs font-bold my-4">
        Don't have an account ?{" "}
        <Link href={"/auth/signup"}>
          <span className="cursor-pointer hover:underline text-primary">
            Sign Up
          </span>
        </Link>
      </div>
      <Separator />
    </Form>
  );
}

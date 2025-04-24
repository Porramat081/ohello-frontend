import Form from "next/form";
import { Label } from "./Label";
import { Input } from "./Input";
import { useForm } from "@/hooks/useForm";
import { createUser } from "@/actions/signup";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./Button";
import { Eye, EyeClosed, Save } from "lucide-react";
import { useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { Separator } from "./Separator";
import Link from "next/link";
import { SessionProvider, signIn, useSession } from "next-auth/react";

export default function SignUpForm() {
  const { errors, formAction, isPending, clearErrors } = useForm(createUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form action={formAction} className="px-4">
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <Label
            htmlFor="firstname"
            className="text-xs font-medium text-foreground"
          >
            Firstname <span className="text-red-500">*</span>
          </Label>
          <Input
            name="firstname"
            id="firstname"
            placeholder=""
            className="bg-foreground/10"
          />
          {errors.firstname && (
            <ErrorMessage error={errors.firstname.join(",")} />
          )}
        </div>

        <div>
          <Label
            htmlFor="surname"
            className="text-xs font-medium text-foreground"
          >
            Surname <span className="text-red-500">*</span>
          </Label>
          <Input
            name="surname"
            id="surname"
            placeholder=""
            className="bg-foreground/10"
          />
          {errors.surname && <ErrorMessage error={errors.surname.join(",")} />}
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-xs font-medium text-foreground"
          >
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            className="bg-foreground/10 placeholder:text-gray-400"
          ></Input>
          {errors.email && <ErrorMessage error={errors.email.join(",")} />}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-xs font-medium text-foreground"
          >
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder=""
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
          {errors.password && (
            <ErrorMessage error={errors.password.join(",")} />
          )}
        </div>

        <div>
          <Label
            htmlFor="confirm-password"
            className="text-xs font-medium text-foreground"
          >
            Confirm Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              id="confirm-password"
              placeholder=""
              className="bg-foreground/10 relative"
            ></Input>
            <Button
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              type="button"
              className="cursor-pointer p-0 h-auto absolute top-[50%] right-3 translate-y-[-50%]"
              variant={"ghost"}
            >
              {showConfirmPassword ? (
                <Eye size={10} />
              ) : (
                <EyeClosed size={10} />
              )}
            </Button>
          </div>
          {errors.password && (
            <ErrorMessage error={errors.password.join(",")} />
          )}
        </div>
      </div>
      <SubmitBtn name="Submit" pending={isPending} icon={Save} />
      <div className="my-4 text-xs text-foreground font-bold">
        Already have an account ?{" "}
        <Link href={"/auth/signin"}>
          <span className="text-primary cursor-pointer hover:underline">
            Login
          </span>
        </Link>
      </div>
      <Separator />
      <div className="text-xs font-bold text-foreground">Or</div>

      <Button
        type="button"
        onClick={async (e) => {
          try {
            e.preventDefault();
            const result = await signIn("google");
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Sign Up With Google
      </Button>
    </Form>
  );
}

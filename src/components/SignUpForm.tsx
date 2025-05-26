import Form from "next/form";
import { Label } from "./Label";
import { Input } from "./Input";
import { useForm } from "@/hooks/useForm";
import { createUser } from "@/actions/user";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./Button";
import { Eye, EyeClosed, Save, BrushIcon } from "lucide-react";
import { useRef, useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { Separator } from "./Separator";
import Link from "next/link";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { genInputFormClass } from "@/lib/utils";

export default function SignUpForm() {
  const { errors, formAction, isPending, state, clearErrors } = useForm(
    createUser,
    "/"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleClearForm = () => {
    formRef.current?.reset();
    state.value = {};
    clearErrors();
  };
  return (
    <Form className="px-4" ref={formRef} action={formAction}>
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <Label
            htmlFor="firstname"
            className="text-xs font-medium text-foreground"
          >
            Firstname <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            name="firstname"
            id="firstname"
            defaultValue={state.value?.firstName}
            placeholder=""
            className={genInputFormClass(
              !!errors.firstName,
              "bg-foreground/10"
            )}
          />
          {errors.firstName && <ErrorMessage error={errors.firstName} />}
        </div>

        <div>
          <Label
            htmlFor="surname"
            className="text-xs font-medium text-foreground"
          >
            Surname <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            name="surname"
            id="surname"
            placeholder=""
            className={genInputFormClass(!!errors.surname, "bg-foreground/10")}
            defaultValue={state.value?.surname}
          />
          {errors.surname && <ErrorMessage error={errors.surname} />}
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-xs font-medium text-foreground"
          >
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            required
            type="email"
            name="email"
            id="email"
            defaultValue={state.value?.email}
            placeholder="example@domain.com"
            className={genInputFormClass(
              !!errors.email,
              "bg-foreground/10 placeholder:text-gray-400"
            )}
          ></Input>
          {errors.email && <ErrorMessage error={errors.email} />}
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
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={genInputFormClass(
                !!errors.password,
                "bg-foreground/10 pr-8 overflow-y-auto"
              )}
              defaultValue={state.value?.password}
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
          {errors.password && <ErrorMessage error={errors.password} />}
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
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              id="confirm-password"
              className={genInputFormClass(
                !!errors.password,
                "bg-foreground/10 pr-8 overflow-y-auto"
              )}
              defaultValue={state.value?.confirmPassword}
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
          {errors.confirmPassword && (
            <ErrorMessage error={errors.confirmPassword} />
          )}
        </div>
      </div>
      <div>
        <SubmitBtn name="Submit" pending={isPending} icon={Save} />
        <Button onClick={handleClearForm} className="" type="button">
          <BrushIcon />
        </Button>
      </div>
      <div className="my-4 text-xs text-foreground font-bold">
        Already have an account ?{" "}
        <Link href={"/auth/signin"}>
          <span className="text-primary cursor-pointer hover:underline">
            Login
          </span>
        </Link>
      </div>
      <Separator />
      <div className="text-xs font-bold text-foreground mb-3">Or</div>

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

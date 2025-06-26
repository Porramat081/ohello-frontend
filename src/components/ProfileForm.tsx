import Form from "next/form";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useForm } from "@/hooks/useForm";
import { changeProfile } from "@/actions/profile";
import { Label } from "./Label";
import { UserType } from "@/types/user";
import { genInputFormClass } from "@/lib/utils";
import { Button } from "./Button";
import { Eye, EyeClosed, Save } from "lucide-react";
import SubmitBtn from "./SubmitBtn";
import ErrorMessage from "./ErrorMessage";

interface ProfileFormProps {
  user: UserType;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { errors, isPending, formAction, clearErrors } = useForm(
    changeProfile,
    "",
    true
  );

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form
      onSubmit={clearErrors}
      action={formAction}
      className="px-2 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-2 max-w-[600px] mx-auto"
    >
      <input
        readOnly
        className="hidden"
        type="text"
        value={
          user.email +
          " " +
          user.firstName +
          " " +
          user.surname +
          " " +
          user.username
        }
        name="default-value"
        id="default-value"
      />
      <div className="col-span-1">
        <div>
          <Label
            htmlFor="firstName"
            className="text-primary font-bold text-sm mb-1"
          >
            Change Firstname
          </Label>
          <Input
            className={`mb-3 ${genInputFormClass(
              !!errors.firstName,
              "bg-foreground/10"
            )}`}
            defaultValue={user.firstName}
            name="firstName"
            id="firstName"
          />
          {errors.firstName && <ErrorMessage error={errors.firstName} />}
        </div>
        <div>
          <Label
            htmlFor="surname"
            className={`text-primary font-bold text-sm mb-1`}
          >
            Change Surname
          </Label>
          <Input
            className={`mb-3 ${genInputFormClass(
              !!errors.surname,
              "bg-foreground/10"
            )}`}
            defaultValue={user.surname}
            name="surname"
            id="surname"
          />
          {errors.surname && <ErrorMessage error={errors.surname} />}
        </div>
        <div>
          <Label className={`text-primary font-bold text-sm mb-1`}>
            Change Email
          </Label>
          <Input
            className={`mb-3 ${genInputFormClass(
              !!errors.email,
              "bg-foreground/10"
            )}`}
            defaultValue={user.email}
            name="email"
            id="email"
          />
          {errors.email && <ErrorMessage error={errors.email} />}
        </div>
      </div>
      <div className="col-span-1">
        <div>
          <Label
            htmlFor="username"
            className={`text-primary font-bold text-sm mb-1`}
          >
            Change Username
          </Label>
          <Input
            className={`mb-3 ${genInputFormClass(
              !!errors.username,
              "bg-foreground/10"
            )}`}
            defaultValue={user.username}
            name="username"
            id="username"
          />
        </div>
        {errors.username && <ErrorMessage error={errors.username} />}
        <div className="mt-3">
          <Label
            htmlFor="oldPassword"
            className={`text-primary font-bold text-sm mb-1`}
          >
            Change Password
          </Label>

          <div className="relative">
            <Input
              type={showOldPassword ? "text" : "password"}
              className={`mb-3 ${genInputFormClass(
                !!errors.oldPassword,
                "bg-foreground/10"
              )}`}
              placeholder="Enter Old Password"
              name="oldPassword"
              id="oldPassword"
            />
            <Button
              type="button"
              className="cursor-pointer p-0 h-auto absolute top-[50%] right-3 translate-y-[-50%]"
              variant={"ghost"}
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <Eye size={10} /> : <EyeClosed size={10} />}
            </Button>
          </div>
          {errors.oldPassword && <ErrorMessage error={errors.oldPassword} />}

          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              className={`mb-3 ${genInputFormClass(
                !!errors.newPassword,
                "bg-foreground/10"
              )}`}
              placeholder="Enter New Password"
              name="newPassword"
              id="newPassword"
            />
            <Button
              type="button"
              className="cursor-pointer p-0 h-auto absolute top-[50%] right-3 translate-y-[-50%]"
              variant={"ghost"}
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <Eye size={10} /> : <EyeClosed size={10} />}
            </Button>
          </div>
          {errors.newPassword && <ErrorMessage error={errors.newPassword} />}

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              className={`mb-3 ${genInputFormClass(
                !!errors.confirmPassword,
                "bg-foreground/10"
              )}`}
              placeholder="Confirm New Password"
              name="confirmPassword"
              id="confirmPassword"
            />
            <Button
              type="button"
              className="cursor-pointer p-0 h-auto absolute top-[50%] right-3 translate-y-[-50%]"
              variant={"ghost"}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
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

      <div className="w-full mt-5 mb-7 col-span-full">
        <SubmitBtn
          name={"Save Change"}
          pending={isPending}
          icon={Save}
          addclassname={"w-full dark:text-white"}
        />
      </div>
    </Form>
  );
}

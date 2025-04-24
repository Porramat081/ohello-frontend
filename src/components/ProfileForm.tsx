import Form from "next/form";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useForm } from "@/hooks/useForm";
import { changeProfile } from "@/actions/profile";

export default function ProfileForm() {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <Form
      action=""
      className="px-2 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-2 max-w-[600px] mx-auto"
    >
      <div className="col-span-1">
        <div>
          <h2 className="text-primary font-bold text-sm mb-1">
            Change Firstname
          </h2>
          <Input
            className="mb-3"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-primary font-bold text-sm mb-1">
            Change Surname
          </h2>
          <Input
            className="mb-3"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-primary font-bold text-sm mb-1">Change Email</h2>
          <Input
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div>
          <h2 className="text-primary font-bold text-sm mb-1">Change UserID</h2>
          <Input
            className="mb-3"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h2 className="text-primary font-bold text-sm mb-1">
            Change Password
          </h2>
          <Input
            className="mb-3"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            className="mb-3"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            className="mb-3"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
      </div>
    </Form>
  );
}

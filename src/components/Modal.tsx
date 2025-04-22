import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

interface ModalProps {
  onOpenChange: (state: boolean) => void;
  isOpen: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>

        {props.children}
        <DialogFooter>
          <div>Submit Comment</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

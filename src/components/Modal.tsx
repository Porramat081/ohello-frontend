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
  footer?: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog onOpenChange={props.onOpenChange} open={props.isOpen}>
      <DialogContent className="w-full sm:min-w-[500px] lg:min-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-start">{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>

        {props.children}

        {props.footer && <DialogFooter>{props.footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

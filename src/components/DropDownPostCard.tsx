import { CircleEllipsis } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function DropdownPostcard({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-2 relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:text-primary"
        aria-label="More options"
      >
        <CircleEllipsis size={16} />
      </button>

      {open && (
        <div
          className="overflow-hidden absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black/5"
          role="menu"
        >
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-sidebar-primary-foreground cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-sidebar-primary-foreground cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

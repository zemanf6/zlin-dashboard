import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  label?: string;
  onClick: () => void;
  className?: string;
};

export function BackButton({ label = "Zpět", onClick, className }: BackButtonProps) {
  const classes = ["page-back-button", className].filter(Boolean).join(" ");
  return <button className={classes} type="button" onClick={onClick}><ArrowLeft size={18} /> {label}</button>;
}

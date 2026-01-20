import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import "../../styles/ui/Input.css";

// Input Interface
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "filled";
}

// Textarea Interface
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: "default" | "filled";
}

export function Input({ className = "", label, variant = "default", ...props }: InputProps) {
  const inputClass = `input input-${variant} ${className}`;
  
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input className={inputClass} {...props} />
    </div>
  );
}

export function Textarea({ className = "", label, variant = "default", ...props }: TextareaProps) {
  const textareaClass = `input textarea input-${variant} ${className}`;
  
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <textarea className={textareaClass} {...props} />
    </div>
  );
}

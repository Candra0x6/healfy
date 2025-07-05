"use client";
import { TbArrowBackUp } from "react-icons/tb";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="
      bg-card flex gap-x-2 items-center font-bold py-2 px-5 rounded-xl hover:text-primary shadow-md shadow-foreground/10 transition-colors duration-200 "
    >
      <TbArrowBackUp size={24} />
      Back
    </button>
  );
}

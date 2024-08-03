import React from "react";
import { Check } from "lucide-react";

interface SuccessBoundaryProps {
  isSuccess: boolean;
  message: string;
}

const SuccessBoundary: React.FC<SuccessBoundaryProps> = ({ isSuccess, message }) => {
  if (!isSuccess) return null;

  return (
    <p className="flex items-center gap-5">
      <Check /> {message}
    </p>
  );
};

export default SuccessBoundary;

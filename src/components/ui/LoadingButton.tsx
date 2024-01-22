"use client";

import { Button, ButtonProps } from "@/components/ui/button";

import { useState } from "react";
import { Loader } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Loader className="animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;

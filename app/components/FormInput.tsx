"use client";

import { Input, InputProps as BaseProps } from "@mantine/core";
import React, { ComponentProps } from "react";
// extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "style">,
//     InputProps
interface InputProps extends BaseProps {
  name: string;
  type?: string;
  label?: string;
  description?: string;
  defaultValue?: string | number;
  isDisabled?: boolean;
  isRequired?: boolean;
  error?: string | number;
}

export default function FormInput(props: InputProps) {
  const {
    isRequired = true,
    isDisabled = false,
    label,
    description,
    type = "text",
    error,
    ...rest
  } = props;

  return (
    <Input.Wrapper
      label={label}
      withAsterisk={isRequired}
      description={description}
      error={error}
    >
      <Input
        type={type}
        size="md"
        disabled={isDisabled}
        error={error}
        {...rest}
      />
    </Input.Wrapper>
  );
}

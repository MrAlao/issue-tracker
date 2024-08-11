import React, { PropsWithChildren } from "react";
import { Button as BaseButton, ButtonProps, Loader } from "@mantine/core";
import { useFormStatus } from "react-dom";

interface Props extends ButtonProps, PropsWithChildren {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export default function Button({ type = "button", children, ...rest }: Props) {
  return (
    <BaseButton type={type} {...rest}>
      {children}
    </BaseButton>
  );
}

Button.Submit = function Submit({ children, ...rest }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type={"submit"} disabled={pending} {...rest}>
      {pending && (
        <div className="absolute flex items-center justify-center inset-0">
          <Loader color="blue" size={"sm"} />
        </div>
      )}
      {children}
    </Button>
  );
};

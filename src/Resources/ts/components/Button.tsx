import clsx from "clsx";
import React from "react";
import { forwardRef } from "react";
import {
  Button as BaseButton,
  _internal_ComponentButton,
  ButtonProps as BaseButtonProps,
} from "@headlessui/react";

export interface ButtonProps extends BaseButtonProps {
  variant?: "primary" | "secondary" | "soft";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
  { variant = "primary", ...props },
  ref
) {
  return (
    <BaseButton
      ref={ref}
      {...props}
      className={clsx(
        "transition inline-flex items-center gap-2 rounded-md p-1 text-sm/6 border border-black/20 outline-none",
        "disabled:pointer-events-none disabled:select-none",
        "font-semibold  shadow focus:ring ",
        variant === "primary" &&
          "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
        variant === "secondary" &&
          "bg-white hover:bg-black/10 text-black disabled:opacity-60",
        variant === "soft" &&
          "bg-blue-500/10 border-none shadow-none text-blue-600 hover:bg-blue-500/20 disabled:opacity-60",
        props.className
      )}
    ></BaseButton>
  );
});

export default Button;

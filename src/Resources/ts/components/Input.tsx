import { HTMLAttributes, ReactNode, forwardRef } from "react";
import {
  Description,
  Field,
  Input as BaseInput,
  Label,
  InputProps as BaseInputProps,
  LabelProps,
  DescriptionProps,
} from "@headlessui/react";
import clsx from "clsx";

export interface InputProps extends BaseInputProps {
  label?: string;
  description?: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  labelProps?: LabelProps;
  descriptionProps?: DescriptionProps;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  {
    label,
    description,
    containerProps,
    labelProps,
    descriptionProps,
    startIcon,
    endIcon,
    error,
    ...props
  },
  ref
) {
  return (
    <div
      {...containerProps}
      className={clsx(
        "w-full max-w-md mb-2",
        containerProps?.className,
        props.disabled && "opacity-70"
      )}
    >
      <Field>
        {label && (
          <Label
            {...labelProps}
            className={clsx("text-sm/6 font-medium", labelProps?.className)}
          >
            {label}
          </Label>
        )}
        {description && (
          <Description
            {...descriptionProps}
            className={clsx(
              "text-sm/6 text-black/50",
              descriptionProps?.className
            )}
          >
            {description}
          </Description>
        )}
        <div className="relative">
          <BaseInput
            ref={ref}
            {...props}
            className={clsx(
              "mt-2 block w-full rounded border-black/10 shadow-sm border py-1.5 px-3 text-sm/6",
              "focus:outline-none data-[focus]:border-blue-500 data-[focus]:ring",
              "disabled:pointer-events-none",
              error && "border-red-600",
              startIcon && "pl-8",
              props.className
            )}
          />
          {startIcon && (
            <i className={clsx("top-2.5 left-2.5 absolute w-4 h-4")}>
              {startIcon}
            </i>
          )}
          {endIcon && (
            <i className={clsx("top-2.5 right-2.5 absolute w-4 h-4")}>
              {endIcon}
            </i>
          )}
          {error && (
            <small className="text-red-600 text-xs absolute -bottom-4.5">
              {error}
            </small>
          )}
        </div>
      </Field>
    </div>
  );
});

export default Input;

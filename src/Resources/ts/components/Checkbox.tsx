import { forwardRef } from "react";
import {
  Checkbox as BaseCheckbox,
  CheckboxProps as BaseCheckboxProps,
  Field,
  Label,
  LabelProps,
  _internal_ComponentCheckbox,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

export interface CheckboxProps extends BaseCheckboxProps {
  label?: string;
  labelProps?: LabelProps;
  labelPlacement?: "left" | "right";
}

const Checkbox = forwardRef<HTMLElement, CheckboxProps>(function (
  { label, labelPlacement = "right", labelProps, ...props },
  ref
) {
  return (
    <Field className="mb-2">
      <Label
        {...labelProps}
        className={clsx("text-sm/6 inline-flex gap-2", labelProps?.className)}
      >
        {labelPlacement === "left" && label}
        <BaseCheckbox
          {...props}
          ref={ref}
          className={clsx(
            "group size-6 rounded-md bg-black/10 p-1 ring-1 focus:ring focus:ring-blue-500/60 outline-none ring-black/20 data-[checked]:bg-blue-500",
            props.className
          )}
        >
          <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block" />
        </BaseCheckbox>
        {labelPlacement === "right" && label}
      </Label>
    </Field>
  );
});

export default Checkbox;

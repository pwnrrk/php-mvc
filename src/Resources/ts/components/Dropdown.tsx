import { ButtonHTMLAttributes, forwardRef } from "react";
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuItemProps,
  MenuItems,
  MenuItemsProps,
  Transition,
  _internal_ComponentMenu,
} from "@headlessui/react";
import { ButtonProps } from "./Button";
import clsx from "clsx";

export interface ExtendedMenuButtonProps extends MenuButtonProps {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ButtonProps["variant"];
}

export interface ItemProps extends MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  keyboard?: React.ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface DropdownProps {
  buttonProps?: ExtendedMenuButtonProps;
  menuItemsProps?: MenuItemsProps;
  items: ItemProps[];
}

const Dropdown = forwardRef<HTMLElement, DropdownProps>(function (
  { buttonProps, menuItemsProps, items, ...props },
  ref
) {
  const variant = buttonProps?.variant || "primary";
  return (
    <Menu {...props} ref={ref}>
      <MenuButton
        {...buttonProps}
        className={clsx(
          "inline-flex items-center gap-2 rounded-md p-1 text-sm/6 border border-black/20 outline-none",
          "disabled:pointer-events-none disabled:select-none",
          "font-semibold  shadow focus:ring ",
          variant === "primary" &&
            "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
          variant === "secondary" &&
            "bg-white hover:bg-black/10 text-black disabled:opacity-60",
          variant === "soft" &&
            "bg-blue-500/10 border-none shadow-none text-blue-600 hover:bg-blue-500/20 disabled:opacity-60",
          buttonProps?.className
        )}
      >
        {buttonProps?.startIcon}
        {buttonProps?.label}
        {buttonProps?.endIcon}
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          {...menuItemsProps}
          anchor={menuItemsProps?.anchor || "bottom end"}
          className={clsx(
            "w-52 origin-top-right rounded-xl border bg-white shadow-lg p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            menuItemsProps?.className
          )}
        >
          {items.map(function (
            { icon, keyboard, label, buttonProps, ...itemProps },
            index
          ) {
            return (
              <MenuItem key={index} {...itemProps}>
                <button
                  {...buttonProps}
                  className={clsx(
                    "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
                    buttonProps?.className
                  )}
                >
                  {icon}
                  {label}
                  <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">
                    {keyboard}
                  </kbd>
                </button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
});

export default Dropdown;

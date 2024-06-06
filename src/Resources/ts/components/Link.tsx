import React, { AnchorHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function (
  { className, ...props },
  ref
) {
  return (
    <a
      {...props}
      ref={ref}
      className={clsx("text-blue-600 hover:underline", className)}
    />
  );
});

export default Link;

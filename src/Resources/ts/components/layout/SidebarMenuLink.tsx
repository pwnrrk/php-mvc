import { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx";

export interface SidebarMenuLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
  label: string;
}

const SidebarMenuLink = forwardRef<HTMLAnchorElement, SidebarMenuLinkProps>(
  function ({ icon, label, ...props }, ref) {
    return (
      <a
        {...props}
        ref={ref}
        className={clsx(
          "flex flex-col items-center hover:bg-black/5 bg-transparent rounded p-2",
          "shadow-none border-none data-[active=true]:bg-black/10"
        )}
      >
        <div>{icon}</div>
        {label}
      </a>
    );
  }
);

export default SidebarMenuLink;

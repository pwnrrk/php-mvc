import {
  Dialog as BaseDialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  DialogProps,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, forwardRef } from "react";

export type ExtendedDialogProps = {
  open: boolean;
  title: ReactNode;
  content?: ReactNode;
  actions?: ReactNode[];
} & DialogProps;

const Dialog = forwardRef<HTMLElement, ExtendedDialogProps>(function (
  { open, title, content, actions, ...props },
  ref
) {
  return (
    <Transition appear show={open}>
      <BaseDialog
        {...props}
        as="div"
        className={clsx("relative z-10 focus:outline-none")}
        ref={ref}
      >
        <div className="fixed inset-0 z-10 bg-black/30 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-white shadow-lg border p-6">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
                {content}
                <div className="mt-4 space-x-2">{actions}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </BaseDialog>
    </Transition>
  );
});

export default Dialog;

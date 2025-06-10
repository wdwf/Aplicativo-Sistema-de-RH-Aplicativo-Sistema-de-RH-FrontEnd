import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
  disabled?: boolean;
}

export function IconButton({
  transparent,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`${transparent ? "bg-black/20" : "bg-white/10"} ${
        disabled ? "opacity-50" : null
      } border border-white/10 rounded-md p-1.5`}
    />
  );
}


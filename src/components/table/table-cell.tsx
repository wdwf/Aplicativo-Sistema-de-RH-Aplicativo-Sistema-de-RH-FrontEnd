import { ComponentProps } from "react";

interface TableCellProps extends ComponentProps<"td"> {
  className?: string;
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td {...props} className={`py-3 px-4 text-sm text-gray-900 ${className}`} />
  );
}


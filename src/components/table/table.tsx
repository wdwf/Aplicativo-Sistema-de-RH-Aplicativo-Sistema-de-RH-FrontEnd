import { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> { }

export function Table({ ...props }: TableProps) {
  return (
    <div className='border border-white/10 rounded-t-lg w-full bg-gray-200 max-h-[90vh] overflow-y-scroll'>
      <table className='w-full' {...props} />
    </div>
  );
}


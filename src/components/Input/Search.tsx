"use client";

import { searchAtom } from "@/utils/atoms";
import classNames from "classnames";
import { useSetAtom } from "jotai";
import React from "react";
import { MdSearch } from "react-icons/md";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Search({
  className,
  placeholder = "Search",
  type = "text",
  ...props
}: InputProps) {
  const setSearch = useSetAtom(searchAtom);
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const onSearch = (value: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearch(value.toLowerCase());
    }, 500);
  };

  return (
    <div className="bg-white rounded flex gap-x-1.5 px-2 py-1.5">
      <MdSearch size={24} />
      <input
        {...props}
        className={classNames(
          "w-full outline-none placeholder:text-gray-300 placeholder:text-sm text-sm",
          className
        )}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

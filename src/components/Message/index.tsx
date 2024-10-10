"use client";

import { messageContent } from "@/utils/atoms";
import { useAtom } from "jotai";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Message() {
  const [message, setMessage] = useAtom(messageContent);
  const initialRenderRef = React.useRef(true);
  React.useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    if (message.content) {
      switch (message.type) {
        case "success":
          toast.success(message.content, {
            position: "top-center",
            duration: 3000,
            className: "rounded-md",
          });
          break;
        case "error":
          toast.error(message.content, {
            position: "top-center",
            duration: 3000,
            className: "rounded-md",
          });
          break;
      }
      setMessage({
        type: "success",
        content: null,
      });
    }
  }, [message]);

  return <Toaster />;
}

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Message = {
  field?: string | null;
  message: string;
  success: boolean;
};

// @SEE Kirimase scaffolding
export function useFormStateResponse(state: any) {
  const [message, setMessage] = useState<Message>({
    message: "",
    success: false,
  });
  useEffect(() => {
    if (typeof state?.message === "string") {
      if (state.success) {
        setMessage({
          success: true,
          message: state.message,
        });
        toast.success(state?.message);
        return;
      } else {
        setMessage({
          success: false,
          message: state.message,
        });

        console.log("state.message", state.message);
        toast.error(state.message);
        return;
      }
    }

    if (typeof state?.message === "object") {
      console.log("state.message - not string", state.message);
      if (!state.success) {
        Object.keys(state.message).forEach((key) => {
          if (key !== "_errors") {
            setMessage({
              success: false,
              message: state.message[key] as string,
              field: key,
            });
            toast.error(state.message[key]);
          }
        });
      }
    }
  }, [state?.message, state?.success]);

  useEffect(() => {
    if (!message.message) return;
    setTimeout(() => {
      {
        setMessage({ message: "", success: false });
      }
    }, 10000);
  }, [message]);

  return message;
}

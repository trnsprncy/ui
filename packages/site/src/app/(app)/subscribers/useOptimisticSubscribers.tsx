
import { type Subscriber, type CompleteSubscriber } from "@/lib/db/schema/subscribers";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Subscriber>) => void;

export const useOptimisticSubscribers = (
  subscribers: CompleteSubscriber[],
  
) => {
  const [optimisticSubscribers, addOptimisticSubscriber] = useOptimistic(
    subscribers,
    (
      currentState: CompleteSubscriber[],
      action: OptimisticAction<Subscriber>,
    ): CompleteSubscriber[] => {
      const { data } = action;

      

      const optimisticSubscriber = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticSubscriber]
            : [...currentState, optimisticSubscriber];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticSubscriber } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticSubscriber, optimisticSubscribers };
};

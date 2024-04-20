"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/subscribers/useOptimisticSubscribers";
import { type Subscriber } from "@/lib/db/schema/subscribers";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import SubscriberForm from "@/components/subscribers/SubscriberForm";


export default function OptimisticSubscriber({ 
  subscriber,
   
}: { 
  subscriber: Subscriber; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Subscriber) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticSubscriber, setOptimisticSubscriber] = useOptimistic(subscriber);
  const updateSubscriber: TAddOptimistic = (input) =>
    setOptimisticSubscriber({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <SubscriberForm
          subscriber={optimisticSubscriber}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateSubscriber}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticSubscriber.email}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticSubscriber.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticSubscriber, null, 2)}
      </pre>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Subscriber, CompleteSubscriber } from "@/lib/db/schema/subscribers";
import Modal from "@/components/shared/Modal";

import { useOptimisticSubscribers } from "@/app/(app)/subscribers/useOptimisticSubscribers";
import { Button } from "@/components/ui/button";
import SubscriberForm from "./SubscriberForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (subscriber?: Subscriber) => void;

export default function SubscriberList({
  subscribers,
   
}: {
  subscribers: CompleteSubscriber[];
   
}) {
  const { optimisticSubscribers, addOptimisticSubscriber } = useOptimisticSubscribers(
    subscribers,
     
  );
  const [open, setOpen] = useState(false);
  const [activeSubscriber, setActiveSubscriber] = useState<Subscriber | null>(null);
  const openModal = (subscriber?: Subscriber) => {
    setOpen(true);
    subscriber ? setActiveSubscriber(subscriber) : setActiveSubscriber(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeSubscriber ? "Edit Subscriber" : "Create Subscriber"}
      >
        <SubscriberForm
          subscriber={activeSubscriber}
          addOptimistic={addOptimisticSubscriber}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticSubscribers.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticSubscribers.map((subscriber) => (
            <Subscriber
              subscriber={subscriber}
              key={subscriber.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Subscriber = ({
  subscriber,
  openModal,
}: {
  subscriber: CompleteSubscriber;
  openModal: TOpenModal;
}) => {
  const optimistic = subscriber.id === "optimistic";
  const deleting = subscriber.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("subscribers")
    ? pathname
    : pathname + "/subscribers/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{subscriber.email}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + subscriber.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No subscribers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new subscriber.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Subscribers </Button>
      </div>
    </div>
  );
};

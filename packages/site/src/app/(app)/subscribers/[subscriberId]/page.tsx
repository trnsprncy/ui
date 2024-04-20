import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getSubscriberById } from "@/lib/api/subscribers/queries";
import OptimisticSubscriber from "./OptimisticSubscriber";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function SubscriberPage({
  params,
}: {
  params: { subscriberId: string };
}) {

  return (
    <main className="overflow-auto">
      <Subscriber id={params.subscriberId} />
    </main>
  );
}

const Subscriber = async ({ id }: { id: string }) => {
  
  const { subscriber } = await getSubscriberById(id);
  

  if (!subscriber) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="subscribers" />
        <OptimisticSubscriber subscriber={subscriber}  />
      </div>
    </Suspense>
  );
};

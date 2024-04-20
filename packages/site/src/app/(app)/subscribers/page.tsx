import { Suspense } from "react";

import Loading from "@/app/loading";
import SubscriberList from "@/components/subscribers/SubscriberList";
import { getSubscribers } from "@/lib/api/subscribers/queries";


export const revalidate = 0;

export default async function SubscribersPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Subscribers</h1>
        </div>
        <Subscribers />
      </div>
    </main>
  );
}

const Subscribers = async () => {
  
  const { subscribers } = await getSubscribers();
  
  return (
    <Suspense fallback={<Loading />}>
      <SubscriberList subscribers={subscribers}  />
    </Suspense>
  );
};

import { checkAuth } from "@/lib/auth/utils";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return ( <main>{children}</main> )
}
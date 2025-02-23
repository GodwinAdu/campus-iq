
import React from 'react';
import { ServerSidebar } from "@/components/forums/server/server-sidebar";
import { findServerWithMembersByProfileId } from "@/lib/actions/server.actions";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/helpers/current-user';

type ServerProps = Promise<{ serverId: string, schoolId: string }>
const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ServerProps;
}) => {
  const { schoolId, serverId } = await params;
  const user = await currentUser();
  console.log(serverId, "params serverId")


  const server = await findServerWithMembersByProfileId(serverId, user?._id)


  if (!server) {
    return redirect(`/${schoolId}/forum`);
  }

  return (
    <div className="h-screen">
      <div
        className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  );
}

export default ServerIdLayout;
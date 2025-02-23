import { findServersWithChannelByProfileId } from "@/lib/actions/server.actions";
import { currentUser } from "@/lib/helpers/current-user";
import { redirect } from "next/navigation";



type ServerIdPageProps = Promise<{ schoolId: string, serverId: string }>

const ServerPage = async ({
  params
}: { 
  params: ServerIdPageProps,
}) => {
  const { schoolId, serverId } = await params;

  const profile = await currentUser();

  const server = await findServersWithChannelByProfileId(profile?._id)

  if (!server) redirect(`/${schoolId}}/forum`)


  const initialChannel = server[0]?.channels[0];


  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/${schoolId}/forum/servers/${serverId}/channels/${initialChannel?._id}`)
}


export default ServerPage

import { InitialModal } from "@/components/forums/modals/InitialModal";
import { findServersByProfileId } from "@/lib/actions/server.actions";
import { currentUser } from "@/lib/helpers/current-user";
import { redirect } from "next/navigation"

type Props = Promise<{ schoolId: string }>

const SetupPage = async ({ params }: { params: Props }) => {

  const { schoolId } = await params;

  const user = await currentUser();


  const server = await findServersByProfileId(user._id)

  if (server) {
    return redirect(`/forum/servers/${server?._id}`)
  }

  return <InitialModal />
}

export default SetupPage

import { InitialModal } from "@/components/group-discussion/modals/InitialModal";
import { findServersByProfileId } from "@/lib/actions/server.actions";
import { current_user } from "@/lib/helpers/current-user";
import { redirect } from "next/navigation"


const SetupPage = async () => {

  const user = await current_user();


  const server = await findServersByProfileId(user._id)

  if(server){
    return redirect(`/group_discussion/servers/${server?._id}`)
  }
  
  return <InitialModal />
}

export default SetupPage
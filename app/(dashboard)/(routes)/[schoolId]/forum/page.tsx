
import { InitialModal } from "@/components/forums/modals/InitialModal";
import { fetchSchoolById } from "@/lib/actions/school.actions";
import { findServersByProfileId } from "@/lib/actions/server.actions";
import { currentUser } from "@/lib/helpers/current-user";
import { redirect } from "next/navigation"

type Props = Promise<{ schoolId: string }>

const SetupPage = async ({ params }: { params: Props }) => {

  const { schoolId } = await params;

  const user = await currentUser();

  const school = await fetchSchoolById(schoolId);


  const server = await findServersByProfileId(user._id)

  if (server) {
    return redirect(`/forum/servers/${server?._id}`)
  }

  if (user.role === "student" || user.role === "parent") {
    // TODO : create a modal to show that they are not in any community yet
    return <p> you cant create a modal</p>;
  }

  return <InitialModal school={school} />
}

export default SetupPage
import { Separator } from "@/components/ui/separator";
import { ModalTerm } from "./_components/UsetermModal";
import { getAllTerms } from "@/lib/actions/term.actions";
import { columns } from "./_components/column";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";
import { currentUserRole } from "@/lib/helpers/get-user-role";
import { DataTable } from "@/components/table/data-table";


const page = async () => {
  // Fetch the current user profile
  const user = await currentUser();

  // Redirect to the homepage if no user is found
  if (!user) redirect("/");

  // Fetch the current user's role
  const role = await currentUserRole();

  // Fetch all terms, defaulting to an empty array if none are found
  const data = (await getAllTerms()) || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Manage Terms"
          description="Manage, create, and edit school terms"
        />
        {/* Conditionally render the ModalTerm component based on the user's role */}
        {role?.permissions.addTerm && <ModalTerm />}
      </div>
      <Separator />
      {/* Render the TableData component to display terms */}
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default page;
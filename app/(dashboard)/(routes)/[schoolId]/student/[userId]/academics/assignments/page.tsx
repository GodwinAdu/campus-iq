import { fetchAllAssignmentForStudent } from "@/lib/actions/assignment.actions"
import StudentAssignmentsPage from "./_components/Assignment"
import { fetchAllSubmissionForStudent } from "@/lib/actions/assignment-submission.actions";


const page = async () => {
  const assignments = await fetchAllAssignmentForStudent() ?? [];
  const submissions = await fetchAllSubmissionForStudent() ?? [];
  return (
    <>
      <StudentAssignmentsPage assignments={assignments} submissions={submissions} />
    </>
  )
}

export default page

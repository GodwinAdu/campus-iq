import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";
import { currentUserRole } from "@/lib/helpers/get-user-role";
import { AlertCircle } from "lucide-react";
import { ScheduleModal } from "./_components/ScheduleModal";
import ScheduleCard from "./_components/ScheduleCard";
import { fetchAllSchedule } from "@/lib/actions/meal-schedule.actions";
import { fetchAllPlans } from "@/lib/actions/meal-plan.actions";



const page = async () => {
    // Fetch the current user profile
    const user = await currentUser();

    // Redirect to the homepage if no user is found
    if (!user) redirect("/");

    // Fetch the current user's role
    const role = await currentUserRole();

    const data =  await fetchAllPlans();
    // Fetch all terms, defaulting to an empty array if none are found
    const meals = await fetchAllSchedule() ?? [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Meal Schedule"
                    description="Manage, create, and edit school terms"
                />
                {/* Conditionally render the ModalTerm component based on the user's role */}
                {role?.permissions.addCanteen && <ScheduleModal mealPlans={data} />}
            </div>
            <Separator />
            <div className="py-4">
                {meals.length === 0 ? (
                    <div className="flex flex-col items-center py-10 mt-16">
                        <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
                        <p className="text-lg text-gray-600 mb-2">No Meal Schedule found.</p>
                        <p className="text-md text-gray-500">Please add new schedule to manage them here.</p>
                    </div>
                ) : (
                    <ScheduleCard meals={meals} />
                )}
            </div>
        </>
    );
};

export default page;
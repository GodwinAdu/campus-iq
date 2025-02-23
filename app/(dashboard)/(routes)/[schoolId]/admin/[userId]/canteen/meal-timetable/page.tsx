import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { fetchAllSchedule } from '@/lib/actions/meal-schedule.actions'
import { currentUser } from '@/lib/helpers/current-user'
import { currentUserRole } from '@/lib/helpers/get-user-role'
import React from 'react'
import { MealTimetableModal } from './_components/MealTimetableModal'
import { redirect } from 'next/navigation'
import { fetchAllMealTimetable } from '@/lib/actions/meal-timetable.actions'
import MealTimetable from './_components/MealTimetable'

const page = async () => {
    // Fetch the current user profile
    const user = await currentUser();

    // Redirect to the homepage if no user is found
    if (!user) redirect("/");

    // Fetch the current user's role
    const role = await currentUserRole();
    // Fetch all terms, defaulting to an empty array if none are found
    const meals = await fetchAllSchedule() ?? [];
    const data = await fetchAllMealTimetable() ?? [];
    console.log(data, "timetable");
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Meal Timetable"
                // description="Manage, create, and edit school terms"
                />
                {/* Conditionally render the ModalTerm component based on the user's role */}
                {role?.permissions.addCanteen && <MealTimetableModal mealSchedules={meals} />}
            </div>
            <Separator />
            <div className="py-4">
                <MealTimetable timetables={data} />
            </div>
        </>
    )
}

export default page
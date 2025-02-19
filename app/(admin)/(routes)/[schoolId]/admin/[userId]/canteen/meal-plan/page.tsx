import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import Heading from "@/components/commons/Header";
import { currentUser } from "@/lib/helpers/current-user";
import { currentUserRole } from "@/lib/helpers/get-user-role";
import { PlanModal } from "./_components/PlanModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { fetchAllPlans } from "@/lib/actions/meal-plan.actions";

interface MealPlan {
    _id: string;
    name: string;
    description: string;
    price: number;
}

const colors = [
    "bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100", 
    "bg-purple-100", "bg-pink-100", "bg-orange-100", "bg-teal-100"
];


const page = async () => {
    // Fetch the current user profile
    const user = await currentUser();

    // Redirect to the homepage if no user is found
    if (!user) redirect("/");

    // Fetch the current user's role
    const role = await currentUserRole();

    // Fetch all terms, defaulting to an empty array if none are found
    const data = await fetchAllPlans() ?? [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Meal Plans"
                    description="Manage, create, and edit school terms"
                />
                {/* Conditionally render the ModalTerm component based on the user's role */}
                {role?.permissions.addCanteen && <PlanModal />}
            </div>
            <Separator />
            <div className="py-4">
                {data.length === 0 ? (
                    <div className="flex flex-col items-center py-10 mt-16">
                        <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
                        <p className="text-lg text-gray-600 mb-2">No Meal Plan found.</p>
                        <p className="text-md text-gray-500">Please add new meal plan to manage them here.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data?.map((plan: MealPlan,index:number) => (
                            <Card key={plan._id} className={`shadow-lg ${colors[index % colors.length]}`}>
                                <CardHeader>
                                    <CardTitle>{plan.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{plan.description}</p>
                                    <p className="font-bold mt-2">Price: GHS{plan.price.toFixed(2)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default page;
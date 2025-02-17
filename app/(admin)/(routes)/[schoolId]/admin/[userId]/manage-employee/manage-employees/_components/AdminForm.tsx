"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import PersonalInfoStep from "./personal-info";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import AcademicInfoStep from "./academic-info";
import AccountInfoStep from "./account-info";

interface RolenameProps {
    _id: string;
    displayName: string;
}
interface AdminFormProps {
    _id?: string;
    fullName: string;
    email: string;
    dob: Date;
    gender: string;
    phone: string;
    religion: string;
    permanentAddress: string;
    presentAddress: string;
    role: string;
    joinedDate: Date;
    department: string;
    qualification: string;
    experience: string;
    totalExperience: string;
    idCardType: string;
    idCard: string;
    accountType: string;
    accountName: string;
    accountNumber: string;
}

type Props = {
    rolename: RolenameProps[];
    departments: IDepartment[];
    type: "create" | "update";
    classes: {_id:string,name:string}[];
    initialData?: AdminFormProps
}

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits.",
    }),
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
    gender: z.string(),
    religion: z.string(),
    addresses: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string(),
    }),
    emergencyContact: z.object({
        name: z.string(),
        phone: z.string(),
        relationship: z.string(),
    }).optional(),
    role: z.string(),
    currentAddress: z.string(),
    permanentAddress: z.string().optional(),
    joinedDate: z.coerce.date(),
    departmentId: z.string(),
    classIds: z.array(z.string()),
    qualification: z.string(),
    experience: z.string(),
    totalExperience: z.string(),
    idCardType: z.string(),
    idCard: z.string(),
    accountType: z.string(),
    accountName: z.string(),
    accountNumber: z.string(),

});


const AdminForm = ({ rolename, departments, type, initialData, classes }: Props) => {
    const [activeStep, setActiveStep] = useState(0)
    const router = useRouter()
    const params = useParams()
    const path = usePathname()
    const { schoolId, userId } = params;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            fullName: "",
            email: "",
            phone: "",
            dob: new Date(),
            gender: "",
            addresses: {
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
            },
            emergencyContact: {
                name: "",
                phone: "",
                relationship: "",
            },
            role: "",
            currentAddress: "",
            permanentAddress: "",
            joinedDate: new Date(),
            departmentId: "",
            classIds: [],
            qualification: "",
            experience: "",
            totalExperience: "",
            idCardType: "",
            idCard: "",
            accountType: "",
            accountName: "",
            accountNumber: "",
        },
    })

    const handleNext = async () => {
        const currentStepValid = validateStep(activeStep); // Validate current step

        if (!currentStepValid) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields before proceeding.",
                variant: "destructive",
            });
            return;
        }

        setActiveStep((prev) => prev + 1);
    };


    const handlePrev = () => {
        setActiveStep((prev) => prev - 1)
    }

    const validateStep = (step: number) => {
        switch (step) {
            case 0: // Personal Info
                return form
                    .getValues(["fullName", "email", "phone", "dob", "gender", "addresses.state", "addresses.city", "currentAddress"])
                    .every(Boolean);
            case 1: // Guardian Info
                return form
                    .getValues(["role", "joinedDate", "departmentId"]).every(Boolean);
            case 2: // Academic Info
                return form
                .getValues(["idCardType", "idCard", "accountType", "accountName", "accountNumber"])
            default:
                return false;
        }
    };
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Ensure medical history step is filled before submitting
        if (!validateStep(2)) {
            return;
        }

        try {
            if (type === "create") {
                // await createStudent(data, path);
            } else {
                // await updateStudent(params.studentId as string, data, path);
            }
            console.log(data, 'values')
            toast({
                title: `Student ${type === "create" ? "created" : "updated"} successfully`,
                description: `The student has been ${type === "create" ? "created" : "updated"} successfully.`,
            });
            router.push(`/${schoolId}/admin/${userId}/manage-students/manage-student`);
        } catch (error) {
            console.error("Error happened while creating or updating student", error);
            toast({
                title: `Error ${type === "create" ? "creating" : "updating"} student`,
                description: "Please try again later",
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex justify-between mb-8">
                    <Button type="button" onClick={handlePrev} disabled={activeStep === 0}>
                        Previous
                    </Button>
                    <div className="flex space-x-2">
                        {[0, 1, 2].map((step) => (
                            <div
                                key={step}
                                className={cn("w-3 h-3 rounded-full", activeStep === step ? "bg-primary" : "bg-gray-300")}
                            />
                        ))}
                    </div>
                    {activeStep === 2 ? (
                        <Button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent auto-submission
                                if (validateStep(3)) {
                                    form.handleSubmit(onSubmit)();
                                } else {
                                    toast({
                                        title: "Validation Error",
                                        description: "Please complete the Account Info section before submitting.",
                                        variant: "destructive",
                                    });
                                }
                            }}
                        >
                            {type === "create" ? "Create Student" : "Update Student"}
                        </Button>
                    ) : (
                        <Button type="button" onClick={handleNext}>
                            Next
                        </Button>
                    )}

                </div>

                {activeStep === 0 && <PersonalInfoStep />}
                {activeStep === 1 && (
                    <AcademicInfoStep type={type} classes={classes} role={rolename} departments={departments} />
                )}
                {activeStep === 2 && <AccountInfoStep />} 
            </form>
        </Form>
    );
};

export default AdminForm;

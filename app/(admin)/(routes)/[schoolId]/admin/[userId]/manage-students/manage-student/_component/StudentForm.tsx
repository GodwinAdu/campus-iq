"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useParams, usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { createStudent, updateStudent } from "@/lib/actions/student.actions"


import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"


import AcademicInfoStep from "./academic-info-step"
import PersonalInfoStep from "./personal-info-step"
import GuardianInfoStep from "./guardian-info-step"
import MedicalHistoryStep from "./medical-history-step"
const ImmunizationSchema = z.object({
    vaccineName: z.string(),
    dateAdministered: z.date(),
    administeredBy: z.string()
});

const MedicalHistorySchema = z.object({
    medicalConditions: z.array(z.string()).default([]),
    medications: z.array(z.string()).default([]),
    allergies: z.array(z.string()).default([]),
    immunizations: z.array(ImmunizationSchema).default([]),
    medicalNotes: z.string().optional()
});

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
    medicalHistory: MedicalHistorySchema,
    currentAddress: z.string(),
    permanentAddress: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    guardianEmail: z.string().email().optional(),
    guardianRelationship: z.string().optional(),
    guardianAddress: z.string().optional(),
    guardianOccupation: z.string().optional(),
    parentId: z.string().optional(),
    classId: z.string(),
    studentCategory: z.string(),
    enrollmentDate: z.date(),
})

interface StudentFormProps {
    type: "create" | "update"
    initialData?: z.infer<typeof formSchema>
    classes: IClass[]
    sessions: ISession[]
    parents: IParent[]
    studentCategories: IStudentCategory[]
}

const StudentForm = ({ type, initialData, classes, parents, studentCategories }: StudentFormProps) => {
    const [activeStep, setActiveStep] = useState(0)
    const [guardian, setGuardian] = useState(false)
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
            medicalHistory: {
                medicalConditions: [],
                medications: [],
                allergies: [],
                immunizations: [],
                medicalNotes: "",
            },
            currentAddress: "",
            permanentAddress: "",
            guardianName: "",
            guardianPhone: "",
            guardianEmail: "",
            guardianRelationship: "",
            guardianAddress: "",
            guardianOccupation: "",
            parentId: "",
            classId: "",
            studentCategory: "",
            enrollmentDate: new Date(),
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
                return guardian
                    ? !!form.getValues("parentId")
                    : form
                        .getValues(["guardianName", "guardianPhone", "guardianEmail", "guardianRelationship", "guardianAddress"])
                        .every(Boolean);
            case 2: // Academic Info
                return form.getValues(["studentCategory", "enrollmentDate"]).every(Boolean);
            case 3: // Medical History
                const { medicalConditions, medications, allergies, immunizations } = form.getValues("medicalHistory");
                return (
                    (medicalConditions.length > 0 || medications.length > 0 || allergies.length > 0 || immunizations.length > 0)
                ); // Ensure at least one medical detail is filled
            default:
                return false;
        }
    };
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Ensure medical history step is filled before submitting
        if (!validateStep(3)) {
            return;
        }

        try {
            if (type === "create") {
                await createStudent(data, path);
            } else {
                await updateStudent(params.studentId as string, data, path);
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
                        {[0, 1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className={cn("w-3 h-3 rounded-full", activeStep === step ? "bg-primary" : "bg-gray-300")}
                            />
                        ))}
                    </div>
                    {activeStep === 3 ? (
                        <Button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent auto-submission
                                if (validateStep(3)) {
                                    form.handleSubmit(onSubmit)();
                                } else {
                                    toast({
                                        title: "Validation Error",
                                        description: "Please complete the medical history section before submitting.",
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
                {activeStep === 1 && <GuardianInfoStep guardian={guardian} setGuardian={setGuardian} parents={parents} />}
                {activeStep === 2 && (
                    <AcademicInfoStep type={type} classes={classes} studentCategories={studentCategories} />
                )}
                {activeStep === 3 && <MedicalHistoryStep />}
            </form>
        </Form>
    )
}

export default StudentForm


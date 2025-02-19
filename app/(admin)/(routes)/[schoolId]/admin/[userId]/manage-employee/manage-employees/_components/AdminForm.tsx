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
import MedicalHistoryStep from "./medical-history-info";
import { createEmployee, updateEmployee } from "@/lib/actions/employee.actions";
import { Loader2 } from "lucide-react";

interface RolenameProps {
    _id: string;
    displayName: string;
}

type Props = {
    rolename: RolenameProps[];
    departments: IDepartment[];
    type: "create" | "update";
    classes: { _id: string, name: string }[];
    initialData?: IEmployee
}

const ImmunizationSchema = z.object({
    vaccineName: z.string().optional(),
    dateAdministered: z.date().optional(),
    administeredBy: z.string().optional(),
});

const MedicalHistorySchema = z.object({
    medicalConditions: z.array(z.string()).default([]),
    medications: z.array(z.string()).default([]),
    allergies: z.array(z.string()).default([]),
    immunizations: z.array(ImmunizationSchema).default([]),
    medicalNotes: z.string().optional()
});
const formSchema = z.object({
    personalInfo: z.object({
        username:z.string().optional(),
        password:z.string().optional(),
        fullName: z.string().min(3, "Full name must be at least 3 characters long"),
        imgUrl: z.string().optional(),
        dob: z.coerce.date().optional(),
        email: z.string().email("Invalid email format"),
        gender: z.enum(["Male", "Female", "Other"]).optional(),
        phone: z.string().optional(),
        religion: z.string().optional(),
        maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]).optional(),
        addresses: z
            .object({
                street: z.string().optional(),
                city: z.string().optional(),
                state: z.string().optional(),
                zipCode: z.string().optional(),
                country: z.string().optional(),
            })
            .optional(),
        emergencyContact: z.record(z.string(), z.any()).optional(),
        currentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
    }),

    role: z.string().min(3, "Role is required"),

    identification: z
        .object({
            idCardType: z.string().min(1, {
                message: "ID card type is required"
            }),
            idCard: z.string().min(1, {
                message: "ID card number is required"
            }),
            socialSecurityNumber: z.string().optional(),
            taxIdentificationNumber: z.string().optional(),
            workPermit: z.coerce.boolean().default(false),
            bankDetails: z
                .object({
                    accountName: z.string().min(3, "Account name is required"),
                    accountNumber: z.string().min(6, "Account number must be valid"),
                    bankName: z.string().min(3, "Bank name is required"),
                })
                .optional(),
        })
        .optional(),

    employment: z.object({
        employeeID: z.string().optional(),
        dateOfJoining: z.coerce.date(),
        jobTitle: z.string().min(3, "Job title is required"),
        departmentId: z.string().min(3, "Department id is required "),
        classIds: z
            .array(z.string())
            .default([]),
        workSchedule: z.enum(["Full-time", "Part-time"]),
    }),

    professionalDetails: z
        .object({
            highestDegree: z.object({
                degree: z.string(),
                institution: z.string(),
                year: z.coerce.number(),
            }),
            certifications: z.array(z.string()).optional(),
            specialization: z.array(z.string()).optional(),
            experienceYears: z.coerce.number(),
            previousEmployment: z
                .array(
                    z.object({
                        school: z.string().min(2, {
                            message: "School name must be at least 2 characters."
                        }),
                        position: z.string().min(2, {
                            message: "Position must be at least 2 characters."
                        }),
                        duration: z.string().min(2, {
                            message: "Duration must be at least 2 characters.",
                        })
                    })
                ),
            references: z
                .array(
                    z.object({
                        name: z.string().optional(),
                        contact: z.string().optional(),
                        relationship: z.string().optional(),
                    })
                )
                .optional(),
            backgroundCheck: z
                .object({
                    criminalRecord: z.boolean().default(false),
                    details: z.string().optional(),
                })
                .optional(),
        })
        .optional(),
    medicalHistory: MedicalHistorySchema,
});


const AdminForm = ({ rolename, departments, type, initialData, classes }: Props) => {
    const [activeStep, setActiveStep] = useState(0)
    const router = useRouter()
    const params = useParams()
    const path = usePathname()
    const { schoolId, userId } = params;
    const id = initialData?._id as string;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            personalInfo: {
                fullName: "",
                imgUrl: "",
                dob: new Date(),
                email: "",
                gender: "",
                phone: "",
                religion: "",
                maritalStatus: "",
                addresses: {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "",
                },
                emergencyContact: {},
                currentAddress: "",
                permanentAddress: "",
            },
            role: "",
            identification: {
                idCardType: "",
                idCard: "",
                socialSecurityNumber: "",
                taxIdentificationNumber: "",
                workPermit: false,
                bankDetails: {
                    accountName: "",
                    accountNumber: "",
                    bankName: "",
                },
            },
            employment: {
                dateOfJoining: new Date(),
                jobTitle: "",
                departmentId: "",
                classIds: [],
                workSchedule: "",
            },
            professionalDetails: {
                highestDegree: {
                    degree: "",
                    institution: "",
                    year: 0,
                },
                certifications: [],
                specialization: [],
                experienceYears: 0,
                previousEmployment: [],
                references: [],
                backgroundCheck: {
                    criminalRecord: false,
                    details: "",
                },
                additionalInfo: {
                    extracurricularActivities: [],
                    specialSkills: [],
                    notes: "",
                },
            },
            medicalHistory: {
                medicalConditions: [],
                medications: [],
                allergies: [],
                immunizations: [],
                medicalNotes: "",
            },

        }
    });

    const { isSubmitting,errors } = form.formState;

    console.log(errors,"see errors");

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
                    .getValues([
                        "personalInfo.fullName",
                        "personalInfo.email",
                        "personalInfo.phone",
                        "personalInfo.dob",
                        "personalInfo.gender",
                        "personalInfo.addresses.state",
                        "personalInfo.addresses.city",
                        "personalInfo.currentAddress",
                    ])
                    .every(Boolean);
            case 1: // Guardian Info
                return form
                    .getValues([
                        "role",
                        "employment.dateOfJoining",
                        "employment.departmentId",
                        "professionalDetails.experienceYears",
                        "professionalDetails.previousEmployment",
                    ]).every(Boolean);
            case 2: // Academic Info
                return form
                    .getValues([
                        "identification.idCardType",
                        "identification.idCard",
                        "identification.bankDetails.accountName",
                        "identification.bankDetails.accountNumber",
                        "identification.bankDetails.bankName",
                    ])
                    .every(Boolean);
            case 3: // Medical History Info
                const { medicalConditions, medications, allergies } = form.getValues("medicalHistory");
                return (
                    (medicalConditions.length > 0 || medications.length > 0 || allergies.length > 0)
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
                await createEmployee(data, path);
            } else {
                await updateEmployee(id, data, path);
            };
            router.push(`/${schoolId}/admin/${userId}/manage-employee/employee-list`);
            toast({
                title: `Student ${type === "create" ? "created" : "updated"} successfully`,
                description: `The student has been ${type === "create" ? "created" : "updated"} successfully.`,
            });
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
                            disabled={isSubmitting}
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
                            {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
                            {type === "create" ? "Create Student" : "Update Student"}
                        </Button>
                    ) : (
                        <Button type="button" onClick={handleNext}>
                            Next
                        </Button>
                    )}

                </div>

                {activeStep === 0 && <PersonalInfoStep />}
                {activeStep === 1 && <AcademicInfoStep type={type} classes={classes} role={rolename} departments={departments} />}
                {activeStep === 2 && <AccountInfoStep />}
                {activeStep === 3 && <MedicalHistoryStep />}
            </form>
        </Form>
    );
};

export default AdminForm;

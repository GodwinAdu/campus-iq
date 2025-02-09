"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
    CalendarIcon,
    Check,
    ChevronsUpDown,
    CogIcon,
    PlusCircle,
    User,
    UserIcon,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions/employee.actions";
import DatePicker from "react-datepicker";
import { Textarea } from "@/components/ui/textarea";

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
    type: "admin" | "updateAdmin";
    initialData?: AdminFormProps
}

const initialFormData: AdminFormProps = {
    fullName: "",
    email: "",
    dob: new Date(),
    gender: "",
    phone: "",
    religion: "",
    presentAddress: "",
    permanentAddress: "",
    role: "",
    joinedDate: new Date,
    department: "",
    qualification: "",
    experience: "",
    totalExperience: "",
    idCardType: "",
    idCard: "",
    accountType: "",
    accountName: "",
    accountNumber: "",
};


const AdminForm = ({ rolename, departments, type, initialData }: Props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const [formData, setFormData] = useState<AdminFormProps>(initialData ?? initialFormData);

    const params = useParams();
    const path = usePathname();
    const router = useRouter();

    const adminId = initialData?._id as string;


    const handleInputChange = (name: keyof AdminFormProps, value: any) => {

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitting = initialData ? "Updating ..." : "Creating...";
    const submit = initialData ? "Update Employee" : "Create Employee"

    const handleNext = () => {
        // Check if the current step is complete
        const isStepComplete = validateStep(activeStep);

        // If the step is complete, proceed to the next step
        if (isStepComplete) {
            setActiveStep((cur) => cur + 1);
        } else {
            // Handle incomplete step (e.g., show a message, highlight missing fields)
            toast({
                title: "Cannot continue to next session",
                description: "please make sure to complete the necessary fields",
                variant: "destructive",
            });
        }
    };

    const validateStep = (step: number) => {
        // Implement logic to check if all required fields for the given step are filled
        switch (step) {
            case 0:
                // Check if all fields for step 0 are filled
                return (
                    !!formData.fullName &&
                    !!formData.email &&
                    !!formData.phone &&
                    !!formData.gender &&
                    !!formData.dob &&
                    !!formData.religion &&
                    !!formData.permanentAddress &&
                    !!formData.presentAddress
                );
            case 1:
                // Check if all fields for step 1 are filled
                return (
                    !!formData.role &&
                    !!formData.joinedDate &&
                    !!formData.department &&
                    !!formData.qualification &&
                    !!formData.experience &&
                    !!formData.totalExperience
                );

            case 2:
                // Check if all fields for step 4 are filled
                return (

                    !!formData.idCardType &&
                    !!formData.idCard &&
                    !!formData.accountType &&
                    !!formData.accountName &&
                    !!formData.accountNumber
                );

            default:
                return false;
        }
    };

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const handleCreateAdmin = async () => {
        try {
            setIsLoading(true);

            if (type === "admin") {

                await createEmployee(formData, path);
            }


            if (type === "updateAdmin") {

                await updateAdmin(adminId, formData, path);
            }

            router.push(`/${params.schoolId}/admin/${params.userId}/manage-employee/manage-employees`);

            toast({
                title: `${initialData && initialData ? "Updated successfully" : "Created successfully"}`,
                description: `User was ${initialData && initialData ? "updated" : "created"} successfully`,
            });

        } catch (error) {
            console.error("Error occurred while creating or updating employee", error);
            toast({
                title: "Something went wrong",
                description: "Unable able to create. please try again later",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full px-4 py-4">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                placeholder=""
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            >
                <Step
                    onClick={() => setActiveStep(0)}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    >
                        <UserIcon className="h-5 w-5" />
                    </Step>
                <Step
                    onClick={() => setActiveStep(1)}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    >
                        <CalendarIcon className="h-5 w-5" />
                    </Step>
                <Step
                    onClick={() => setActiveStep(2)}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    <UserIcon className="h-5 w-5" />
                </Step>
                <Step
                    onClick={() => setActiveStep(1)}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    <CogIcon className="h-5 w-5" />
                </Step>
                <Step
                    onClick={() => setActiveStep(2)}
                    placeholder=""
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                >
                    <Check className="h-5 w-5" />
                </Step>
            </Stepper>
            {activeStep === 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3  gap-6 py-6">

                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="name">
                                Full Name
                            </Label>
                            <Input
                                type="text"
                                placeholder="Enter Full Name"
                                value={formData.fullName} // Add this line
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                            />
                        </div>

                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="email">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                placeholder="Enter Email"
                                value={formData.email} // Add this line
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                        </div>
                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="phone">
                                Phone Number
                            </Label>
                            <Input
                                type="phone"
                                placeholder="Enter Tel number"
                                value={formData.phone} // Add this line
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                        </div>
                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="gender">
                                gender
                            </Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(onValueChange) =>
                                    handleInputChange("gender", onValueChange)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not defined">Not defined</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="last name">
                                Date of Birth
                            </Label>
                            <DatePicker
                                className="p-2 w-full border"
                                selected={formData.dob}
                                onChange={(date) => handleInputChange("dob", date)}
                            />
                        </div>
                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="religion">
                                Religion
                            </Label>
                            <Input
                                type="religion"
                                placeholder="Enter Religion"
                                value={formData.religion} // Add this line
                                onChange={(e) => handleInputChange("religion", e.target.value)}
                            />
                        </div>
                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="religion">
                                Present Address
                            </Label>
                            <Input
                                type="religion"
                                placeholder="Enter Present Address"
                                value={formData.presentAddress} // Add this line
                                onChange={(e) => handleInputChange("presentAddress", e.target.value)}
                            />
                        </div>
                        <div className=" w-full flex flex-col gap-4">
                            <Label className="font-bold " htmlFor="religion">
                                Permanent Address
                            </Label>
                            <Input
                                type="religion"
                                placeholder="Enter Permanent Address"
                                value={formData.permanentAddress} // Add this line
                                onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                            />
                        </div>
                    </div>
                </>
            )}
            {activeStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3  gap-6 py-4">
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="gender">
                            Select Role
                        </Label>
                        <Select
                            value={formData.role}
                            onValueChange={(onValueChange) =>
                                handleInputChange("role", onValueChange)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {rolename?.map((role) => (
                                    <SelectItem key={role._id} value={role.displayName}>
                                        {role.displayName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="gender">
                            Select Department
                        </Label>
                        <Select
                            value={formData.department}
                            onValueChange={(onValueChange) =>
                                handleInputChange("department", onValueChange)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments?.map((department) => (
                                    <SelectItem key={department._id} value={department._id}>
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="religion">
                            Joining Date
                        </Label>
                        <DatePicker
                            className="p-2 w-full border"
                            selected={formData.joinedDate}
                            onChange={(date) => handleInputChange("joinedDate", date)}
                        />
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="religion">
                            Enter Qualifications
                        </Label>
                        <Textarea
                            placeholder="Enter Qualifications"
                            value={formData.qualification} // Add this line
                            onChange={(e) => handleInputChange("qualification", e.target.value)}
                        />
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="religion">
                            Enter Experience Detail
                        </Label>
                        <Textarea
                            placeholder="Enter Experience Detail"
                            value={formData.experience} // Add this line
                            onChange={(e) => handleInputChange("experience", e.target.value)}
                        />
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="religion">
                            Total Experiences
                        </Label>
                        <Input
                            placeholder="Enter Total Experience"
                            value={formData.totalExperience} // Add this line
                            onChange={(e) => handleInputChange("totalExperience", e.target.value)}
                        />
                    </div>


                </div>
            )}
            {activeStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3  gap-4 py-4">

                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="Account type">
                            Select ID Card Type
                        </Label>
                        <Select
                            value={formData.idCardType}
                            onValueChange={(onValueChange) =>
                                handleInputChange("idCardType", onValueChange)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose Account type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="passport">Passport</SelectItem>
                                <SelectItem value="voters id">Voters ID</SelectItem>
                                <SelectItem value="ghana card">Ghana Card</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="picture">
                            ID card Number
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter ID Number"
                            value={formData.idCard} // Add this line
                            onChange={(e) => handleInputChange("idCard", e.target.value)}
                        />
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="Account type">
                            Select Account Type
                        </Label>
                        <Select
                            value={formData.accountType}
                            onValueChange={(onValueChange) =>
                                handleInputChange("accountType", onValueChange)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose Account type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bank">Bank</SelectItem>
                                <SelectItem value="mobile Money">Mobile Money</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="picture">
                            Account Name
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter Account Name"
                            value={formData.accountName} // Add this line
                            onChange={(e) => handleInputChange("accountName", e.target.value)}
                        />
                    </div>
                    <div className=" w-full flex flex-col gap-4">
                        <Label className="font-bold " htmlFor="picture">
                            Account Number
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter Account Number"
                            value={formData.accountNumber} // Add this line
                            onChange={(e) =>
                                handleInputChange("accountNumber", e.target.value)
                            }
                        />
                    </div>

                </div>
            )}
            <div className="mt-16 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                    Prev
                </Button>

                {isLastStep ? (
                    <Button
                        disabled={isLoading || !validateStep(2)}
                        onClick={handleCreateAdmin}
                    >
                        {isLoading ? submitting : submit}
                    </Button>
                ) : (
                    <Button onClick={handleNext} disabled={isLastStep}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AdminForm;

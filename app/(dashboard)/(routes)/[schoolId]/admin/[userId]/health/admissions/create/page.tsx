import Heading from "@/components/commons/Header";
import { AdmissionForm } from "../_components/admission-form";
import { Separator } from "@/components/ui/separator";

export default function NewClinicAdmissionPage() {
    return (
        <div>
            <Heading title="New Clinic Admission" description="Create a new clinic admission record for a student or staff member" />
            <Separator />
            <div className="py-4">
                <AdmissionForm />
            </div>
        </div>
    )
}


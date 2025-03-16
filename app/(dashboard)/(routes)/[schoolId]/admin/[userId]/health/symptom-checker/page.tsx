import { Breadcrumbs } from "@/components/breadcrumbs";
import { SymptomCheckerForm } from "./_components/symptom-checker-form";
import { SymptomHistory } from "./_components/symptom-history";
import Heading from "@/components/commons/Header";

export default function SymptomCheckerPage() {
    return (
        <div>
            <Heading
                title="AI-Powered Symptom Checker"
                description=" Use our advanced AI to analyze symptoms and get preliminary health insights"
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <SymptomCheckerForm />
                </div>
                <div>
                    <SymptomHistory />
                </div>
            </div>
        </div>
    )
}


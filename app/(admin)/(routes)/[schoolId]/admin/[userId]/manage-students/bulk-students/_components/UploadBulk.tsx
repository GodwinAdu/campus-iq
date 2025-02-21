"use client";

import Papa from "papaparse";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { uploadBulkStudents } from "@/lib/actions/student.actions";
import { downloadCSV } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

const sampleHeaders = [
    "username",
    "fullName",
    "email",
    "dob",
    "gender",
    "phone",
    "password",
    "classId",
    "studentID",
];

const handleDownloadSample = () => {
    const sampleData = [sampleHeaders];
    downloadCSV(sampleData, "sample_students.csv");
};

const BulkStudentUpload = ({ classes }: { classes: IClass[] }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);

    const params = useParams();
    const router = useRouter();
    const { schoolId, userId } = params;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setProgress(10); // Start progress

        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            if (target && typeof target.result === "string") {
                const csv = Papa.parse(target.result, { header: true });
                const students = (csv.data as { fullName: string; email: string }[]).filter(
                    (row) => row.fullName && row.email
                );

                if (!students || students.length === 0) {
                    toast({
                        variant: "destructive",
                        title: "No students found in the CSV",
                        description: 'Please make sure the CSV file contains a "fullName" and "email" column.',
                    });
                    setUploading(false);
                    return;
                }

                if (!selectedClass) {
                    toast({
                        variant: "destructive",
                        title: "No class selected",
                        description: "Please select a class to upload students.",
                    });
                    setUploading(false);
                    return;
                }

                try {
                    // Simulate progress update
                    setProgress(30);
                    await uploadBulkStudents(selectedClass, students);
                    setProgress(100);

                    toast({
                        title: "Students uploaded successfully",
                        description: "Students were successfully uploaded to the selected class.",
                    });
                    setFile(null);
                    setTimeout(() => setProgress(0), 1000); // Reset progress after completion
                    router.push(`/${schoolId}/admin/${userId}/manage-students/manage-student`);
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Upload failed",
                        description: error instanceof Error ? error.message : "Error uploading students",
                    });
                }

                setUploading(false);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error reading file",
                    description: "Please try again with a valid CSV file.",
                });
                setUploading(false);
            }
        };

        reader.readAsText(file);
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
            <div className="space-y-6 pb-4">
                <Button
                    onClick={handleDownloadSample}
                    className="mb-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition duration-300"
                >
                    <UploadCloud size={20} /> Download Sample CSV
                </Button>

                <Select defaultValue={selectedClass} onValueChange={(value) => setSelectedClass(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {classes.map((cls) => (
                                <SelectItem key={cls._id} value={cls._id ?? ""}>
                                    {cls.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition duration-300">
                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                <p className="text-gray-500">Click to upload or drag and drop</p>
                {file && <p className="text-gray-700 font-semibold mt-2">{file.name}</p>}
            </label>

            {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                        className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            <Button
                onClick={handleUpload}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition duration-300"
                disabled={!file || uploading}
            >
                {uploading ? `Uploading... ${Math.round(progress)}%` : "Upload"}
            </Button>
        </div>
    );
};

export default BulkStudentUpload;

"use client"

import { useRef, useState } from "react";

import { toPng } from 'html-to-image';

interface Grade {
  subject: string;
  score: string;
}

interface Student {
  name: string;
  gradeLevel: string;
  term: string;
  grades: Grade[];
  comments: string;
  imageUrl: string;
}

interface ReportCardProps {
  student: Student;
}

interface ImageUploadProps {
    onImageUpload: (imageUrl: string) => void;
  }
  
  const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          setImagePreview(imageUrl);
          onImageUpload(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="flex flex-col items-center">
        <label className="mb-2 text-gray-700 font-medium">Upload Picture</label>
        <input
        aria-label="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
       
      </div>
    );
  };
  

const ReportCard: React.FC<ReportCardProps> = ({ student }) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white shadow-lg rounded-lg relative border-collapse border-4 border-e-deep-orange-800 border-opacity-100 border-s-amber-900">
      {student.imageUrl && (
        <img
          src={student.imageUrl}
          alt="Student"
          className="absolute top-16 right-16  w-24 h-24 object-cover rounded-full shadow-lg"
        />
      )}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Term Report</h1>
        <p className="text-gray-600">{student.term}</p>
      </div>
     
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">{student.name}</h2>
        <p className="text-gray-600">Grade Level: {student.gradeLevel}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700">Grades</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600">Subject</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600">Score</th>
            </tr>
          </thead>
          <tbody>
            {student.grades.map((grade, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-t border-gray-200 text-gray-700">{grade.subject}</td>
                <td className="py-2 px-4 border-t border-gray-200 text-gray-700">{grade.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Comments</h3>
        <p className="text-gray-700">{student.comments}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
    const [studentData, setStudentData] = useState({
      name: 'John Doe',
      gradeLevel: '10th Grade',
      term: 'Spring 2024',
      grades: [
        { subject: 'Mathematics', score: 'A' },
        { subject: 'Science', score: 'B+' },
        { subject: 'History', score: 'A-' },
        { subject: 'English', score: 'B' },
      ],
      comments: 'John has shown great improvement in all subjects, particularly in Mathematics.',
      imageUrl: '',
    });
  
    const reportCardRef = useRef<HTMLDivElement>(null);
  
    const handleImageUpload = (imageUrl: string) => {
      setStudentData((prevData) => ({ ...prevData, imageUrl }));
    };
  
    const handleDownload = async () => {
      if (reportCardRef.current === null) {
        return;
      }
      const dataUrl = await toPng(reportCardRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'report-card.png';
      link.click();
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <ImageUpload onImageUpload={handleImageUpload} />
        <div ref={reportCardRef}>
          <ReportCard student={studentData} />
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Download Report Card
        </button>
      </div>
    );
  };
  
  export default App;
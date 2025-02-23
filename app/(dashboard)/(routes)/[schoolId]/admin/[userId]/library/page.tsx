// components/IDCard.tsx
"use client";
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { SketchPicker } from 'react-color';
import Image from 'next/image';

interface User {
    id: string;
    fullName: string;
    role: string;
    grade?: string;
    photo: string;
}

const IDCard: React.FC<{ user: User }> = ({ user }) => {
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const [colorRight, setColorRight] = useState<string>('#3b82f6');
    const [colorLeft, setColorLeft] = useState<string>('#008');
    const [uploadedPhoto, setUploadedPhoto] = useState<string>(user.photo);

    const [backColor, setBackColor] = useState<string>('#3b82f6'); // State for back side color

    const handleDownload = async () => {
        if (frontRef.current && backRef.current) {
            const [frontCanvas, backCanvas] = await Promise.all([
                html2canvas(frontRef.current),
                html2canvas(backRef.current)
            ]);

            const mergedCanvas = document.createElement('canvas');
            mergedCanvas.width = frontCanvas.width;
            mergedCanvas.height = frontCanvas.height * 2; // Double the height for both sides
            const context = mergedCanvas.getContext('2d');

            if (context) {
                context.drawImage(frontCanvas, 0, 0);
                context.drawImage(backCanvas, 0, frontCanvas.height);
            }

            const data = mergedCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = data;
            link.download = `${user.id}_IDCard.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedPhoto(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    return (
        <div className="flex items-center gap-6">

            <SketchPicker color={colorLeft} onChangeComplete={(color) => setColorLeft(color.hex)} />
            <div className="flex flex-col justify-center items-center">
                <input aria-label='profile' type="file" accept="image/*" onChange={handlePhotoUpload} className="mb-4" />
                <div
                    ref={frontRef}
                    className="relative w-[450px] h-[250px] border rounded-lg shadow-2xl overflow-hidden bg-white"
                >
                    <svg width="100%" height="100%" className="absolute top-0 left-0">
                        <rect width="100%" height="100%" fill={colorRight} />
                        <rect width="30%" height="100%" fill={colorLeft} />
                        <circle cx="35%" cy="50%" r="70" fill="rgba(0, 0, 0, 0.6)" /> {/* Transparent circle */}
                    </svg>
                    <div className="absolute inset-0 flex">
                        <div className="flex flex-col items-center justify-center w-1/3 p-4 text-white shadow-2xl">
                            <Image width={100} height={100} objectFit='fit' src={uploadedPhoto} alt="User Photo" className="w-20 h-20 rounded-full object-cover " />
                            <h3 className="text-lg font-bold">{user.fullName}</h3>
                            <p className="text-sm">{user.role}</p>
                        </div>
                        <div className="flex flex-col justify-center w-2/3 p-4 text-blue-900">
                            <div className="flex items-center mb-2">
                                <Image width={100} height={100} src={uploadedPhoto} alt="School Logo" className="w-10 h-10 mr-2" />
                                <h2 className="text-lg font-bold text-white">School Name</h2>
                            </div>
                            <p className="text-sm text-white">ID: {user.id}</p>
                            <p className="text-sm text-white">Grade: {user.grade || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center opacity-10 text-white">
                        <h1 className="text-6xl -rotate-12 font-bold italic">School Name</h1>
                    </div>
                </div>
                <div ref={backRef} className="flex flex-col items-center gap-6">

                    <div className="relative w-[450px] h-[250px] border rounded-lg shadow-2xl overflow-hidden bg-white">
                        <svg width="100%" height="100%" className="absolute top-0 left-0">
                            <rect width="100%" height="100%" fill={colorRight} />
                        </svg>
                        <div className="absolute inset-0 flex justify-center items-center opacity-10 text-white">
                            <h1 className="text-6xl font-bold">Back Side</h1>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Download ID Card
                </button>
            </div>
            <SketchPicker color={colorRight} onChangeComplete={(color) => setColorRight(color.hex)} />


        </div>
    );
};

const user = {
    id: 'S12345',
    fullName: 'John Doe',
    role: 'Student',
    grade: '10th Grade',
    photo: '/path-to-photo.jpg', // Replace with actual path or URL
};

const IDCardPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-2xl font-bold mb-4">ID Card</h1>
            <IDCard user={user} />
        </div>
    );
};

export default IDCardPage;
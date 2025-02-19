"use client"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-6">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg flex flex-col items-center">
                <AlertTriangle className="w-16 h-16 text-red-500" />
                <h1 className="text-4xl font-bold mt-4">Access Denied</h1>
                <p className="text-gray-400 mt-2">You do not have permission to view this page.</p>
                <Button
                    className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg"
                    onClick={() => router.push('/')}
                >
                    Go to Homepage
                </Button>
            </div>
        </div>
    );
}

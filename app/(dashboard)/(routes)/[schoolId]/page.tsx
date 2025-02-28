'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchRole } from "@/lib/actions/role.actions";
import { currentUser } from "@/lib/helpers/current-user";
import { fetchSchoolById } from '@/lib/actions/school.actions';
import { DashboardLoader } from '@/components/admin/dashboard-loader';
import { ErrorBoundary } from '@/components/admin/error-boundary';

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const router = useRouter();
    const params = useParams();

    const schoolId = params.schoolId as string;

    useEffect(() => {
        const loadData = async () => {
            try {
                const currentUserData = await currentUser();
                const school = await fetchSchoolById(schoolId);

                if (!currentUserData || !school) {
                    console.warn("No user found, redirecting to home.");
                    router.push('/');
                    return;
                };

                if (school.banned) {
                    //   router.push(`/banned-store/${storeId}`)
                    return
                }

                const userRoleData = await fetchRole(currentUserData.role);

                if (!userRoleData) {
                    throw new Error("User role not found");
                };

                if (currentUserData.role === "student") {
                    window.location.assign(`/${schoolId}/student/${currentUserData._id}`);
                } else if (currentUserData.role === "parent") {
                    window.location.assign(`/${schoolId}/parent/${currentUserData._id}`);
                } else {
                    window.location.assign(`/${schoolId}/admin/${currentUserData._id}`);
                }

            } catch (err) {
                console.error("Error loading data:", err);
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [params.schoolId, , router]);

    if (isLoading) {
        return <DashboardLoader />;
    }

    if (error) {
        throw error; // This will be caught by the ErrorBoundary
    }


    // This return statement should never be reached due to the redirects,
    // but we'll keep it as a fallback for TypeScript
    return null;
};

const Page = () => (
    <ErrorBoundary>
        <DashboardPage />
    </ErrorBoundary>
);

export default Page;


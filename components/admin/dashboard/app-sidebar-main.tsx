import React from 'react'
import { AppSidebar } from './app-sidebar'
import { currentUserRole } from '@/lib/helpers/get-user-role';
import { currentSchool } from '@/lib/actions/school.actions';
import { currentUser } from '@/lib/helpers/current-user';

const AppSidebarMain = async () => {
    const user = await currentUser()
    const school = await currentSchool()

    const userRole = await currentUserRole();

    return (
        <>
            <AppSidebar userRole={userRole as IRole} school={school} user={user} />
        </>
    )
}

export default AppSidebarMain

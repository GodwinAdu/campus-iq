import React from 'react'
import { AppSidebar } from './app-sidebar'
import { currentSchool } from '@/lib/actions/school.actions';
import { currentUser } from '@/lib/helpers/current-user';

const AppSidebarMain = async () => {
    const user = await currentUser()
    const school = await currentSchool()

    return (
        <>
            <AppSidebar  school={school} user={user} />
        </>
    )
}

export default AppSidebarMain

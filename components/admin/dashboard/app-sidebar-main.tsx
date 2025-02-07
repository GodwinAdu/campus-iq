import React from 'react'
import { AppSidebar } from './app-sidebar'
import { currentUserRole } from '@/lib/helpers/get-user-role';

const AppSidebarMain = async () => {
    const store = {
        name:"Melcom"
    };

    const userRole = await currentUserRole();

    return (
        <>
            <AppSidebar userRole={userRole as IRole} store={store} />
        </>
    )
}

export default AppSidebarMain

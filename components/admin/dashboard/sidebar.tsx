
import { NavMain } from './nav-main'



const SideContent = ({ role }: { role: IRole }) => {

    return (
        <>
            <NavMain role={role} />
        </>
    )
}

export default SideContent

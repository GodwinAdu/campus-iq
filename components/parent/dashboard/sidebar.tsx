
import { NavMain } from './nav-main'



const SideContent = ({ role, school }: { role:any,school:ISchool }) => {

    return (
        <>
            <NavMain school={school} role={role} />
        </>
    )
}

export default SideContent

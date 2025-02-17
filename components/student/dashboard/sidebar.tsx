
import { NavMain } from './nav-main'



const SideContent = ({ school }: {school:ISchool }) => {

    return (
        <>
            <NavMain school={school} />
        </>
    )
}

export default SideContent

import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import CreateIssueForm from '../_components/CreateIssueForm';
import { fetchAllBooks } from '@/lib/actions/book.actions';
import { getAllClass } from '@/lib/actions/class.actions';

const page = async () => {
    
    const classes = (await getAllClass()) || [];
    const books = (await fetchAllBooks()) || [];


    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Issue Books" description="All Users excluding teachers and student will be manage here." />

            </div>
            <Separator />
            <div className=" px-4 py-4">
                <CreateIssueForm classes={classes} books={books} type='createBookIssue' />
            </div>


        </>
    )
}

export default page

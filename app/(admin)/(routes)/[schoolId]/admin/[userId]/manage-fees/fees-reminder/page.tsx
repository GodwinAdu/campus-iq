import Heading from '@/components/commons/Header';
import { Separator } from '@/components/ui/separator';
import { getAllClass } from '@/lib/actions/class.actions';
import FeesReminderGrid from './_components/FeesReminderGrid';

const page = async () => {
    const classes = (await getAllClass()) || [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Fees Reminder"
                    description="Tips, and information's for the usage of the application."
                />

            </div>
            <Separator />

            <div className="py-4 md:px-6 px-2   mx-auto">
                <FeesReminderGrid classes={classes} />
            </div>

        </>
    );
}

export default page;

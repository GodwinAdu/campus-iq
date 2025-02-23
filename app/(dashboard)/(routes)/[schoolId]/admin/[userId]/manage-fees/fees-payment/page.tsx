import Heading from '@/components/commons/Header';
import { Separator } from '@/components/ui/separator';
import FeesPaymentGrid from './_components/FeesPaymentGrid';
import { getAllClass } from '@/lib/actions/class.actions';

const page = async () => {
    const classes = (await getAllClass()) || [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Fees Payment"
                    description="Tips, and information's for the usage of the application."
                />

            </div>
            <Separator />

            <div className="py-4 md:px-6 px-2   mx-auto">
                <FeesPaymentGrid classes={classes} />
            </div>

        </>
    );
}

export default page;

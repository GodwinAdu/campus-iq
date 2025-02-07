import Heading from '@/components/commons/Header';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fetchFeeStructures } from '@/lib/actions/fee-structure.actions';
import { cn } from '@/lib/utils';
import { PlusCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import FeesCard from './_components/FeeStructureCard';

const page = async () => {
  const fees = (await fetchFeeStructures()) || [];
  console.log(fees);
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Manage Fees"
          description="Tips, and information's for the usage of the application."
        />
        <Link href={`fees-structures/create`} className={cn(buttonVariants({ size: "sm" }))}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Fees
        </Link>
      </div>
      <Separator />
      {fees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {fees.map((fee: any) => (
            <FeesCard key={fee._id} id={fee._id} classId={fee.classId} fees={fee.fees} createdAt={fee.createdAt} term={fee.termId} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 mt-16">
          <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
          <p className="text-lg text-gray-600 mb-2">No fees structures found.</p>
          <p className="text-md text-gray-500">Please add new fees structures to manage them here.</p>
        </div>
      )}
    </>
  );
}

export default page;

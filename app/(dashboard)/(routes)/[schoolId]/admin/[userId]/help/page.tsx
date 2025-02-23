
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Heading from "@/components/commons/Header";
import HelpComponent from "./_components/HelpComponent";
import { HelpData } from "./_components/help-data";
import UserButton from "@/components/commons/UserButton";
import { FeesGeneratorForm } from "../manage-fees/fees-structures/_components/FeesGeneratorForm";


const page = async () => {
  const userData = {
    name: "John Doe",
    imageUrl: "https://via.placeholder.com/150"
  };

  return (

    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Guidelines"
          description="Tips,and information's for the usage of the application."
        />

      </div>
      <Separator />
      <div className="py-4">
        {HelpData.map((data, index) => (
          <HelpComponent key={index} title={data.title} description={data.description} />
        ))}
      </div>

    </>
  );
};

export default page;

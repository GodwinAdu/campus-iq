"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { updateHouse } from "@/lib/actions/house.actions";
import MultiSelect from "@/components/commons/MultiSelect";



const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  roomIds: z.array(z.string()),
});

export function EditHouse({ initialData, rooms }: { initialData: IHouse, rooms: IRoom[] }) {

  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  const { schoolId, userId } = params;
  const houseId = initialData?._id as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateHouse(houseId, values, path);

      router.push(`/${schoolId}/admin/${userId}/hostel/manage-hostel`);

      form.reset();

      toast({
        title: "Update Successfully",
        description: "Update house  successfully...",
      });
    } catch (error) {

      console.log("error happened while updating day", error);

      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto max-w-xl w-[96%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter House Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomIds"
            defaultValue={[]} // Initialize as an empty array
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Rooms</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Mark Distributions"
                    data={rooms}
                    value={field.value || []} // Ensure value is an array
                    onChange={(room) =>
                      field.onChange([...field.value, room])
                    }
                    onRemove={(idToRemove) =>
                      field.onChange(field.value.filter(
                        (roomId) => roomId !== idToRemove
                      ))
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

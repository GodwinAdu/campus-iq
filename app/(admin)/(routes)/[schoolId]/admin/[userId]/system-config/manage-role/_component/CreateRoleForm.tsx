"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createRole, updateRole } from "@/lib/actions/role.actions";
import { CreateRoleSchema } from "@/lib/validators/role.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateRoleForm = ({ type, initialData }: { type: "create" | "update", initialData?: IRole }) => {
  const path = usePathname();
  const router = useRouter();
  const params = useParams();

  const schoolId = params.schoolId as string;
  const adminId = params.adminId as string;
  const roleId = params.manageRoleId as string





  const defaultValues: Record<string, string | boolean> = Object.fromEntries(
    Object.keys(CreateRoleSchema.shape).map((key) => {
      // Check if the key should have a default value of ""
      if (key === 'name' || key === 'displayName' || key === 'description') {
        return [key, ''];
      }
      // Otherwise, default value is false
      return [key, false];
    })
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateRoleSchema>>({
    resolver: zodResolver(CreateRoleSchema),
    defaultValues: initialData || defaultValues,
  });

  // get functions to build form with useForm() hook

  const { isSubmitting } = form.formState;

  const submit = initialData ? "Update" : "Create";
  const submitting = initialData ? "Updating..." : "Creating...";

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateRoleSchema>) {
    try {
      console.log(values)
      if (type === "create") {
        await createRole(values, path);
      }
      if (type === "update") {
        await updateRole(
          roleId,
          values,
          path,
        );

      }
      form.reset();

      toast({
        title: `Role ${type === "create" ? "Created" : "Updated"} successfully`,
        description: `A role was  ${type === "create" ? "created" : "updated"}  successfully...`,
      });
      router.push(`/admin/${adminId}/system-config/manage-role`);
    } catch (error) {
      console.log("something went wrong", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="w-full h-full">
              <CardContent>
                <div className="flex justify-between items-center gap-4 py-2">
                  <div className="">
                    <div className="font-bold text-md">NEW ROLE</div>
                  </div>
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? submitting : submit}
                  </Button>
                </div>
                <div className="px-2 md:px-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Role Name ..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Display Name ..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Write a short description ..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="py-5">
                    <h1 className="font-semibold text-lg capitalize">
                      Add Permission
                    </h1>
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    GLOBAL ACCESS
                  </h1>
                  <div className="flex gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="manageSchool"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Manage School</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageAccess"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Manage Access</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs  bg-black/80 p-0.5">
                    MANAGEMENT ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="schoolInfo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View School info</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="systemConfig"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View System config</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="classManagement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Class Management</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="studentManagement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Students</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employeeManagement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Employees</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="homeWork"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Homework</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageTimeTable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Time Table</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="onlineLearning"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Online Learning</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="examsManagement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Exams Management</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="account"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Manage Account</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inventory"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Manage Inventory</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hostelManagement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Manage Hostel</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="library"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Library management</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="depositAndExpense"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Deposit & Expense</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="smsAndEmail"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Sms & Email</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="report"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Reports</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs  bg-black/80 p-0.5">
                    DASHBOARD ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="dashboard"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Dashboard</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewChart"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View chart on dashboard</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewMemberTab"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View members tab on dashboard</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewEnquiries"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              View enquiries tab on dashboard
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewExpenses"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              View expenses tab on dashboard
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>



                  {/* // System config */}
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    ROLES ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addRole"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add roles</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewRole"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Role details</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editRole"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Edit role details</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteRole"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Delete roles</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageRole"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Manage roles</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    TERM ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addTerm"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Add Term</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editTerm"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Term details</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteTerm"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Term details</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageTerm"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Term</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    SESSION ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addSession"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Add Session</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editSession"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Session</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteSession"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Session</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageSession"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Session</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    TIME ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Time</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Time</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Time</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Time</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* CLASS MANAGEMENT */}

                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    ClASS ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addClass"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Class</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editClass"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Class details</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteClass"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Class</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageClass"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Class</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    SUBJECT ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addSubject"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Subject</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editSubject"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Subject</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteSubject"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Able Delete Subject</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageSubject"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Subject</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    CLASS ALLOCATIONS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addClassAllocation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Creating Class Allocation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editClassAllocation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Class Allocation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteClassAllocation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Class Allocation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageClassAllocation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Class Allocation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    GRADING SYSTEM ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addGradingSystem"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Creating Grading System</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editGradingSystem"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Grading System</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteGradingSystem"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Grading System</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageGradingSystem"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Grading System</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    GPA CALCULATION SYSTEM
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addGpa"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Creating GPA Calculation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editGpa"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit GPA Calculation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteGpa"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete GPA Calculation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageGpa"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage GPA Calculation</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    PUBLISH RESULT ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="publishResult"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Publish Result</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Manage users */}

                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    MANAGE STUDENT ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addStudent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Student</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editStudent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Student</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteStudent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Student</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageStudent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Student</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    MANAGE PARENT ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addParent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Parent</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editParent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Parent</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteParent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Parent</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageParent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Parent</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    MANAGE Department ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addDepartment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Department</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editDepartment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Department</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteDepartment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Department</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageDepartment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Department</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    MANAGE EMPLOYEE LIST ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">

                    <FormField
                      control={form.control}
                      name="manageEmployeeList"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Employee List</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    MANAGE EMPLOYEE ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addEmployee"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Employee</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editEmployee"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Employee</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteEmployee"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Employee</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageEmployee"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Employee</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    STUDENT ATTENDANCE ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addStudentAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Student Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editStudentAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel> Edit Student Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteStudentAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel> Delete Student Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageStudentAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel> Manage Student Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    TEACHER ATTENDANCE ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addTeacherAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Teacher Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="editTeacherAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel> Edit Teacher Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteTeacherAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel> Delete Teacher Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageTeacherAttendance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel> Manage Teacher Attendance</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    HOME WORK ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">

                    <FormField
                      control={form.control}
                      name="addHomework"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Home Work</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewHomework"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Home Work</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editHomework"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Home Work</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteHomework"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Home Work</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageHomework"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Home Work</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    EVALUATION REPORT ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">

                    <FormField
                      control={form.control}
                      name="addEvaluationReport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Evaluation Report</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewEvaluationReport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Evaluation Report</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editEvaluationReport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Evaluation Report</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteEvaluationReport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Evaluation Report</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageEvaluationReport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Evaluation Report</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-white text-xs bg-black/80 p-0.5">
                    MANAGE TIMETABLE ACCESS
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3">
                    <FormField
                      control={form.control}
                      name="addTimetable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Timetable</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="viewTimetable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Timetables</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="editTimetable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Edit Timetable</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deleteTimetable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Delete Timetable</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manageTimetable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>View Manage Timetable</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateRoleForm;

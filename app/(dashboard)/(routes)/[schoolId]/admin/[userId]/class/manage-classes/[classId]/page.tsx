import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchClassById } from '@/lib/actions/class.actions'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTable } from '@/components/table/data-table'
import { subjectColumns } from '../_components/subject/column'
import { studentColumns } from '../_components/student/column'
import { teacherColumns } from '../_components/teacher/column'
import { currentUser } from '@/lib/helpers/current-user'

type Props = Promise<{ schoolId: string, userId: string, classId: string }>
const page = async ({
  params
}: { params: Props }) => {
  const user = await currentUser();

  if (!user) redirect("/");

  const { schoolId, userId, classId } = await params;

  const data = await fetchClassById(classId);
  console.log(data, " class data")
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`${data?.name} Details`}
          description={`View ${data?.name} with it subjects, students and it teachers.`}
        />
        <Link
          href={`/${schoolId}/admin/${userId}/class/manage-classes`}
          className={cn(buttonVariants())}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>
      <Separator />
      <div className="md:px-4 pt-3">
        <Tabs defaultValue="details" className=" w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="w-ful">
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>
                  {`This class is for  students with . Here are some more details`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="py-5">
                    <p className="flex gap-4">
                      Number of Subjects:{" "}
                      <span className="mr-2 font-bold">
                        {data?.subjects?.length || 0}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <div className="py-5">
                    <p className="flex gap-4">
                      Number of Students:{" "}
                      <span className="mr-2 font-bold">
                        {data?.students?.length || 0}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <div className="py-5">
                    <p className="flex gap-4">
                      Number of Teachers:{" "}
                      <span className="mr-2 font-bold">
                        {data?.teachers.length || 0}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <div className="flex gap-4 items-center py-5 flex-wrap">
                    
                    <Button>
                      Add Student
                    </Button>
                    <Button>
                      Add Teacher
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subjects">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable searchKey="subjectName" columns={subjectColumns} data={data?.subjects} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="students">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable searchKey="fullName" columns={studentColumns} data={data?.students} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="teachers">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <DataTable searchKey="fullName" columns={teacherColumns} data={data?.teachers} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timetable">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  {/* Timetable component */}
                  <p>This is timetable for {data?.name}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default page

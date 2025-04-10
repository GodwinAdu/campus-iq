import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const UpgradeDialog = ({ planFeatures, currentPlan, school, percentageUsed }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button className="w-full" >
                    Upgrade Plan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Upgrade Your Subscription</DialogTitle>
                    <DialogDescription>Choose a plan that best fits your school&apos;s needs</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <h3 className="font-medium">
                            Current Plan: {planFeatures[currentPlan as keyof typeof planFeatures]?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Your total student are {school.subscriptionPlan.currentStudent}
                        </p>
                        <Progress value={percentageUsed} className="h-2" />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="font-medium">Available Plans</h3>

                        {Object.keys(planFeatures)
                            .filter((plan) => plan !== currentPlan)
                            .map((plan) => {
                                const planData = planFeatures[plan as keyof typeof planFeatures]
                                const isUpgrade =
                                    planData.price > (planFeatures[currentPlan as keyof typeof planFeatures]?.price || 0)

                                return (
                                    <div key={plan} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium">{planData.name} Plan</h4>
                                                {isUpgrade ? (
                                                    <Badge className="bg-green-100 text-green-800">Upgrade</Badge>
                                                ) : (
                                                    <Badge variant="outline">Downgrade</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                ${planData.price}/{planData.period} • Up to {planData.maxStudents} students
                                            </p>
                                        </div>
                                        <Button variant={isUpgrade ? "default" : "outline"} size="sm">
                                            Select
                                        </Button>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                <DialogFooter>

                    <Button type="submit">Continue to Payment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpgradeDialog
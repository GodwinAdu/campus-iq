"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

const subscriptionPlanSchema = z.object({
  plan: z.enum(["basic", "pro", "enterprise"]),
})

type SubscriptionPlanFormProps = {
  onSubmit: (data: z.infer<typeof subscriptionPlanSchema>) => void
  onBack: () => void
  isSubmitting: boolean
}

export function SubscriptionPlanForm({ onSubmit, onBack, isSubmitting }: SubscriptionPlanFormProps) {
  const form = useForm<z.infer<typeof subscriptionPlanSchema>>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      plan: "basic",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Plan</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  {[
                    {
                      value: "basic",
                      label: "Basic Plan",
                      price: "Gh10 per user/month",

                    },
                    {
                      value: "pro",
                      label: "Pro Plan",
                      price: "GH20 per user/month",

                    }
                  ].map((plan) => (
                    <FormItem key={plan.value} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={plan.value} />
                      </FormControl>
                      <motion.div
                        className="flex-1 p-4 border rounded-md"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FormLabel className="font-semibold text-lg">{plan.label}</FormLabel>
                        <p className="text-sm text-gray-600 mb-2">{plan.price}</p>
                      </motion.div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating School
              </>
            ) : (
              "Create School"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}


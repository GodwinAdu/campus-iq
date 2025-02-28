"use client"

import { useModal } from "@/hooks/use-modal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const HelpModal = () => {
    const { type, isOpen, closeModal } = useModal()

    const isModalOpen = isOpen && type === "help"

    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Help & Support</DialogTitle>
                    <DialogDescription>Find answers to common questions or contact our support team.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                            <AccordionContent>
                                You can reset your password by clicking on the &quot;Forgot password&quot; link on the login page. You will
                                receive an email with instructions to reset your password.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How do I invite team members?</AccordionTrigger>
                            <AccordionContent>
                                You can invite team members by clicking on the &quot;Invite&quot; option in the dropdown menu. Enter their email
                                address and select a role to send them an invitation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How do I change my subscription plan?</AccordionTrigger>
                            <AccordionContent>
                                You can change your subscription plan by going to Settings → Billing. There you&apos;ll find options to
                                upgrade, downgrade, or cancel your subscription.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full sm:w-auto" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="default" className="w-full sm:w-auto">
                        Contact Support
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


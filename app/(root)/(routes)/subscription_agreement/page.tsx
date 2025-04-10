"use client"

import { useState, useRef, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-content"
import { VersionHistory } from "@/components/version-history"

export default function SubscriptionAgreement() {
    const [searchTerm, setSearchTerm] = useState("")
    const contentRef = useRef<HTMLDivElement>(null)

    const subscriptionItems = [
        {
            id: "overview",
            title: "1. Subscription Overview",
            content: (
                <div className="space-y-2">
                    <p>
                        This Subscription Agreement ("Agreement") governs your subscription to and use of CampusIQ, a comprehensive
                        school management application. By subscribing to CampusIQ, you agree to be bound by this Agreement in
                        addition to our Terms and Conditions and Privacy Policy.
                    </p>
                    <p>
                        This Agreement is between CampusIQ ("we," "us," or "our") and the educational institution or organization
                        ("Institution," "you," or "your") that has subscribed to our services.
                    </p>
                </div>
            ),
        },
        {
            id: "subscription-plans",
            title: "2. Subscription Plans and Pricing",
            content: (
                <div className="space-y-4">
                    <p>
                        CampusIQ offers several subscription plans designed to meet the needs of different educational institutions.
                        Each plan includes specific features, user limits, and support levels as detailed below:
                    </p>

                    <Table>
                        <TableCaption>CampusIQ Subscription Plans</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Plan</TableHead>
                                <TableHead>Features</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Starter</TableCell>
                                <TableCell>
                                    <ul className="list-disc list-inside">
                                        <li>Up to 500 student accounts</li>
                                        <li>Basic attendance tracking</li>
                                        <li>Grade management</li>
                                        <li>Parent portal</li>
                                        <li>Email support</li>
                                    </ul>
                                </TableCell>
                                <TableCell className="text-right">$2 per student/month</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Professional</TableCell>
                                <TableCell>
                                    <ul className="list-disc list-inside">
                                        <li>Up to 2,000 student accounts</li>
                                        <li>All Starter features</li>
                                        <li>Advanced reporting</li>
                                        <li>Curriculum management</li>
                                        <li>Resource scheduling</li>
                                        <li>Email and chat support</li>
                                    </ul>
                                </TableCell>
                                <TableCell className="text-right">$3 per student/month</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Enterprise</TableCell>
                                <TableCell>
                                    <ul className="list-disc list-inside">
                                        <li>Unlimited student accounts</li>
                                        <li>All Professional features</li>
                                        <li>Custom integrations</li>
                                        <li>Advanced analytics</li>
                                        <li>Dedicated account manager</li>
                                        <li>24/7 priority support</li>
                                        <li>On-site training</li>
                                    </ul>
                                </TableCell>
                                <TableCell className="text-right">Custom pricing</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <p className="text-sm text-gray-600 mt-2">
                        All prices are in USD. Annual billing discounts are available. Contact our sales team for detailed pricing
                        information for your specific needs.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="font-medium text-blue-800 mb-2">Educational Discounts</h4>
                        <p className="text-blue-700 text-sm">
                            CampusIQ offers special pricing for public schools, non-profit educational institutions, and schools in
                            underserved communities. Contact our sales team to learn more about our educational discount program.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "payment-terms",
            title: "3. Payment Terms",
            content: (
                <div className="space-y-2">
                    <p>By subscribing to CampusIQ, you agree to the following payment terms:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Billing Cycle:</strong> Subscriptions are billed either monthly or annually, depending on the
                            option selected during registration. Annual subscriptions receive a 15% discount compared to monthly
                            billing.
                        </li>
                        <li>
                            <strong>Payment Methods:</strong> We accept payment via credit card, purchase order (for qualifying
                            institutions), and bank transfer (for annual subscriptions only).
                        </li>
                        <li>
                            <strong>Taxes:</strong> All fees are exclusive of taxes. You are responsible for paying all applicable
                            taxes, except for taxes based on our net income.
                        </li>
                        <li>
                            <strong>Late Payments:</strong> Payments not received within 30 days of the invoice date may result in
                            service suspension. A late payment fee of 1.5% per month may be applied to overdue balances.
                        </li>
                        <li>
                            <strong>Price Changes:</strong> We reserve the right to change our prices. Any price changes will be
                            communicated at least 60 days in advance and will take effect at the next billing cycle.
                        </li>
                    </ul>
                    <p>For Enterprise customers, payment terms will be specified in your custom agreement.</p>
                </div>
            ),
        },
        {
            id: "subscription-term",
            title: "4. Subscription Term and Renewal",
            content: (
                <div className="space-y-2">
                    <p>
                        <strong>Initial Term:</strong> Your initial subscription term begins on the date of your first payment and
                        continues for the period specified in your subscription plan (monthly or annual).
                    </p>
                    <p>
                        <strong>Automatic Renewal:</strong> Unless otherwise specified, your subscription will automatically renew
                        at the end of each term for a subsequent term of the same duration. For example, monthly subscriptions renew
                        monthly, and annual subscriptions renew annually.
                    </p>
                    <p>
                        <strong>Renewal Notice:</strong> We will send a renewal notice to your designated administrator at least:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>7 days before renewal for monthly subscriptions</li>
                        <li>30 days before renewal for annual subscriptions</li>
                    </ul>
                    <p>
                        <strong>Subscription Changes:</strong> You may upgrade your subscription plan at any time. Upgrades will be
                        prorated for the remainder of your current billing cycle. Downgrades will take effect at the beginning of
                        the next billing cycle.
                    </p>
                </div>
            ),
        },
        {
            id: "cancellation",
            title: "5. Cancellation and Refund Policy",
            content: (
                <div className="space-y-2">
                    <p>
                        <strong>Cancellation Process:</strong> You may cancel your subscription at any time through your account
                        settings or by contacting our support team. Upon cancellation:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            For monthly subscriptions: Your service will continue until the end of the current billing period, after
                            which it will be terminated.
                        </li>
                        <li>
                            For annual subscriptions: Your service will continue until the end of the current annual term, after which
                            it will be terminated.
                        </li>
                    </ul>
                    <p>
                        <strong>Early Termination:</strong> If you cancel an annual subscription before the end of your term, your
                        service will continue until the end of the term, but no refund will be issued for the unused portion unless
                        otherwise required by law.
                    </p>
                    <p>
                        <strong>Refunds:</strong> We do not provide refunds for partial subscription periods or for unused services,
                        except in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            If you cancel within 30 days of your initial subscription (satisfaction guarantee), we will provide a full
                            refund.
                        </li>
                        <li>
                            If there is a material reduction in service functionality that significantly impacts your use of CampusIQ.
                        </li>
                        <li>If required by applicable law.</li>
                    </ul>
                    <p>
                        <strong>Data Export:</strong> Upon cancellation, you will have 30 days to export your data before it is
                        permanently deleted from our systems. We recommend exporting all necessary data before cancelling your
                        subscription.
                    </p>
                </div>
            ),
        },
        {
            id: "service-level",
            title: "6. Service Level Agreement",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ is committed to providing a reliable and high-quality service. Our Service Level Agreement (SLA)
                        includes the following commitments:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Uptime:</strong> We guarantee 99.9% uptime for our services, excluding scheduled maintenance
                            windows.
                        </li>
                        <li>
                            <strong>Scheduled Maintenance:</strong> Routine maintenance will be performed during low-usage periods,
                            typically on weekends or between 11:00 PM and 5:00 AM in your primary time zone. We will provide at least
                            48 hours' notice for scheduled maintenance.
                        </li>
                        <li>
                            <strong>Emergency Maintenance:</strong> In rare cases, emergency maintenance may be required with limited
                            or no advance notice. We will make reasonable efforts to notify you as soon as possible.
                        </li>
                        <li>
                            <strong>Support Response Times:</strong>
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Starter Plan: Email support within 24 business hours</li>
                                <li>Professional Plan: Email and chat support within 12 business hours</li>
                                <li>
                                    Enterprise Plan: Priority support with response within 4 business hours, 24/7 for critical issues
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        <strong>SLA Credits:</strong> If we fail to meet our uptime guarantee, you may be eligible for service
                        credits as follows:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Monthly uptime between 99.0% and 99.9%: 10% credit of monthly subscription fee</li>
                        <li>Monthly uptime between 95.0% and 98.9%: 25% credit of monthly subscription fee</li>
                        <li>Monthly uptime below 95.0%: 50% credit of monthly subscription fee</li>
                    </ul>
                    <p className="text-sm text-gray-600">
                        To request an SLA credit, contact our support team within 30 days of the incident. Credits will be applied
                        to future subscription periods.
                    </p>
                </div>
            ),
        },
        {
            id: "usage-limitations",
            title: "7. Usage Limitations",
            content: (
                <div className="space-y-2">
                    <p>Your subscription to CampusIQ is subject to the following usage limitations:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>User Accounts:</strong> Your subscription plan includes a specific number of user accounts.
                            Additional user accounts may be purchased at an additional cost.
                        </li>
                        <li>
                            <strong>Storage:</strong> Each plan includes a storage allocation for documents, images, and other files:
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Starter Plan: 50GB total storage</li>
                                <li>Professional Plan: 250GB total storage</li>
                                <li>Enterprise Plan: 1TB total storage, with options to purchase additional storage</li>
                            </ul>
                        </li>
                        <li>
                            <strong>API Calls:</strong> API usage is limited to:
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Starter Plan: 10,000 API calls per day</li>
                                <li>Professional Plan: 50,000 API calls per day</li>
                                <li>Enterprise Plan: Custom limits based on your needs</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Concurrent Users:</strong> The system is designed to support a reasonable number of concurrent
                            users based on your total user count. Excessive concurrent usage that impacts system performance may
                            require an upgrade to a higher plan.
                        </li>
                    </ul>
                    <p>
                        <strong>Fair Use Policy:</strong> CampusIQ operates under a fair use policy. We reserve the right to limit
                        excessive usage that negatively impacts our infrastructure or other customers' experience. If your usage
                        consistently exceeds normal patterns, we may contact you to discuss upgrading to a more appropriate plan.
                    </p>
                </div>
            ),
        },
        {
            id: "account-management",
            title: "8. Account Management",
            content: (
                <div className="space-y-2">
                    <p>
                        <strong>Administrator Accounts:</strong> Each Institution must designate at least one primary administrator
                        who will have full access to manage the CampusIQ subscription, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Adding and removing users</li>
                        <li>Assigning roles and permissions</li>
                        <li>Managing subscription settings</li>
                        <li>Accessing billing information and payment history</li>
                        <li>Exporting Institution data</li>
                    </ul>
                    <p>
                        <strong>Administrator Responsibilities:</strong> Institution administrators are responsible for:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Ensuring compliance with this Agreement and our Terms and Conditions</li>
                        <li>Managing user access appropriately</li>
                        <li>Maintaining the security of administrator credentials</li>
                        <li>Promptly removing access for users who leave the Institution</li>
                        <li>Serving as the primary point of contact for communications from CampusIQ</li>
                    </ul>
                    <p>
                        <strong>Account Security:</strong> You are responsible for maintaining the security of your account and
                        password. CampusIQ cannot and will not be liable for any loss or damage from your failure to comply with
                        this security obligation.
                    </p>
                </div>
            ),
        },
        {
            id: "modifications",
            title: "9. Modifications to Subscription Terms",
            content: (
                <div className="space-y-2">
                    <p>
                        <strong>Changes to This Agreement:</strong> We reserve the right to modify this Subscription Agreement at
                        any time. If we make material changes, we will provide notice as follows:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>For minor changes: Notice within the CampusIQ application</li>
                        <li>
                            For material changes: Email notification to your primary administrator at least 30 days before the changes
                            take effect
                        </li>
                    </ul>
                    <p>
                        <strong>Continued Use:</strong> Your continued use of CampusIQ after the effective date of any changes
                        constitutes acceptance of the modified terms. If you do not agree to the changes, you may cancel your
                        subscription as described in Section 5.
                    </p>
                    <p>
                        <strong>Feature Changes:</strong> We continuously improve CampusIQ and may add, modify, or remove features
                        over time. We will provide advance notice of significant feature changes through our product update
                        communications.
                    </p>
                </div>
            ),
        },
        {
            id: "educational-terms",
            title: "10. Educational Institution-Specific Terms",
            content: (
                <div className="space-y-2">
                    <p>
                        As an educational technology provider, CampusIQ acknowledges the unique requirements of educational
                        institutions:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Academic Calendar Alignment:</strong> For annual subscriptions, we offer the option to align your
                            subscription term with your academic calendar. Contact our sales team to arrange this.
                        </li>
                        <li>
                            <strong>Student Privacy:</strong> We comply with applicable student privacy laws, including FERPA (Family
                            Educational Rights and Privacy Act) and COPPA (Children's Online Privacy Protection Act). See our Privacy
                            Policy for details.
                        </li>
                        <li>
                            <strong>Data Ownership:</strong> Your Institution retains ownership of all data uploaded to or created
                            within CampusIQ. We will not use your data for purposes other than providing and improving our services,
                            as detailed in our Privacy Policy.
                        </li>
                        <li>
                            <strong>Accessibility:</strong> CampusIQ is designed to comply with WCAG 2.1 AA standards for
                            accessibility. We are committed to making our platform accessible to all users, including those with
                            disabilities.
                        </li>
                        <li>
                            <strong>Training and Support:</strong> We offer specialized training for educational staff:
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Starter Plan: Access to online documentation and tutorials</li>
                                <li>Professional Plan: Online training sessions for administrators</li>
                                <li>Enterprise Plan: Customized training program, including on-site options</li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        <strong>Procurement Requirements:</strong> We understand that educational institutions often have specific
                        procurement requirements. We can provide additional documentation, including W-9 forms, insurance
                        certificates, and vendor registration information upon request.
                    </p>
                </div>
            ),
        },
    ]

    const versionHistory = [
        {
            date: "April 15, 2023",
            version: "2.1",
            changes: [
                "Updated Service Level Agreement section",
                "Added Educational Institution-Specific Terms",
                "Clarified cancellation policy",
            ],
        },
        {
            date: "January 10, 2023",
            version: "2.0",
            changes: [
                "Major revision of subscription plans and pricing",
                "Enhanced usage limitations section",
                "Updated payment terms",
            ],
        },
        {
            date: "June 5, 2022",
            version: "1.0",
            changes: ["Initial subscription agreement"],
        },
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase())

        if (term && contentRef.current) {
            // Remove existing highlights
            const highlighted = contentRef.current.querySelectorAll(".highlight")
            highlighted.forEach((el) => {
                const parent = el.parentNode
                if (parent) {
                    parent.replaceChild(document.createTextNode(el.textContent || ""), el)
                    parent.normalize()
                }
            })

            // Add new highlights
            if (term.trim() !== "") {
                highlightText(contentRef.current, term)
            }
        }
    }

    const highlightText = (element: HTMLElement, term: string) => {
        if (!element || !term) return

        const nodes = element.childNodes

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]

            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || ""
                const lowerText = text.toLowerCase()
                const index = lowerText.indexOf(term.toLowerCase())

                if (index >= 0) {
                    const before = text.substring(0, index)
                    const match = text.substring(index, index + term.length)
                    const after = text.substring(index + term.length)

                    const beforeNode = document.createTextNode(before)
                    const matchNode = document.createElement("span")
                    matchNode.className = "highlight bg-yellow-200"
                    matchNode.appendChild(document.createTextNode(match))
                    const afterNode = document.createTextNode(after)

                    const parent = node.parentNode
                    if (parent) {
                        parent.insertBefore(beforeNode, node)
                        parent.insertBefore(matchNode, node)
                        parent.insertBefore(afterNode, node)
                        parent.removeChild(node)
                        i += 2 // Skip the nodes we just added
                    }
                }
            } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes && node.childNodes.length > 0) {
                highlightText(node as HTMLElement, term)
            }
        }
    }

    useEffect(() => {
        if (searchTerm && contentRef.current) {
            highlightText(contentRef.current, searchTerm)
        }
    }, [searchTerm])

    const tocItems = subscriptionItems.map((item) => ({
        id: item.id,
        title: item.title,
    }))

    return (
        <div className="min-h-screen bg-background mt-16 print:bg-white">
            <PageHeader title="CampusIQ Subscription Agreement" lastUpdated="April 06, 2025" onSearch={handleSearch} />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <Card className="p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <p className="mb-4 sm:mb-0">
                                This Subscription Agreement outlines the terms and conditions for subscribing to CampusIQ, including
                                pricing, payment terms, and service level commitments.
                            </p>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    <span>Download PDF</span>
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    <span>Print</span>
                                </Button>
                            </div>
                        </div>

                        <TableOfContents items={tocItems} />

                        <div ref={contentRef} className="space-y-4">
                            {subscriptionItems.map((item) => (
                                <div key={item.id} id={item.id} className="scroll-mt-20">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value={item.id}>
                                            <AccordionTrigger className="text-lg font-medium py-4">{item.title}</AccordionTrigger>
                                            <AccordionContent className="text-gray-700">{item.content}</AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                            <p className="text-gray-600 mb-4">
                                If you have questions about our subscription plans or need assistance, our sales team is here to help.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button>Contact Sales</Button>
                                <Button variant="outline">Schedule a Demo</Button>
                            </div>
                        </div>

                        <VersionHistory versions={versionHistory} />
                    </Card>
                </div>
            </main>
        </div>
    )
}


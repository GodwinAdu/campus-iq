"use client"

import { useState, useRef, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Download, FileText, HelpCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-content"
import { VersionHistory } from "@/components/version-history"

export default function RefundPolicy() {
    const [searchTerm, setSearchTerm] = useState("")
    const contentRef = useRef<HTMLDivElement>(null)

    const refundItems = [
        {
            id: "overview",
            title: "1. Refund Policy Overview",
            content: (
                <div className="space-y-2">
                    <p>
                        This Refund Policy outlines the terms and conditions under which CampusIQ provides refunds for its
                        subscription services. This policy is part of our overall Subscription Agreement and Terms of Service.
                    </p>
                    <p>
                        CampusIQ is committed to fair and transparent billing practices. We understand that circumstances may arise
                        where a refund is warranted, and we have established this policy to address such situations.
                    </p>
                    <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                            This Refund Policy applies to all subscription plans and services provided by CampusIQ. By subscribing to
                            our services, you acknowledge that you have read, understood, and agree to this Refund Policy.
                        </AlertDescription>
                    </Alert>
                </div>
            ),
        },
        {
            id: "eligibility",
            title: "2. Refund Eligibility",
            content: (
                <div className="space-y-2">
                    <p>CampusIQ offers refunds under the following circumstances:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Satisfaction Guarantee:</strong> If you are not satisfied with CampusIQ, you may request a full
                            refund within 30 days of your initial subscription purchase (the "Satisfaction Guarantee Period").
                        </li>
                        <li>
                            <strong>Service Unavailability:</strong> If CampusIQ experiences significant downtime that exceeds our
                            Service Level Agreement (SLA) commitments, you may be eligible for a prorated refund for the affected
                            period.
                        </li>
                        <li>
                            <strong>Billing Errors:</strong> If you have been incorrectly charged or overcharged, you are entitled to
                            a refund of the incorrect or excess amount.
                        </li>
                        <li>
                            <strong>Duplicate Payments:</strong> If you have made a duplicate payment for the same subscription
                            period, you are entitled to a refund of the duplicate payment.
                        </li>
                    </ul>
                    <p className="mt-4">
                        <strong>Refunds are NOT generally available in the following situations:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>After the 30-day Satisfaction Guarantee Period has expired</li>
                        <li>For partial or unused subscription periods after the Satisfaction Guarantee Period</li>
                        <li>For add-on services or features that have been used</li>
                        <li>If your account has been suspended or terminated for violation of our Terms of Service</li>
                        <li>For charges that are more than 90 days old</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "process",
            title: "3. Refund Request Process",
            content: (
                <div className="space-y-2">
                    <p>To request a refund, please follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Log in to your CampusIQ administrator account and navigate to the Billing section.</li>
                        <li>
                            Click on the "Request Refund" button and complete the refund request form, providing all required
                            information.
                        </li>
                        <li>
                            Alternatively, you can contact our Billing Support team at billing@campusiq.com with your refund request.
                        </li>
                        <li>
                            Include the following information in your request:
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Your institution name and account ID</li>
                                <li>The invoice number(s) for which you are requesting a refund</li>
                                <li>The reason for your refund request</li>
                                <li>Any relevant documentation or evidence supporting your request</li>
                            </ul>
                        </li>
                    </ol>
                    <p className="mt-4">
                        <strong>Refund Review Process:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>All refund requests are reviewed by our Billing Support team within 3 business days.</li>
                        <li>We may request additional information or documentation to process your refund request.</li>
                        <li>
                            Once a decision has been made, you will be notified via email of the approval or denial of your refund
                            request.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: "timeframes",
            title: "4. Refund Timeframes and Methods",
            content: (
                <div className="space-y-2">
                    <p>
                        <strong>Refund Processing Timeframes:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Approved refunds are processed within 10 business days of approval.</li>
                        <li>
                            The time it takes for the refund to appear in your account depends on your payment method and financial
                            institution:
                            <ul className="list-disc list-inside ml-6 mt-1">
                                <li>Credit/Debit Card: 5-10 business days</li>
                                <li>Bank Transfer: 7-14 business days</li>
                                <li>Check: 14-21 business days for delivery</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="mt-4">
                        <strong>Refund Methods:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Refunds are issued using the same payment method used for the original purchase whenever possible.</li>
                        <li>
                            If the original payment method is no longer available or valid, we will work with you to determine an
                            alternative refund method.
                        </li>
                        <li>
                            For educational institutions that paid via purchase order or bank transfer, refunds will be issued by
                            check or bank transfer.
                        </li>
                    </ul>
                    <div className="bg-blue-50 p-4 rounded-md mt-4">
                        <h4 className="font-medium text-blue-800 mb-2">Account Credits</h4>
                        <p className="text-blue-700 text-sm">
                            In some cases, we may offer account credits instead of monetary refunds. Account credits can be applied to
                            future invoices and do not expire. If you prefer an account credit instead of a refund, please indicate
                            this in your refund request.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "prorated",
            title: "5. Prorated Refunds and Calculations",
            content: (
                <div className="space-y-2">
                    <p>
                        In certain circumstances, CampusIQ may issue prorated refunds based on the unused portion of your
                        subscription period:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Service Unavailability:</strong> Prorated refunds for service unavailability are calculated based
                            on the duration of the downtime as a percentage of the billing period.
                        </li>
                        <li>
                            <strong>Plan Downgrades:</strong> If you downgrade your subscription plan mid-billing cycle and are
                            eligible for a prorated refund, the refund amount is calculated as follows:
                            <div className="bg-gray-100 p-3 rounded-md mt-2 mb-2">
                                <code>
                                    Refund Amount = (Original Plan Cost - New Plan Cost) × (Days Remaining in Billing Cycle ÷ Total Days
                                    in Billing Cycle)
                                </code>
                            </div>
                        </li>
                    </ul>
                    <p>
                        <strong>Example Calculation:</strong>
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm">
                            If you downgrade from a Professional Plan ($3,000/month) to a Starter Plan ($1,000/month) with 15 days
                            remaining in a 30-day billing cycle, the prorated refund would be:
                        </p>
                        <p className="text-sm mt-2">($3,000 - $1,000) × (15 ÷ 30) = $2,000 × 0.5 = $1,000</p>
                    </div>
                    <p className="mt-4">
                        <strong>Annual Subscription Refunds:</strong>
                    </p>
                    <p>
                        For annual subscriptions cancelled within the 30-day Satisfaction Guarantee Period, a full refund will be
                        issued. After this period, annual subscriptions are generally non-refundable for the remainder of the term.
                    </p>
                </div>
            ),
        },
        {
            id: "educational",
            title: "6. Educational Institution-Specific Terms",
            content: (
                <div className="space-y-2">
                    <p>
                        We understand that educational institutions often have unique budgetary and procurement processes. To
                        accommodate these needs, we offer the following educational institution-specific refund terms:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Extended Evaluation Period:</strong> Public K-12 schools, colleges, and universities may request
                            an extended evaluation period of up to 60 days (instead of the standard 30 days) for their initial
                            subscription.
                        </li>
                        <li>
                            <strong>Budget Cycle Alignment:</strong> If your institution's budget cycle does not align with our
                            standard billing cycle, we can work with you to adjust your subscription term and provide appropriate
                            prorated refunds.
                        </li>
                        <li>
                            <strong>Grant Funding:</strong> If your CampusIQ subscription was purchased using grant funding that has
                            been unexpectedly terminated or reduced, you may be eligible for a prorated refund with appropriate
                            documentation.
                        </li>
                        <li>
                            <strong>District-Wide Deployments:</strong> For district-wide deployments, we offer specialized refund
                            terms during the initial implementation phase. Contact our Education Sales team for details.
                        </li>
                    </ul>
                    <p className="mt-4">
                        <strong>Documentation Requirements:</strong>
                    </p>
                    <p>
                        Educational institutions requesting refunds under these special terms may be required to provide
                        documentation such as:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Official institution letterhead explaining the circumstances</li>
                        <li>Grant termination or modification notices</li>
                        <li>Budget approval or modification documentation</li>
                        <li>Other relevant financial or administrative documentation</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "exceptions",
            title: "7. Special Circumstances and Exceptions",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ recognizes that special circumstances may arise that are not explicitly covered by our standard
                        refund policy. We evaluate these situations on a case-by-case basis:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Force Majeure Events:</strong> In the event of natural disasters, pandemics, or other force
                            majeure events that significantly impact your institution's operations, we may offer special refund
                            arrangements.
                        </li>
                        <li>
                            <strong>School Closures or Mergers:</strong> If your educational institution closes, merges with another
                            institution, or undergoes significant restructuring, you may be eligible for a prorated refund.
                        </li>
                        <li>
                            <strong>Significant Product Changes:</strong> If CampusIQ makes significant changes to its features or
                            functionality that materially reduce the value of the service to your institution, you may be eligible for
                            a prorated refund.
                        </li>
                        <li>
                            <strong>Technical Implementation Issues:</strong> If you experience significant technical issues during
                            implementation that cannot be resolved by our support team, you may be eligible for a full or partial
                            refund.
                        </li>
                    </ul>
                    <p className="mt-4">
                        To request a refund under special circumstances, please contact our Billing Support team with detailed
                        information about your situation and any supporting documentation.
                    </p>
                    <div className="bg-amber-50 p-4 rounded-md mt-4">
                        <h4 className="font-medium text-amber-800 mb-2">Discretionary Review</h4>
                        <p className="text-amber-700 text-sm">
                            All special circumstance refund requests are subject to review by our management team. While we strive to
                            be fair and accommodating, the decision to issue refunds in these cases is at CampusIQ's sole discretion.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "disputes",
            title: "8. Refund Disputes and Resolution",
            content: (
                <div className="space-y-2">
                    <p>
                        If you disagree with a refund decision or have concerns about how your refund request was handled, you can
                        initiate our dispute resolution process:
                    </p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>
                            <strong>Initial Review Request:</strong> Contact our Billing Support team at billing@campusiq.com to
                            request a review of your refund decision. Include your case number, the reason for your dispute, and any
                            additional information that may be relevant.
                        </li>
                        <li>
                            <strong>Escalation:</strong> If you are not satisfied with the response from our Billing Support team, you
                            can escalate your dispute to our Customer Success Manager by emailing escalations@campusiq.com.
                        </li>
                        <li>
                            <strong>Final Review:</strong> If your dispute remains unresolved after escalation, you can request a
                            final review by our Finance Department. This request must be submitted in writing within 30 days of the
                            escalation response.
                        </li>
                    </ol>
                    <p className="mt-4">
                        <strong>Mediation and Arbitration:</strong>
                    </p>
                    <p>
                        If the dispute cannot be resolved through our internal process, it will be addressed according to the
                        dispute resolution procedures outlined in our Terms of Service, which may include mediation or arbitration.
                    </p>
                    <p className="mt-4">
                        <strong>Regulatory Complaints:</strong>
                    </p>
                    <p>
                        You have the right to file a complaint with relevant regulatory authorities if you believe our refund
                        practices violate applicable laws or regulations. However, we encourage you to work with us directly to
                        resolve any issues before pursuing regulatory action.
                    </p>
                    <div className="flex items-center gap-2 mt-4 p-4 bg-gray-50 rounded-md">
                        <HelpCircle className="h-5 w-5 text-gray-500" />
                        <p className="text-sm text-gray-600">
                            For questions about our refund policy or to check the status of a refund request, please contact our
                            Billing Support team at billing@campusiq.com or call (555) 123-4567 during business hours.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "changes",
            title: "9. Changes to Refund Policy",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ reserves the right to modify this Refund Policy at any time. If we make material changes to this
                        policy, we will:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Notify customers via email to the primary administrator account</li>
                        <li>Post a notice on our website and within the CampusIQ application</li>
                        <li>Update the "Last Updated" date at the top of this policy</li>
                    </ul>
                    <p className="mt-4">
                        <strong>Policy Application:</strong>
                    </p>
                    <p>
                        The version of the Refund Policy in effect at the time of your purchase will apply to that transaction.
                        However, any changes to the policy regarding service availability, technical support, or other ongoing
                        aspects of our service will apply to all current customers upon the effective date of the change.
                    </p>
                    <p className="mt-4">
                        <strong>Historical Versions:</strong>
                    </p>
                    <p>
                        Previous versions of our Refund Policy are available upon request by contacting our Billing Support team.
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
                "Added Educational Institution-Specific Terms section",
                "Enhanced Special Circumstances section",
                "Updated refund calculation examples",
            ],
        },
        {
            date: "January 10, 2023",
            version: "2.0",
            changes: [
                "Major revision of refund policy",
                "Added detailed refund process steps",
                "Updated timeframes for refund processing",
            ],
        },
        {
            date: "June 5, 2022",
            version: "1.0",
            changes: ["Initial refund policy"],
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

    const tocItems = refundItems.map((item) => ({
        id: item.id,
        title: item.title,
    }))

    return (
        <div className="min-h-screen bg-background mt-16 print:bg-white">
            <PageHeader title="CampusIQ Refund Policy" lastUpdated="April 06, 2025" onSearch={handleSearch} />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <Card className="p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <p className="mb-4 sm:mb-0">
                                This Refund Policy outlines the conditions under which CampusIQ provides refunds for its subscription
                                services, the refund process, and special considerations for educational institutions.
                            </p>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    <span>Download PDF</span>
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => window.print()}>
                                    <FileText className="h-4 w-4" />
                                    <span>Print</span>
                                </Button>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md mb-6">
                            <h3 className="text-blue-800 font-medium mb-2">Quick Reference</h3>
                            <ul className="text-blue-700 text-sm space-y-1">
                                <li>• Satisfaction Guarantee: Full refund within 30 days of initial subscription</li>
                                <li>• Educational Institutions: Extended 60-day evaluation period available</li>
                                <li>• Refund Requests: Submit via Billing section in your account or email billing@campusiq.com</li>
                                <li>• Processing Time: 10 business days after approval</li>
                            </ul>
                        </div>

                        <TableOfContents items={tocItems} />

                        <div ref={contentRef} className="space-y-4">
                            {refundItems.map((item) => (
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
                            <h3 className="text-lg font-medium mb-2">Need Help With a Refund?</h3>
                            <p className="text-gray-600 mb-4">
                                Our Billing Support team is available to assist you with any questions about our refund policy or to
                                help you with a refund request.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button>Contact Billing Support</Button>
                                <Link href="/subscription" passHref>
                                    <Button variant="outline">View Subscription Plans</Button>
                                </Link>
                            </div>
                        </div>

                        <VersionHistory versions={versionHistory} />
                    </Card>
                </div>
            </main>
        </div>
    )
}


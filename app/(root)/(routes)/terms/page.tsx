"use client"
import { useState, useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { VersionHistory } from "@/components/version-history"
import { Card } from "@/components/ui/card"
import { TableOfContents } from "@/components/table-of-content"
import { PageHeader } from "@/components/page-header"

export default function TermsAndConditions() {
    const [searchTerm, setSearchTerm] = useState("")
    const contentRef = useRef<HTMLDivElement>(null)

    const termsItems = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: (
                <div className="space-y-2">
                    <p>
                        By accessing or using CampusIQ, you acknowledge that you have read, understood, and agree to be bound by
                        these Terms and Conditions. If you are using CampusIQ on behalf of an educational institution, you represent
                        and warrant that you have the authority to bind that institution to these terms.
                    </p>
                    <p>If you do not agree with any part of these terms, you must not access or use CampusIQ.</p>
                </div>
            ),
        },
        {
            id: "definitions",
            title: "2. Definitions",
            content: (
                <div className="space-y-2">
                    <p>Throughout these Terms, we use specific terminology:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>"CampusIQ"</strong> refers to our school management application, including all its features and
                            services.
                        </li>
                        <li>
                            <strong>"Institution"</strong> refers to the school, college, university, or educational organization that
                            has subscribed to CampusIQ.
                        </li>
                        <li>
                            <strong>"Administrator"</strong> refers to users with administrative privileges within CampusIQ.
                        </li>
                        <li>
                            <strong>"Teacher"</strong> refers to faculty members who use CampusIQ for educational purposes.
                        </li>
                        <li>
                            <strong>"Student"</strong> refers to enrolled learners who access CampusIQ.
                        </li>
                        <li>
                            <strong>"Parent/Guardian"</strong> refers to individuals with parental or guardian access to student
                            information.
                        </li>
                        <li>
                            <strong>"Content"</strong> refers to data, text, information, graphics, images, videos, or other materials
                            uploaded to or accessible through CampusIQ.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: "account",
            title: "3. Account Registration and Security",
            content: (
                <div className="space-y-2">
                    <p>
                        To use CampusIQ, you must register for an account. You agree to provide accurate, current, and complete
                        information during the registration process and to update such information to keep it accurate, current, and
                        complete.
                    </p>
                    <p>You are responsible for:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>Restricting access to your account</li>
                        <li>All activities that occur under your account</li>
                        <li>Notifying us immediately of any unauthorized access or use of your account</li>
                    </ul>
                    <p>
                        CampusIQ implements role-based access controls. Your access level and permissions within the system will be
                        determined by your role (Administrator, Teacher, Student, or Parent/Guardian) as assigned by your
                        Institution.
                    </p>
                </div>
            ),
        },
        {
            id: "subscription",
            title: "4. Subscription and Payment",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ offers various subscription plans for educational institutions. The features available to you
                        depend on the subscription plan selected by your Institution.
                    </p>
                    <p>Payment terms:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                        <li>All fees are non-refundable unless otherwise specified</li>
                        <li>We reserve the right to change subscription fees upon reasonable notice</li>
                        <li>Failure to maintain payment may result in service suspension</li>
                    </ul>
                    <p>
                        Educational institutions may be eligible for special pricing. Contact our sales team for more information.
                    </p>
                </div>
            ),
        },
        {
            id: "content",
            title: "5. User Content and Conduct",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ allows users to create, upload, store, and share content. You retain all rights to your content,
                        but grant CampusIQ a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such
                        content solely for the purpose of providing and improving the service.
                    </p>
                    <p>You agree not to use CampusIQ to:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            Upload, transmit, or distribute any content that is unlawful, harmful, threatening, abusive, harassing,
                            defamatory, or otherwise objectionable
                        </li>
                        <li>
                            Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity
                        </li>
                        <li>Engage in any activity that interferes with or disrupts the service</li>
                        <li>Attempt to gain unauthorized access to any portion of CampusIQ</li>
                        <li>
                            Use CampusIQ for any illegal purpose or in violation of any local, state, national, or international law
                        </li>
                        <li>Violate the privacy or academic integrity policies of your Institution</li>
                    </ul>
                    <p>
                        CampusIQ reserves the right to remove any content that violates these terms or is otherwise objectionable.
                    </p>
                </div>
            ),
        },
        {
            id: "data",
            title: "6. Educational Data and FERPA Compliance",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ is designed to help educational institutions comply with the Family Educational Rights and Privacy
                        Act (FERPA) and similar regulations. We act as a "school official" with a "legitimate educational interest"
                        as defined under FERPA when handling student education records.
                    </p>
                    <p>As an educational institution using CampusIQ, you remain responsible for:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Determining what student information is shared with CampusIQ</li>
                        <li>Obtaining appropriate consents from parents/guardians or eligible students</li>
                        <li>Responding to requests to access, correct, or delete student information</li>
                        <li>Ensuring your use of CampusIQ complies with all applicable education privacy laws</li>
                    </ul>
                    <p>
                        CampusIQ will not use student personal information for targeted advertising or to create user profiles for
                        non-educational purposes.
                    </p>
                </div>
            ),
        },
        {
            id: "intellectual",
            title: "7. Intellectual Property Rights",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ and its original content, features, and functionality are owned by us and are protected by
                        international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                    <p>You may not:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Modify, reproduce, or create derivative works based on CampusIQ</li>
                        <li>Frame or mirror any part of CampusIQ without our express written consent</li>
                        <li>Reverse engineer, decompile, or disassemble CampusIQ</li>
                        <li>Access CampusIQ to build a competitive product or service</li>
                        <li>Copy any features, functions, or graphics of CampusIQ</li>
                    </ul>
                    <p>
                        Any feedback, comments, or suggestions you provide regarding CampusIQ may be used by us without any
                        obligation to you.
                    </p>
                </div>
            ),
        },
        {
            id: "third-party",
            title: "8. Third-Party Services and Integrations",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ may integrate with or contain links to third-party services, applications, or websites. These
                        third-party services are governed by their own terms of service and privacy policies.
                    </p>
                    <p>
                        We do not endorse, control, or assume responsibility for any third-party services or content. Your use of
                        such services is at your own risk and subject to their respective terms and policies.
                    </p>
                    <p>
                        CampusIQ offers API integrations with popular educational tools and learning management systems. These
                        integrations are subject to additional terms that will be provided when you enable them.
                    </p>
                </div>
            ),
        },
        {
            id: "termination",
            title: "9. Termination and Data Retention",
            content: (
                <div className="space-y-2">
                    <p>
                        We may terminate or suspend your access to CampusIQ immediately, without prior notice or liability, for any
                        reason, including if you breach these Terms.
                    </p>
                    <p>Upon termination:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Your right to use CampusIQ will immediately cease</li>
                        <li>Your Institution will have 30 days to export any data before it is permanently deleted</li>
                        <li>We may retain certain information as required by law or for legitimate business purposes</li>
                    </ul>
                    <p>
                        Educational institutions may request an extended data retention period by contacting our support team before
                        the subscription ends.
                    </p>
                </div>
            ),
        },
        {
            id: "warranty",
            title: "10. Disclaimer of Warranties",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ is provided "as is" and "as available" without warranties of any kind, either express or implied,
                        including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or
                        non-infringement.
                    </p>
                    <p>We do not warrant that:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>CampusIQ will function uninterrupted, secure, or available at any particular time or location</li>
                        <li>Any errors or defects will be corrected</li>
                        <li>CampusIQ is free of viruses or other harmful components</li>
                        <li>The results of using CampusIQ will meet your requirements</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "liability",
            title: "11. Limitation of Liability",
            content: (
                <div className="space-y-2">
                    <p>
                        To the maximum extent permitted by law, in no event shall CampusIQ, its directors, employees, partners,
                        agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive
                        damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                        resulting from:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Your access to or use of or inability to access or use CampusIQ</li>
                        <li>Any conduct or content of any third party on CampusIQ</li>
                        <li>Any content obtained from CampusIQ</li>
                        <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                    </ul>
                    <p>
                        Our total liability for any claim arising out of or relating to these Terms or CampusIQ shall not exceed the
                        amount paid by your Institution to us during the 12 months preceding the claim.
                    </p>
                </div>
            ),
        },
        {
            id: "indemnification",
            title: "12. Indemnification",
            content: (
                <div className="space-y-2">
                    <p>
                        You agree to defend, indemnify, and hold harmless CampusIQ, its parent company, officers, directors,
                        employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including,
                        without limitation, reasonable legal and accounting fees, arising out of or in any way connected with:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Your access to or use of CampusIQ</li>
                        <li>Your violation of these Terms</li>
                        <li>
                            Your violation of any third-party right, including without limitation any intellectual property right,
                            publicity, confidentiality, property, or privacy right
                        </li>
                        <li>Any content you upload, post, or transmit through CampusIQ</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "governing-law",
            title: "13. Governing Law and Dispute Resolution",
            content: (
                <div className="space-y-2">
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without
                        regard to its conflict of law provisions.
                    </p>
                    <p>
                        Any dispute arising from or relating to these Terms or CampusIQ shall first be attempted to be resolved
                        through informal negotiation. If the dispute cannot be resolved through negotiation, it shall be submitted
                        to mediation in accordance with [Relevant Mediation Rules].
                    </p>
                    <p>
                        If mediation is unsuccessful, the dispute shall be resolved through binding arbitration in accordance with
                        the rules of [Relevant Arbitration Association]. The arbitration shall take place in [Your City,
                        State/Province].
                    </p>
                </div>
            ),
        },
        {
            id: "changes",
            title: "14. Changes to Terms",
            content: (
                <div className="space-y-2">
                    <p>
                        We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                        provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
                        will be determined at our sole discretion.
                    </p>
                    <p>
                        By continuing to access or use CampusIQ after those revisions become effective, you agree to be bound by the
                        revised terms. If you do not agree to the new terms, you must stop using CampusIQ.
                    </p>
                    <p>
                        We will notify Institutions of any material changes to these Terms via email to the primary administrator
                        account.
                    </p>
                </div>
            ),
        },
        {
            id: "contact",
            title: "15. Contact Information",
            content: (
                <div className="space-y-2">
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p className="mt-2">
                        CampusIQ
                        <br />
                        [Your Address]
                        <br />
                        Email: legal@campusiq.com
                        <br />
                        Phone: [Your Phone Number]
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
                "Updated FERPA compliance section",
                "Added section on AI/ML usage",
                "Clarified data retention policies",
            ],
        },
        {
            date: "January 10, 2023",
            version: "2.0",
            changes: [
                "Major revision of all terms",
                "Added section on third-party integrations",
                "Enhanced security requirements",
            ],
        },
        {
            date: "June 5, 2022",
            version: "1.0",
            changes: ["Initial terms and conditions"],
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

    const tocItems = termsItems.map((item) => ({
        id: item.id,
        title: item.title,
    }))

    return (
        <div className="min-h-screen bg-background mt-16 print:bg-white">
            <PageHeader title="CampusIQ Terms and Conditions" lastUpdated="April 06, 2025" onSearch={handleSearch} />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <Card className="p-6 shadow-sm">
                        <p className="mb-6">
                            Welcome to CampusIQ, the comprehensive school management application designed to streamline educational
                            operations. These Terms and Conditions govern your use of our application and services. Please read them
                            carefully.
                        </p>

                        <TableOfContents items={tocItems} />

                        <div ref={contentRef} className="space-y-4">
                            {termsItems.map((item) => (
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

                        <VersionHistory versions={versionHistory} />
                    </Card>
                </div>
            </main>
        </div>
    )
}


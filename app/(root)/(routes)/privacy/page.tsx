"use client"

import { useState, useRef, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-content"
import { VersionHistory } from "@/components/version-history"

export default function PrivacyPolicy() {
    const [searchTerm, setSearchTerm] = useState("")
    const contentRef = useRef<HTMLDivElement>(null)

    const privacyItems = [
        {
            id: "information-collected",
            title: "1. Information We Collect",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ collects various types of information to provide and improve our services for educational
                        institutions. The information we collect includes:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Account Information:</strong> Name, email address, password, profile picture, role (administrator,
                            teacher, student, or parent/guardian), and contact details.
                        </li>
                        <li>
                            <strong>Educational Information:</strong> Course enrollments, grades, attendance records, assignments,
                            academic performance data, and other education-related information.
                        </li>
                        <li>
                            <strong>Usage Information:</strong> How you interact with CampusIQ, including features used, time spent,
                            and actions taken within the application.
                        </li>
                        <li>
                            <strong>Device Information:</strong> Device type, operating system, browser type, IP address, and other
                            technical information about the devices you use to access CampusIQ.
                        </li>
                        <li>
                            <strong>Communication Information:</strong> Messages, comments, and other communications sent through
                            CampusIQ.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: "information-use",
            title: "2. How We Use Your Information",
            content: (
                <div className="space-y-2">
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Providing and maintaining CampusIQ services</li>
                        <li>Processing and completing transactions</li>
                        <li>Sending administrative information, such as updates, security alerts, and support messages</li>
                        <li>Personalizing your experience and delivering content relevant to your role</li>
                        <li>Analyzing usage patterns to improve our services</li>
                        <li>Detecting, preventing, and addressing technical issues</li>
                        <li>Complying with legal obligations</li>
                    </ul>
                    <p>
                        For students under 13 years of age, we limit our data collection and use to what is necessary for
                        educational purposes and in compliance with the Children's Online Privacy Protection Act (COPPA).
                    </p>
                </div>
            ),
        },
        {
            id: "information-sharing",
            title: "3. How We Share Information",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ is designed to facilitate information sharing within educational contexts. We share information as
                        follows:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Within Your Institution:</strong> Information is shared according to role-based permissions set by
                            your institution's administrators.
                        </li>
                        <li>
                            <strong>Service Providers:</strong> We may share information with third-party vendors who help us provide
                            and improve our services.
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, legal
                            process, or governmental request.
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, user
                            information may be transferred as a business asset.
                        </li>
                    </ul>
                    <p>We do not sell or rent personal information to third parties for marketing purposes.</p>
                </div>
            ),
        },
        {
            id: "data-security",
            title: "4. Data Security",
            content: (
                <div className="space-y-2">
                    <p>We implement robust security measures to protect your information, including:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments and penetration testing</li>
                        <li>Access controls and authentication mechanisms</li>
                        <li>Physical security measures for our servers and facilities</li>
                        <li>Employee training on data security and privacy</li>
                        <li>Incident response procedures</li>
                    </ul>
                    <p>
                        While we strive to protect your information, no method of transmission over the Internet or electronic
                        storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                </div>
            ),
        },
        {
            id: "data-retention",
            title: "5. Data Retention",
            content: (
                <div className="space-y-2">
                    <p>
                        We retain information for as long as necessary to provide our services and fulfill the purposes outlined in
                        this Privacy Policy, unless a longer retention period is required or permitted by law.
                    </p>
                    <p>For educational institutions:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Active account data is retained for the duration of your subscription</li>
                        <li>After subscription termination, your data will be available for export for 30 days</li>
                        <li>After the 30-day period, data will be deleted from our active systems</li>
                        <li>Backup data may be retained for up to 90 days after deletion from active systems</li>
                    </ul>
                    <p>
                        Educational institutions can request specific data retention schedules to comply with their record-keeping
                        requirements.
                    </p>
                </div>
            ),
        },
        {
            id: "ferpa-compliance",
            title: "6. FERPA and COPPA Compliance",
            content: (
                <div className="space-y-2">
                    <p>CampusIQ is designed to help educational institutions comply with:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Family Educational Rights and Privacy Act (FERPA):</strong> We act as a "school official" with a
                            "legitimate educational interest" as defined under FERPA when handling student education records.
                        </li>
                        <li>
                            <strong>Children's Online Privacy Protection Act (COPPA):</strong> For users under 13, we collect only
                            information necessary for educational purposes and with appropriate parental consent obtained by the
                            educational institution.
                        </li>
                    </ul>
                    <p>Educational institutions using CampusIQ remain responsible for:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Obtaining appropriate consents from parents/guardians or eligible students</li>
                        <li>Responding to requests to access, correct, or delete student information</li>
                        <li>Ensuring their use of CampusIQ complies with applicable education privacy laws</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "ai-ml",
            title: "7. Artificial Intelligence and Machine Learning",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ uses artificial intelligence (AI) and machine learning (ML) technologies to enhance our services in
                        the following ways:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Providing personalized learning recommendations</li>
                        <li>Identifying students who may need additional support</li>
                        <li>Detecting potential academic integrity issues</li>
                        <li>Optimizing administrative workflows</li>
                        <li>Improving the overall user experience</li>
                    </ul>
                    <p>Our AI/ML systems:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Process data in accordance with this Privacy Policy</li>
                        <li>Do not make automated decisions with significant effects without human oversight</li>
                        <li>Are regularly evaluated for accuracy, fairness, and potential bias</li>
                        <li>Can be disabled at the institution level upon request</li>
                    </ul>
                </div>
            ),
        },
        {
            id: "cookies",
            title: "8. Cookies and Tracking Technologies",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ uses cookies and similar tracking technologies to enhance your experience, analyze usage, and
                        improve our services.
                    </p>
                    <p>We use the following types of cookies:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Essential Cookies:</strong> Required for the operation of CampusIQ, such as session management and
                            security.
                        </li>
                        <li>
                            <strong>Analytical Cookies:</strong> Help us understand how users interact with CampusIQ, allowing us to
                            improve functionality.
                        </li>
                        <li>
                            <strong>Functional Cookies:</strong> Enable enhanced functionality and personalization.
                        </li>
                    </ul>
                    <p>
                        You can control cookies through your browser settings. However, disabling certain cookies may limit your
                        ability to use some features of CampusIQ.
                    </p>
                </div>
            ),
        },
        {
            id: "international-transfers",
            title: "9. International Data Transfers",
            content: (
                <div className="space-y-2">
                    <p>
                        CampusIQ operates globally, which may involve transferring and processing data in countries outside your
                        own. We ensure that any international data transfers comply with applicable laws and regulations.
                    </p>
                    <p>
                        For transfers from the European Economic Area (EEA), United Kingdom, or Switzerland to countries not deemed
                        to provide an adequate level of data protection, we implement appropriate safeguards, such as:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Standard Contractual Clauses approved by the European Commission</li>
                        <li>Binding Corporate Rules for transfers to group companies</li>
                        <li>Derogations under Article 49 of the GDPR where applicable</li>
                    </ul>
                    <p>
                        Educational institutions can request information about our data transfer mechanisms by contacting our
                        privacy team.
                    </p>
                </div>
            ),
        },
        {
            id: "user-rights",
            title: "10. Your Rights and Choices",
            content: (
                <div className="space-y-2">
                    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Accessing your personal information</li>
                        <li>Correcting inaccurate or incomplete information</li>
                        <li>Deleting your personal information</li>
                        <li>Restricting or objecting to processing</li>
                        <li>Data portability</li>
                        <li>Withdrawing consent</li>
                    </ul>
                    <p>
                        For students, parents/guardians should contact their educational institution to exercise these rights, as
                        the institution controls the student data in CampusIQ.
                    </p>
                    <p>
                        For teachers and administrators, you can exercise many of these rights directly through your account
                        settings or by contacting our privacy team.
                    </p>
                </div>
            ),
        },
        {
            id: "policy-changes",
            title: "11. Changes to This Privacy Policy",
            content: (
                <div className="space-y-2">
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                        operational, legal, or regulatory reasons.
                    </p>
                    <p>If we make material changes, we will:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Notify educational institutions via email to the primary administrator account</li>
                        <li>Post a notice on our website and within the CampusIQ application</li>
                        <li>Update the "Last Updated" date at the top of this Privacy Policy</li>
                    </ul>
                    <p>
                        We encourage you to review this Privacy Policy periodically to stay informed about our information
                        practices.
                    </p>
                </div>
            ),
        },
        {
            id: "contact",
            title: "12. Contact Us",
            content: (
                <div className="space-y-2">
                    <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
                        please contact us at:
                    </p>
                    <p className="mt-2">
                        CampusIQ Privacy Team
                        <br />
                        [Your Address]
                        <br />
                        Email: privacy@campusiq.com
                        <br />
                        Phone: [Your Phone Number]
                    </p>
                    <p>For data protection inquiries, you can contact our Data Protection Officer at dpo@campusiq.com.</p>
                </div>
            ),
        },
    ]

    const versionHistory = [
        {
            date: "April 15, 2023",
            version: "2.1",
            changes: [
                "Added AI/ML section",
                "Enhanced FERPA compliance details",
                "Updated international data transfer information",
            ],
        },
        {
            date: "January 10, 2023",
            version: "2.0",
            changes: ["Major revision of all privacy terms", "Added section on data retention", "Enhanced cookie policy"],
        },
        {
            date: "June 5, 2022",
            version: "1.0",
            changes: ["Initial privacy policy"],
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

    const tocItems = privacyItems.map((item) => ({
        id: item.id,
        title: item.title,
    }))

    return (
        <div className="mt-16 bg-background print:bg-white">
            <PageHeader title="CampusIQ Privacy Policy" lastUpdated="April 05, 2025" onSearch={handleSearch} />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <Card className="p-6 shadow-sm">
                        <p className="mb-6">
                            At CampusIQ, we are committed to protecting your privacy and ensuring the security of your information.
                            This Privacy Policy explains how we collect, use, share, and protect information in relation to our school
                            management application.
                        </p>

                        <TableOfContents items={tocItems} />

                        <div ref={contentRef} className="space-y-4">
                            {privacyItems.map((item) => (
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


"use client"

import { useState } from "react"
import { ScheduleDemoDialog } from "@/components/schedule-demo-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle2, Clock, FileCheck, Globe, Headphones, Play, Users } from "lucide-react"
import Link from "next/link"

export default function ScheduleDemoPage() {
  const [showDemoDialog, setShowDemoDialog] = useState(false)
  const [selectedDemoType, setSelectedDemoType] = useState<string | null>(null)

  const handleScheduleDemo = (demoType: string) => {
    setSelectedDemoType(demoType)
    setShowDemoDialog(true)
  }

  // Demo types with descriptions
  const demoTypes = [
    {
      id: "overview",
      title: "Product Overview",
      description: "A comprehensive tour of CampusIQ's core features and capabilities",
      duration: 30,
      icon: <Globe className="h-5 w-5" />,
      benefits: [
        "Complete platform walkthrough",
        "Core functionality demonstration",
        "High-level overview of all modules",
        "Perfect for initial evaluation",
      ],
    },
    {
      id: "admin",
      title: "Administrator Demo",
      description: "Focused on school administration, user management, and reporting",
      duration: 45,
      icon: <Users className="h-5 w-5" />,
      benefits: [
        "User management and permissions",
        "Advanced reporting capabilities",
        "System configuration options",
        "Security and compliance features",
      ],
    },
    {
      id: "custom",
      title: "Custom Demo",
      description: "Tailored to your specific requirements and use cases",
      duration: 60,
      icon: <CheckCircle2 className="h-5 w-5" />,
      benefits: [
        "Focused on your specific needs",
        "Integration possibilities",
        "Implementation planning",
        "Pricing and deployment discussion",
      ],
    },
  ]

  // Testimonials
  const testimonials = [
    {
      quote:
        "The demo was incredibly helpful in showing us exactly how CampusIQ could solve our administrative challenges. We implemented the system within a month of the demo.",
      author: "Sarah Johnson",
      title: "Principal, Westlake High School",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "Our custom demo addressed all our specific requirements. The product specialist was knowledgeable and showed us exactly how to achieve our goals with CampusIQ.",
      author: "Michael Chen",
      title: "IT Director, Riverdale School District",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "The demo was tailored perfectly to our university's needs. We appreciated the detailed walkthrough of the advanced reporting features.",
      author: "Dr. Emily Rodriguez",
      title: "Dean of Students, Lakeside University",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">See CampusIQ in Action</h1>
              <p className="text-xl text-blue-100">
                Schedule a personalized demo with our product specialists and discover how CampusIQ can transform your
                educational institution.
              </p>
              <div className="flex flex-wrap gap-4">
               <ScheduleDemoDialog />
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  Watch Video Overview
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Most demos scheduled within 24 hours</span>
              </div>
            </div>
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 bg-blue-800 bg-opacity-20 rounded-lg backdrop-blur-sm border border-blue-400 border-opacity-20 shadow-xl">
                <div className="absolute top-4 left-4 right-4 h-8 bg-gray-800 bg-opacity-30 rounded flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="absolute top-16 left-4 right-4 bottom-4 bg-white bg-opacity-10 rounded overflow-hidden">
                  <div className="grid grid-cols-4 h-full">
                    <div className="col-span-1 border-r border-white border-opacity-10 p-2">
                      <div className="h-8 w-full bg-white bg-opacity-20 rounded mb-2"></div>
                      <div className="h-4 w-3/4 bg-white bg-opacity-10 rounded mb-2"></div>
                      <div className="h-4 w-full bg-white bg-opacity-10 rounded mb-2"></div>
                      <div className="h-4 w-2/3 bg-white bg-opacity-10 rounded mb-2"></div>
                      <div className="h-4 w-full bg-white bg-opacity-10 rounded mb-2"></div>
                    </div>
                    <div className="col-span-3 p-2">
                      <div className="h-8 w-full bg-white bg-opacity-20 rounded mb-4"></div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="h-24 bg-white bg-opacity-10 rounded"></div>
                        <div className="h-24 bg-white bg-opacity-10 rounded"></div>
                      </div>
                      <div className="h-32 w-full bg-white bg-opacity-10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Demo Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the demo type that best fits your needs and schedule a time with our product specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoTypes.map((demo) => (
            <Card
              key={demo.id}
              className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-100"
            >
              <CardHeader className="pb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-blue-600">{demo.icon}</div>
                </div>
                <CardTitle className="text-xl">{demo.title}</CardTitle>
                <CardDescription>{demo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{demo.duration} minutes</span>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-sm">What you'll see:</p>
                  <ul className="space-y-2">
                    {demo.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleScheduleDemo(demo.id)}>
                  Schedule {demo.title}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Demo Process Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined demo process makes it easy to see CampusIQ in action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="relative">
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></div>
                </div>
                <h3 className="text-lg font-medium mb-2">1. Schedule</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Choose a demo type and select a convenient time slot from our calendar
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div className="relative">
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></div>
                </div>
                <h3 className="text-lg font-medium mb-2">2. Confirm</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Receive a confirmation email with meeting details and calendar invitation
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-blue-600" />
              </div>
              <div className="relative">
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></div>
                </div>
                <h3 className="text-lg font-medium mb-2">3. Experience</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Join the video call and see CampusIQ in action with a product specialist
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">4. Follow-up</h3>
              <p className="text-gray-600 text-sm">
                Receive personalized resources and next steps based on your specific needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from educational institutions that have transformed their operations with CampusIQ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your educational institution?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of schools, colleges, and universities that have improved their operations with CampusIQ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowDemoDialog(true)}
            >
              Schedule Your Demo
            </Button>
            <Link href="/support" passHref>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Common questions about our demo process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does a typical demo last?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our demos range from 30 to 60 minutes depending on the type you select. Product overviews are
                  typically 30 minutes, administrator demos are 45 minutes, and custom demos can last up to 60 minutes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I invite colleagues to the demo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We encourage you to invite relevant stakeholders from your institution. You can specify the number of
                  attendees when scheduling your demo, and the calendar invitation can be forwarded to your team.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What do I need to prepare for the demo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No preparation is required, but we recommend having a list of questions or specific challenges you'd
                  like addressed. This helps our product specialists tailor the demo to your needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Will the demo be recorded?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We don't automatically record demos, but if you'd like a recording for colleagues who couldn't attend,
                  we're happy to provide one upon request. Just let your product specialist know at the beginning of the
                  session.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens after the demo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  After the demo, you'll receive a follow-up email with additional resources, documentation, and next
                  steps. Our sales team will also reach out to discuss implementation options and answer any remaining
                  questions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I get pricing information during the demo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, our product specialists can provide general pricing information during the demo. For a detailed
                  quote tailored to your institution's size and needs, our sales team will follow up after the demo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}


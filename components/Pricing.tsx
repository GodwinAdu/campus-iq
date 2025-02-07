"use client"
import { motion } from "framer-motion"
import { Button } from "./ui/moving-border"
import { SparklesCore } from "./ui/sparkles"

const plans = [
  {
    name: "Basic",
    price: "$99",
    color: "from-blue-400 to-blue-600",
    features: [
      "Student Information System",
      "Basic Reporting",
      "Email Support",
      "Attendance Tracking",
      "Grade Book",
      "Parent Portal",
      "Mobile App Access",
      "5GB Cloud Storage",
      "Basic API Access",
      "Community Forum Support",
    ],
  },
  {
    name: "Pro",
    price: "$199",
    color: "from-purple-400 to-purple-600",
    features: [
      "All Basic features",
      "Advanced Reporting",
      "Curriculum Management",
      "Financial Tools",
      "Priority Support",
      "Online Assessment Tools",
      "Learning Management System",
      "50GB Cloud Storage",
      "Advanced API Access",
      "Dedicated Account Manager",
      "Custom Branding",
      "Data Analytics Dashboard",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    color: "from-green-400 to-green-600",
    features: [
      "All Pro features",
      "Custom Integrations",
      "White-label Solution",
      "On-premise Deployment Option",
      "24/7 Premium Support",
      "Unlimited Cloud Storage",
      "AI-powered Insights",
      "Multi-school Management",
      "Advanced Security Features",
      "Custom Feature Development",
      "Dedicated Training Sessions",
      "Annual Strategy Consultation",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Choose Your Plan</h2>
        <p className="text-xl text-gray-300 text-center mb-12">Flexible pricing options to suit schools of all sizes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${plan.color} p-1`}
            >
              <div className="absolute inset-0">
                <SparklesCore
                  id={`sparkles-${index}`}
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>
              <div className="relative bg-gray-800 p-8 rounded-lg h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6 text-white">{plan.price}</p>
                  <ul className="mb-8 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  borderRadius="0.5rem"
                  className="w-full bg-white text-gray-800 hover:bg-gray-100 transition duration-300"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


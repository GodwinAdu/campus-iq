"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/moving-border";
import { SparklesCore } from "./ui/sparkles";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: 5,
    color: "from-blue-400 to-blue-600",
    features: [
      "Attendance Tracking",
      "Canteen Management",
      "Class Management",
      "Community Forum Support",
      "Deposit and Expenses Tracking",
      "Email Support",
      "Employees Information System",
      "Inventory Information",
      "Parent Portal",
      "Students Information System",
      "Student Portal",
      "System Configuration",
      "Time Table Information",
      "Unlimited Cloud Storage",
    ],
  },
  {
    name: "Pro",
    price: 10,
    color: "from-purple-400 to-purple-600",
    features: [
      "All Basic features",
      "Exams Management",
      "Fees Management",
      "Health Record Management",
      "Hostels Management",
      "HR & Payroll Management",
      "Library Management",
      "Virtual Learning",
      "Transports Management",
      "Advanced API Access",
      "Dedicated Account Manager",
      "24/7 Premium Support",
    ],
  },
  {
    name: "Enterprise",
    price: 0,
    color: "from-green-400 to-green-600",
    features: [
      "All Basic features",
      "All Pro features",
      "Custom Integrations",
      "White-label Solution",
      "On-premise Deployment Option",
      "24/7 Premium Support",
      "AI-powered Insights",
      "Multi-school Management",
      "Advanced Security Features",
      "Custom Feature Development",
      "Dedicated Training Sessions",
      "Annual Strategy Consultation",
    ],
  },
];

type PeriodOption = "monthly" | "yearly" | "fourMonth";

export default function Pricing() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>("monthly");

  const getPeriodMultiplier = (period: PeriodOption) => {
    switch (period) {
      case "yearly":
        return 12;
      case "fourMonth":
        return 4;
      default:
        return 1;
    }
  };

  const getDiscountedPrice = (basePrice: number, period: PeriodOption) => {
    const multiplier = getPeriodMultiplier(period);
    let totalPrice = basePrice * multiplier;

    if (period === "yearly") {
      totalPrice *= 0.9; // 10% discount for yearly
    } else if (period === "fourMonth") {
      totalPrice *= 0.95; // 5% discount for 4-month term
    }

    return totalPrice.toFixed(2);
  };

  const getPeriodLabel = (period: PeriodOption) => {
    switch (period) {
      case "yearly":
        return "/year";
      case "fourMonth":
        return "/4 months";
      default:
        return "/month";
    }
  };
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Choose Your Plan
        </h2>
        <p className="text-xl text-gray-300 text-center space-y-2">
          Flexible pricing options to suit schools of all sizes <br />
          <span className="text-white shadow-2xl font-extrabold text-xl bg-gradient-to-r from-primary to-blue-500 px-2 py-1 rounded-md ">
            Price per Student
          </span>
        </p>

        <div className="py-6 flex justify-center">
          <RadioGroup
            defaultValue="monthly"
            onValueChange={(value) => setSelectedPeriod(value as PeriodOption)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="yearly" />
              <Label htmlFor="yearly">Yearly (10% off)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fourMonth" id="fourMonth" />
              <Label htmlFor="fourMonth">Term (5% off)</Label>
            </div>
          </RadioGroup>
        </div>
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
                  minsize={0.4}
                  maxsize={1}
                  particledensity={100}
                  className="w-full h-full"
                  particlecolor="#FFFFFF"
                />
              </div>
              <div className="relative bg-gray-800 p-8 rounded-lg h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    {plan.name}{" "}
                    {plan.name === "Pro" && (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
                        Recommended
                      </span>
                    )}
                  </h3>

                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price === 0 ? "Custom" : `Gh₵${getDiscountedPrice(plan.price, selectedPeriod)}`}
                    </span>
                    <span className={cn("text-sm",)}>
                      {plan.price !== 0 && getPeriodLabel(selectedPeriod)}
                    </span>
                  </p>
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <Button
                  borderRadius="0.5rem"
                  className="w-full bg-white text-gray-800 hover:bg-gray-100 transition duration-300"
                >
                  Get Started
                </Button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

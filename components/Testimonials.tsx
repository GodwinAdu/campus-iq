"use client"

import { InfiniteMovingCards } from "./ui/infinite-moving-cards"

const testimonials = [
  {
    quote: "EduManage Pro has transformed how we run our school. It's intuitive and comprehensive!",
    name: "Dr. Sarah Johnson",
    title: "Principal, Westfield High School",
  },
  {
    quote: "The analytics feature has given us invaluable insights into student performance trends.",
    name: "Mark Thompson",
    title: "Head of Academics, Greenwood Academy",
  },
  {
    quote: "Parent communication has never been easier. It's a game-changer for our school community.",
    name: "Lisa Chen",
    title: "PTA President, Sunnyvale Elementary",
  },
  {
    quote: "The financial management tools have streamlined our budgeting process significantly.",
    name: "Robert Alvarez",
    title: "CFO, Metropolitan School District",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">What School Leaders Say</h2>
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </div>
    </section>
  )
}


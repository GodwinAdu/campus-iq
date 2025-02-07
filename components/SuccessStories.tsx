"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const stories = [
  {
    name: "Oakridge International School",
    location: "Bangalore, India",
    quote:
      "EduManage Pro revolutionized our administrative processes, saving us countless hours and improving communication with parents.",
    image: "/success-story-1.jpg",
  },
  {
    name: "St. Patrick's High School",
    location: "New York, USA",
    quote: "The AI-powered scheduling feature has been a game-changer for our complex timetabling needs.",
    image: "/success-story-2.jpg",
  },
  {
    name: "Cambridge International School",
    location: "Dubai, UAE",
    quote:
      "EduManage Pro's multilingual support has been crucial in serving our diverse student body and parent community.",
    image: "/success-story-3.jpg",
  },
]

export const SuccessStories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Success Stories</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex-1"
            >
              <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{story.name}</h3>
                <p className="text-gray-600 mb-4">{story.location}</p>
                <blockquote className="italic text-gray-700">"{story.quote}"</blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


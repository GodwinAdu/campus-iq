"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blog" },
  { name: "Features", link: "/features" },
  { name: "Demo", link: "/demo" },
  { name: "Pricing", link: "/pricing" },
  { name: "Contact", link: "/contact" },
  { name: "Docs", link: "/documentation" },
]

export default function AdvancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Campus<span className="text-blue-500">IQ</span>
        </Link>
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.link} className="text-white hover:text-blue-400 transition duration-300">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Link href="/sign-up">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={cn("absolute top-16 inset-x-0 bg-black  py-4", isOpen ? "block" : "hidden")}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="block text-white hover:text-blue-400 py-2 px-4 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <div className="px-4 py-2">
          <Link href="/sign-up">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </motion.div>
    </nav>
  )
}


"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...tabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-20",
        containerClassName,
      )}
    >
      <div className="w-full md:w-48 flex flex-col gap-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab.value}
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            className={cn(
              "px-4 py-2 rounded-md text-sm transition-colors",
              tab.value === active.value
                ? activeTabClassName || "bg-gray-700 text-white"
                : tabClassName || "text-gray-400 hover:text-gray-300",
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <motion.div
        key={active.value}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("w-full h-full", contentClassName)}
      >
        {active.content}
      </motion.div>
    </div>
  )
}


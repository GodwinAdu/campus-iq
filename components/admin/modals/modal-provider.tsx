"use client"

import { useEffect, useState } from "react"
import { HelpModal } from "./help-modal"
import { MoodTracker } from "./mood-tracker-modal"
import { ActivityTracker } from "./activity-tracker-modal"
import { BehaviorTracker } from "./behavior-tracker-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <BehaviorTracker />
            <ActivityTracker />
            <MoodTracker />
            <HelpModal />
        </>
    )
}


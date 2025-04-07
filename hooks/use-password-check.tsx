"use client"

import { useState, useEffect } from "react"

export function usePasswordStrength(password: string) {
    const [strength, setStrength] = useState(0)
    const [level, setLevel] = useState<"weak" | "medium" | "strong">("weak")

    useEffect(() => {
        if (!password) {
            setStrength(0)
            setLevel("weak")
            return
        }

        let score = 0

        // Length check
        if (password.length >= 8) score += 20

        // Character type checks
        if (password.match(/[A-Z]/)) score += 20
        if (password.match(/[a-z]/)) score += 20
        if (password.match(/[0-9]/)) score += 20
        if (password.match(/[^A-Za-z0-9]/)) score += 20

        setStrength(score)

        // Set level based on score
        if (score < 40) setLevel("weak")
        else if (score < 80) setLevel("medium")
        else setLevel("strong")
    }, [password])

    return { strength, level }
}


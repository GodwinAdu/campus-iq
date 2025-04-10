"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface KeyboardComponentProps {
    activeKeys: string[]
}

interface KeyProps {
    label: string
    width?: string
    isActive: boolean
}

function Key({ label, width = "w-8", isActive }: KeyProps) {
    return (
        <motion.div
            className={`${width} h-7 rounded-md border ${isActive ? "bg-primary text-primary-foreground" : "bg-background"
                } flex items-center justify-center text-[10px] font-medium shadow-sm transition-colors duration-200`}
            initial={{ scale: 1 }}
            animate={{
                scale: isActive ? 0.95 : 1,
                boxShadow: isActive ? "0px 0px 8px rgba(var(--primary), 0.5)" : "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
            whileHover={{ scale: 0.98 }}
        >
            {label}
        </motion.div>
    )
}

export function KeyboardComponent({ activeKeys }: KeyboardComponentProps) {
    const [normalizedActiveKeys, setNormalizedActiveKeys] = useState<string[]>([])
    const [detectedKeys, setDetectedKeys] = useState<string[]>([])

    // Normalize key names for display
    useEffect(() => {
        const normalized = activeKeys.map((key) => {
            // Handle special cases
            if (key === "+") return "Plus"
            if (key === "-") return "Minus"
            if (key === "\\") return "Backslash"
            return key
        })
        setNormalizedActiveKeys(normalized)
    }, [activeKeys])

    // Listen for actual key presses
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault()

            const key = e.key === " " ? "Space" : e.key

            setDetectedKeys((prev) => {
                if (!prev.includes(key)) {
                    return [...prev, key]
                }
                return prev
            })
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key === " " ? "Space" : e.key

            setDetectedKeys((prev) => prev.filter((k) => k !== key))
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    const isKeyActive = (key: string) => {
        return normalizedActiveKeys.includes(key) || detectedKeys.includes(key)
    }

    return (
        <div className="flex flex-col gap-0.5 rounded-lg border bg-muted/40 p-1.5">
            {/* Row 1: Function keys */}
            <div className="flex gap-0.5">
                <Key label="Esc" width="w-8" isActive={isKeyActive("Escape") || isKeyActive("Esc")} />
                <div className="flex-1" />
                <Key label="F1" width="w-6" isActive={isKeyActive("F1")} />
                <Key label="F2" width="w-6" isActive={isKeyActive("F2")} />
                <Key label="F3" width="w-6" isActive={isKeyActive("F3")} />
                <Key label="F4" width="w-6" isActive={isKeyActive("F4")} />
                <div className="w-1" />
                <Key label="F5" width="w-6" isActive={isKeyActive("F5")} />
                <Key label="F6" width="w-6" isActive={isKeyActive("F6")} />
                <Key label="F7" width="w-6" isActive={isKeyActive("F7")} />
                <Key label="F8" width="w-6" isActive={isKeyActive("F8")} />
                <div className="w-1" />
                <Key label="F9" width="w-6" isActive={isKeyActive("F9")} />
                <Key label="F10" width="w-6" isActive={isKeyActive("F10")} />
                <Key label="F11" width="w-6" isActive={isKeyActive("F11")} />
                <Key label="F12" width="w-6" isActive={isKeyActive("F12")} />
            </div>

            {/* Row 2: Numbers */}
            <div className="flex gap-0.5">
                <Key label="`" isActive={isKeyActive("`") || isKeyActive("Backquote")} />
                <Key label="1" isActive={isKeyActive("1")} />
                <Key label="2" isActive={isKeyActive("2")} />
                <Key label="3" isActive={isKeyActive("3")} />
                <Key label="4" isActive={isKeyActive("4")} />
                <Key label="5" isActive={isKeyActive("5")} />
                <Key label="6" isActive={isKeyActive("6")} />
                <Key label="7" isActive={isKeyActive("7")} />
                <Key label="8" isActive={isKeyActive("8")} />
                <Key label="9" isActive={isKeyActive("9")} />
                <Key label="0" isActive={isKeyActive("0")} />
                <Key label="-" isActive={isKeyActive("Minus") || isKeyActive("-")} />
                <Key label="=" isActive={isKeyActive("=") || isKeyActive("Equal")} />
                <Key label="Back" width="w-12" isActive={isKeyActive("Backspace")} />
            </div>

            {/* Row 3: QWERTY */}
            <div className="flex gap-0.5">
                <Key label="Tab" width="w-11" isActive={isKeyActive("Tab")} />
                <Key label="Q" isActive={isKeyActive("Q") || isKeyActive("q")} />
                <Key label="W" isActive={isKeyActive("W") || isKeyActive("w")} />
                <Key label="E" isActive={isKeyActive("E") || isKeyActive("e")} />
                <Key label="R" isActive={isKeyActive("R") || isKeyActive("r")} />
                <Key label="T" isActive={isKeyActive("T") || isKeyActive("t")} />
                <Key label="Y" isActive={isKeyActive("Y") || isKeyActive("y")} />
                <Key label="U" isActive={isKeyActive("U") || isKeyActive("u")} />
                <Key label="I" isActive={isKeyActive("I") || isKeyActive("i")} />
                <Key label="O" isActive={isKeyActive("O") || isKeyActive("o")} />
                <Key label="P" isActive={isKeyActive("P") || isKeyActive("p")} />
                <Key label="[" isActive={isKeyActive("[") || isKeyActive("BracketLeft")} />
                <Key label="]" isActive={isKeyActive("]") || isKeyActive("BracketRight")} />
                <Key label="\" width="w-9" isActive={isKeyActive("Backslash") || isKeyActive("\\")} />
            </div>

            {/* Row 4: ASDF */}
            <div className="flex gap-0.5">
                <Key label="Caps" width="w-12" isActive={isKeyActive("CapsLock")} />
                <Key label="A" isActive={isKeyActive("A") || isKeyActive("a")} />
                <Key label="S" isActive={isKeyActive("S") || isKeyActive("s")} />
                <Key label="D" isActive={isKeyActive("D") || isKeyActive("d")} />
                <Key label="F" isActive={isKeyActive("F") || isKeyActive("f")} />
                <Key label="G" isActive={isKeyActive("G") || isKeyActive("g")} />
                <Key label="H" isActive={isKeyActive("H") || isKeyActive("h")} />
                <Key label="J" isActive={isKeyActive("J") || isKeyActive("j")} />
                <Key label="K" isActive={isKeyActive("K") || isKeyActive("k")} />
                <Key label="L" isActive={isKeyActive("L") || isKeyActive("l")} />
                <Key label=";" isActive={isKeyActive(";") || isKeyActive("Semicolon")} />
                <Key label="'" isActive={isKeyActive("'") || isKeyActive("Quote")} />
                <Key label="Enter" width="w-12" isActive={isKeyActive("Enter")} />
            </div>

            {/* Row 5: ZXCV */}
            <div className="flex gap-0.5">
                <Key
                    label="Shift"
                    width="w-14"
                    isActive={isKeyActive("Shift") || isKeyActive("ShiftLeft") || isKeyActive("ShiftRight")}
                />
                <Key label="Z" isActive={isKeyActive("Z") || isKeyActive("z")} />
                <Key label="X" isActive={isKeyActive("X") || isKeyActive("x")} />
                <Key label="C" isActive={isKeyActive("C") || isKeyActive("c")} />
                <Key label="V" isActive={isKeyActive("V") || isKeyActive("v")} />
                <Key label="B" isActive={isKeyActive("B") || isKeyActive("b")} />
                <Key label="N" isActive={isKeyActive("N") || isKeyActive("n")} />
                <Key label="M" isActive={isKeyActive("M") || isKeyActive("m")} />
                <Key label="," isActive={isKeyActive(",") || isKeyActive("Comma")} />
                <Key label="." isActive={isKeyActive(".") || isKeyActive("Period")} />
                <Key label="/" isActive={isKeyActive("/") || isKeyActive("Slash")} />
                <Key
                    label="Shift"
                    width="w-14"
                    isActive={isKeyActive("Shift") || isKeyActive("ShiftLeft") || isKeyActive("ShiftRight")}
                />
            </div>

            {/* Row 6: Bottom row */}
            <div className="flex gap-0.5">
                <Key
                    label="Ctrl"
                    width="w-10"
                    isActive={
                        isKeyActive("Ctrl") || isKeyActive("Control") || isKeyActive("ControlLeft") || isKeyActive("ControlRight")
                    }
                />
                <Key
                    label="Win"
                    width="w-8"
                    isActive={isKeyActive("Win") || isKeyActive("Meta") || isKeyActive("MetaLeft") || isKeyActive("MetaRight")}
                />
                <Key
                    label="Alt"
                    width="w-8"
                    isActive={isKeyActive("Alt") || isKeyActive("AltLeft") || isKeyActive("AltRight")}
                />
                <Key label="Space" width="w-36" isActive={isKeyActive("Space")} />
                <Key
                    label="Alt"
                    width="w-8"
                    isActive={isKeyActive("Alt") || isKeyActive("AltLeft") || isKeyActive("AltRight")}
                />
                <Key label="Fn" width="w-8" isActive={isKeyActive("Fn")} />
                <Key
                    label="Ctrl"
                    width="w-10"
                    isActive={
                        isKeyActive("Ctrl") || isKeyActive("Control") || isKeyActive("ControlLeft") || isKeyActive("ControlRight")
                    }
                />
            </div>

            {/* Row 7: Arrow keys - make them smaller and inline */}
            <div className="mt-1 flex justify-center gap-0.5">
                <div className="flex gap-0.5">
                    <Key label="←" width="w-7" isActive={isKeyActive("Left") || isKeyActive("ArrowLeft")} />
                    <div className="flex flex-col gap-0.5">
                        <Key label="↑" width="w-7" isActive={isKeyActive("Up") || isKeyActive("ArrowUp")} />
                        <Key label="↓" width="w-7" isActive={isKeyActive("Down") || isKeyActive("ArrowDown")} />
                    </div>
                    <Key label="→" width="w-7" isActive={isKeyActive("Right") || isKeyActive("ArrowRight")} />
                </div>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BodyMapSelectorProps {
    selectedPart: string | null
    onSelectPart: (part: string) => void
}

export function BodyMapSelector({ selectedPart, onSelectPart }: BodyMapSelectorProps) {
    const [hoveredPart, setHoveredPart] = useState<string | null>(null)

    const bodyParts = [
        { id: "head", label: "Head", coords: "120,30,160,70" },
        { id: "chest", label: "Chest", coords: "120,90,160,130" },
        { id: "abdomen", label: "Abdomen", coords: "120,140,160,180" },
        { id: "leftArm", label: "Left Arm", coords: "90,90,110,150" },
        { id: "rightArm", label: "Right Arm", coords: "170,90,190,150" },
        { id: "leftLeg", label: "Left Leg", coords: "110,190,130,270" },
        { id: "rightLeg", label: "Right Leg", coords: "150,190,170,270" },
    ]

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle>Body Map</CardTitle>
                <CardDescription>Select a body part where you&apos;re experiencing symptoms</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-[350px] bg-muted/30 rounded-md flex items-center justify-center">
                    {/* Simple body outline */}
                    <svg width="280" height="320" viewBox="0 0 280 320" className="body-map">
                        {/* Head */}
                        <circle
                            cx="140"
                            cy="50"
                            r="30"
                            className={`stroke-2 ${selectedPart === "head"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "head"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-background stroke-foreground/30"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("head")}
                            onMouseEnter={() => setHoveredPart("head")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Torso */}
                        <rect
                            x="110"
                            y="80"
                            width="60"
                            height="110"
                            rx="5"
                            className={`stroke-2 ${selectedPart === "chest" || selectedPart === "abdomen"
                                    ? "fill-primary/30 stroke-primary"
                                    : (hoveredPart === "chest" || hoveredPart === "abdomen")
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-background stroke-foreground/30"
                                } transition-colors`}
                        />

                        {/* Chest area */}
                        <rect
                            x="110"
                            y="80"
                            width="60"
                            height="50"
                            rx="5"
                            className={`stroke-2 ${selectedPart === "chest"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "chest"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-transparent stroke-transparent"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("chest")}
                            onMouseEnter={() => setHoveredPart("chest")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Abdomen area */}
                        <rect
                            x="110"
                            y="130"
                            width="60"
                            height="60"
                            rx="5"
                            className={`stroke-2 ${selectedPart === "abdomen"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "abdomen"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-transparent stroke-transparent"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("abdomen")}
                            onMouseEnter={() => setHoveredPart("abdomen")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Left Arm */}
                        <rect
                            x="80"
                            y="90"
                            width="30"
                            height="100"
                            rx="10"
                            className={`stroke-2 ${selectedPart === "leftArm"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "leftArm"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-background stroke-foreground/30"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("leftArm")}
                            onMouseEnter={() => setHoveredPart("leftArm")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Right Arm */}
                        <rect
                            x="170"
                            y="90"
                            width="30"
                            height="100"
                            rx="10"
                            className={`stroke-2 ${selectedPart === "rightArm"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "rightArm"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-background stroke-foreground/30"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("rightArm")}
                            onMouseEnter={() => setHoveredPart("rightArm")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Left Leg */}
                        <rect
                            x="110"
                            y="190"
                            width="25"
                            height="110"
                            rx="10"
                            className={`stroke-2 ${selectedPart === "leftLeg"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "leftLeg"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-background stroke-foreground/30"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("leftLeg")}
                            onMouseEnter={() => setHoveredPart("leftLeg")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />

                        {/* Right Leg */}
                        <rect
                            x="145"
                            y="190"
                            width="25"
                            height="110"
                            rx="10"
                            className={`stroke-2 ${selectedPart === "rightLeg"
                                    ? "fill-primary/30 stroke-primary"
                                    : hoveredPart === "rightLeg"
                                        ? "fill-primary/10 stroke-primary/70"
                                        : "fill-background stroke-foreground/30"
                                } cursor-pointer transition-colors`}
                            onClick={() => onSelectPart("rightLeg")}
                            onMouseEnter={() => setHoveredPart("rightLeg")}
                            onMouseLeave={() => setHoveredPart(null)}
                        />
                    </svg>

                    {/* Hover label */}
                    {hoveredPart && (
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            {bodyParts.find((part) => part.id === hoveredPart)?.label}
                        </div>
                    )}

                    {/* Selected part label */}
                    {selectedPart && !hoveredPart && (
                        <div className="absolute bottom-4 left-0 right-0 text-center font-medium">
                            Selected: {bodyParts.find((part) => part.id === selectedPart)?.label}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}


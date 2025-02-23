"use client"

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PercentCircle } from 'lucide-react'
import React from 'react'
import CalculatePercent from './CalculatePercent'

const PercentDropdown = () => {
    const [isCalculatorOpen, setIsCalculatorOpen] = React.useState(false)
    return (
        <>
            <div className="relative">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                                variant="outline"
                                size="icon"
                                className="ml-2"
                            >
                                <PercentCircle />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Calculate percentage</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {isCalculatorOpen && (
                    <div className="absolute z-50 right-0 mt-2 w-64">
                        <CalculatePercent />
                    </div>
                )}
            </div>
        </>
    )
}

export default PercentDropdown

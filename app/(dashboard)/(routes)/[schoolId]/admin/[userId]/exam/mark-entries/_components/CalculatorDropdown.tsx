"use client"


import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CalculatorIcon } from 'lucide-react'
import React from 'react'
import ScientificCalculator from './Calculator'

const CalculatorDropdown = () => {
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
                                        <CalculatorIcon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Calculator</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {isCalculatorOpen && (
                            <div className="absolute z-50 right-0 mt-2 w-64">
                                <ScientificCalculator />
                            </div>
                        )}
                    </div>
    </>
  )
}

export default CalculatorDropdown

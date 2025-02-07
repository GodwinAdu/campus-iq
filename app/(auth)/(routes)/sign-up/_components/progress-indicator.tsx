import { CheckCircle2 } from "lucide-react"

type ProgressIndicatorProps = {
  steps: string[]
  currentStep: number
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
          </div>
          <span className={`mt-2 text-sm ${index <= currentStep ? "text-indigo-600 font-medium" : "text-gray-500"}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}


import { useState, useEffect } from "react"
import zxcvbn from "zxcvbn"
import { Progress } from "@/components/ui/progress"

export function PasswordStrengthMeter({ password }: { password: string }) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    setStrength(zxcvbn(password).score)
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <div className="mt-2">
      <Progress value={(strength / 4) * 100} className={`h-2 ${getColor()}`} />
      <p className="text-sm mt-1 text-gray-600">
        {strength === 0 && "Very weak"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Fair"}
        {strength === 3 && "Good"}
        {strength === 4 && "Strong"}
      </p>
    </div>
  )
}


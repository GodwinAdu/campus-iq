import { useState } from "react";


const CalculatePercent = () => {
    const [percentage, setPercentage] = useState<number | undefined>();
    const [number, setNumber] = useState<number | undefined>();
    const [result, setResult] = useState<number | undefined>();
  
    const handleCalculate = (e: React.FormEvent) => {
      e.preventDefault();
      if (percentage && number) {
        const calculatedResult = (percentage / 100) * number;
        setResult(calculatedResult);
      }
    };
  
    return (
      <div className=" flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-xl font-bold mb-4 text-center">Percentage Calculator</h1>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter the percentage (%)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 20"
                value={percentage || ''}
                onChange={(e) => setPercentage(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter the number</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 100"
                value={number || ''}
                onChange={(e) => setNumber(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                Calculate
              </button>
            </div>
          </form>
          {result !== undefined && (
            <div className="mt-4 text-lg font-semibold">
              {percentage}% of {number} is {result}
            </div>
          )}
        </div>
      </div>
    );

}

export default CalculatePercent

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EligibilityData } from "@/lib/eligibility";

interface EligibilityFormProps {
  onSubmit: (data: EligibilityData) => void;
}

export const EligibilityForm: React.FC<EligibilityFormProps> = ({ onSubmit }) => {
  const [data, setData] = useState<EligibilityData>({
    age: 18,
    isCitizen: true,
    isNRI: false,
    isDisqualified: false,
    isRegistered: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-3">
            <label htmlFor="age" className="block text-sm font-semibold text-foreground-primary">
              How old are you?
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              max="120"
              value={data.age}
              onChange={handleChange}
              required
              className="w-full max-w-[150px] px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-foreground-primary"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <label className="block text-sm font-semibold text-foreground-primary">
              Please check all that apply to you:
            </label>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="isCitizen"
                name="isCitizen"
                checked={data.isCitizen}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-border text-primary-500 focus:ring-accent-500 bg-bg-card"
              />
              <label htmlFor="isCitizen" className="text-foreground-secondary leading-relaxed cursor-pointer">
                I am an Indian Citizen
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="isNRI"
                name="isNRI"
                checked={data.isNRI}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-border text-primary-500 focus:ring-accent-500 bg-bg-card"
              />
              <label htmlFor="isNRI" className="text-foreground-secondary leading-relaxed cursor-pointer">
                I am a Non-Resident Indian (NRI) living abroad
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="isRegistered"
                name="isRegistered"
                checked={data.isRegistered}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-border text-primary-500 focus:ring-accent-500 bg-bg-card"
              />
              <label htmlFor="isRegistered" className="text-foreground-secondary leading-relaxed cursor-pointer">
                My name is currently on the electoral roll (Voter List)
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="isDisqualified"
                name="isDisqualified"
                checked={data.isDisqualified}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-border text-primary-500 focus:ring-accent-500 bg-bg-card"
              />
              <label htmlFor="isDisqualified" className="text-foreground-secondary leading-relaxed cursor-pointer">
                I have been disqualified from voting under the law (e.g., unsound mind, specific election offenses)
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Button type="submit" size="lg" className="w-full">
              Check My Eligibility
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

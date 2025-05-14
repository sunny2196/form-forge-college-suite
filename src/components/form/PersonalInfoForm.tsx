
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const PersonalInfoForm: React.FC = () => {
  const { formState, updatePersonalInfo } = useFormContext();
  const { personalInfo } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value } as any);
  };

  return (
    <Card className="form-section-card">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="personalDetails" className="text-lg font-medium mb-2">Personal Information</Label>
            <Textarea
              id="personalDetails"
              name="personalDetails"
              value={personalInfo.personalDetails || ''}
              onChange={handleChange}
              placeholder="Please provide your personal details including name, email, phone, date of birth, and address..."
              className="min-h-[200px]"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;

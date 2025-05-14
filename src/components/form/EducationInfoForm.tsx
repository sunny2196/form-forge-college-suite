
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const EducationInfoForm: React.FC = () => {
  const { formState, updateEducationInfo } = useFormContext();
  const { educationInfo } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateEducationInfo({ [name]: value } as any);
  };

  return (
    <Card className="form-section-card">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="educationDetails" className="text-lg font-medium mb-2">Education Information</Label>
            <Textarea
              id="educationDetails"
              name="educationDetails"
              value={educationInfo.educationDetails || ''}
              onChange={handleChange}
              placeholder="Please provide details about your education including high school, GPA, graduation year, test scores, extracurricular activities, and honors..."
              className="min-h-[200px]"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationInfoForm;

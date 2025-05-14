
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ProgramInfoForm: React.FC = () => {
  const { formState, updateProgramInfo } = useFormContext();
  const { programInfo } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProgramInfo({ [name]: value } as any);
  };

  return (
    <Card className="form-section-card">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="programDetails" className="text-lg font-medium mb-2">Program Information</Label>
            <Textarea
              id="programDetails"
              name="programDetails"
              value={programInfo.programDetails || ''}
              onChange={handleChange}
              placeholder="Please provide details about your intended major, term applying for, residency status, and if you plan to apply for financial aid or scholarships..."
              className="min-h-[200px]"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramInfoForm;


import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EducationInfoForm: React.FC = () => {
  const { formState, updateEducationInfo } = useFormContext();
  const { educationInfo, visibleFields } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEducationInfo({ [name]: value } as any);
  };

  const addExtracurricular = () => {
    updateEducationInfo({
      extracurricular: [...educationInfo.extracurricular, '']
    });
  };

  const updateExtracurricular = (index: number, value: string) => {
    const updatedActivities = [...educationInfo.extracurricular];
    updatedActivities[index] = value;
    updateEducationInfo({ extracurricular: updatedActivities });
  };

  const removeExtracurricular = (index: number) => {
    const updatedActivities = [...educationInfo.extracurricular];
    updatedActivities.splice(index, 1);
    updateEducationInfo({ extracurricular: updatedActivities });
  };

  const addHonor = () => {
    updateEducationInfo({
      honors: [...educationInfo.honors, '']
    });
  };

  const updateHonor = (index: number, value: string) => {
    const updatedHonors = [...educationInfo.honors];
    updatedHonors[index] = value;
    updateEducationInfo({ honors: updatedHonors });
  };

  const removeHonor = (index: number) => {
    const updatedHonors = [...educationInfo.honors];
    updatedHonors.splice(index, 1);
    updateEducationInfo({ honors: updatedHonors });
  };

  return (
    <Card className="form-section-card">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFields.education.includes('highSchool') && (
            <div className="space-y-2">
              <Label htmlFor="highSchool">High School Name</Label>
              <Input
                id="highSchool"
                name="highSchool"
                value={educationInfo.highSchool}
                onChange={handleChange}
                placeholder="Enter your high school name"
              />
            </div>
          )}

          {visibleFields.education.includes('highSchoolGpa') && (
            <div className="space-y-2">
              <Label htmlFor="highSchoolGpa">High School GPA</Label>
              <Input
                id="highSchoolGpa"
                name="highSchoolGpa"
                value={educationInfo.highSchoolGpa}
                onChange={handleChange}
                placeholder="e.g., 3.75"
              />
            </div>
          )}

          {visibleFields.education.includes('graduationYear') && (
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                value={educationInfo.graduationYear}
                onChange={handleChange}
                placeholder="e.g., 2023"
              />
            </div>
          )}

          {visibleFields.education.includes('sat') && (
            <div className="space-y-2">
              <Label htmlFor="sat">SAT Score (if applicable)</Label>
              <Input
                id="sat"
                name="sat"
                value={educationInfo.sat}
                onChange={handleChange}
                placeholder="e.g., 1400"
              />
            </div>
          )}

          {visibleFields.education.includes('act') && (
            <div className="space-y-2">
              <Label htmlFor="act">ACT Score (if applicable)</Label>
              <Input
                id="act"
                name="act"
                value={educationInfo.act}
                onChange={handleChange}
                placeholder="e.g., 30"
              />
            </div>
          )}
        </div>

        {visibleFields.education.includes('extracurricular') && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <Label>Extracurricular Activities</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addExtracurricular}
              >
                Add Activity
              </Button>
            </div>
            
            {educationInfo.extracurricular.map((activity, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={activity}
                  onChange={(e) => updateExtracurricular(index, e.target.value)}
                  placeholder="Describe your activity, role, and duration"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeExtracurricular(index)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}

        {visibleFields.education.includes('honors') && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <Label>Awards and Honors</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addHonor}
              >
                Add Award
              </Button>
            </div>
            
            {educationInfo.honors.map((honor, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={honor}
                  onChange={(e) => updateHonor(index, e.target.value)}
                  placeholder="Describe your award or honor"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeHonor(index)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationInfoForm;

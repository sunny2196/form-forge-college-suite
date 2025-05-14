
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const FormSettings: React.FC = () => {
  const { formState, toggleFieldVisibility } = useFormContext();
  const { visibleFields } = formState;

  const personalFields = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'dob', label: 'Date of Birth' },
    { id: 'gender', label: 'Gender' },
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State/Province' },
    { id: 'zip', label: 'ZIP/Postal Code' },
    { id: 'country', label: 'Country' },
  ];

  const educationFields = [
    { id: 'highSchool', label: 'High School Name' },
    { id: 'highSchoolGpa', label: 'High School GPA' },
    { id: 'graduationYear', label: 'Graduation Year' },
    { id: 'sat', label: 'SAT Score' },
    { id: 'act', label: 'ACT Score' },
    { id: 'extracurricular', label: 'Extracurricular Activities' },
    { id: 'honors', label: 'Awards and Honors' },
  ];

  const programFields = [
    { id: 'major', label: 'Intended Major' },
    { id: 'minor', label: 'Intended Minor' },
    { id: 'termApplying', label: 'Term Applying For' },
    { id: 'yearApplying', label: 'Year Applying For' },
    { id: 'residency', label: 'Residency Status' },
    { id: 'financialAid', label: 'Financial Aid' },
    { id: 'scholarship', label: 'Scholarships' },
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Form Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information Fields</h3>
            <div className="space-y-4">
              {personalFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`personal-${field.id}`} 
                    checked={visibleFields.personal.includes(field.id)}
                    onCheckedChange={() => toggleFieldVisibility('personal', field.id)}
                  />
                  <Label htmlFor={`personal-${field.id}`}>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Education Fields</h3>
            <div className="space-y-4">
              {educationFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`education-${field.id}`} 
                    checked={visibleFields.education.includes(field.id)}
                    onCheckedChange={() => toggleFieldVisibility('education', field.id)}
                  />
                  <Label htmlFor={`education-${field.id}`}>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Program Fields</h3>
            <div className="space-y-4">
              {programFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`program-${field.id}`} 
                    checked={visibleFields.program.includes(field.id)}
                    onCheckedChange={() => toggleFieldVisibility('program', field.id)}
                  />
                  <Label htmlFor={`program-${field.id}`}>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSettings;

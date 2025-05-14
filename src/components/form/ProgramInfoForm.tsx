
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

const ProgramInfoForm: React.FC = () => {
  const { formState, updateProgramInfo } = useFormContext();
  const { programInfo, visibleFields } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateProgramInfo({ [name]: value } as any);
  };

  const handleSelectChange = (name: string, value: string) => {
    updateProgramInfo({ [name]: value } as any);
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    updateProgramInfo({ [name]: checked } as any);
  };

  return (
    <Card className="form-section-card">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFields.program.includes('major') && (
            <div className="space-y-2">
              <Label htmlFor="major">Intended Major</Label>
              <Select
                value={programInfo.major}
                onValueChange={(value) => handleSelectChange('major', value)}
              >
                <SelectTrigger id="major">
                  <SelectValue placeholder="Select a major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="undecided">Undecided</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {visibleFields.program.includes('minor') && (
            <div className="space-y-2">
              <Label htmlFor="minor">Intended Minor (if any)</Label>
              <Select
                value={programInfo.minor}
                onValueChange={(value) => handleSelectChange('minor', value)}
              >
                <SelectTrigger id="minor">
                  <SelectValue placeholder="Select a minor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="undecided">Undecided</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {visibleFields.program.includes('termApplying') && (
            <div className="space-y-2">
              <Label htmlFor="termApplying">Term Applying For</Label>
              <Select
                value={programInfo.termApplying}
                onValueChange={(value) => handleSelectChange('termApplying', value)}
              >
                <SelectTrigger id="termApplying">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {visibleFields.program.includes('yearApplying') && (
            <div className="space-y-2">
              <Label htmlFor="yearApplying">Year Applying For</Label>
              <Select
                value={programInfo.yearApplying}
                onValueChange={(value) => handleSelectChange('yearApplying', value)}
              >
                <SelectTrigger id="yearApplying">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {visibleFields.program.includes('residency') && (
            <div className="space-y-2">
              <Label htmlFor="residency">Residency Status</Label>
              <Select
                value={programInfo.residency}
                onValueChange={(value) => handleSelectChange('residency', value)}
              >
                <SelectTrigger id="residency">
                  <SelectValue placeholder="Select your residency status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-state">In-State</SelectItem>
                  <SelectItem value="out-of-state">Out-of-State</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {visibleFields.program.includes('financialAid') && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="financialAid" 
                checked={programInfo.financialAid}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('financialAid', checked as boolean)
                }
              />
              <Label htmlFor="financialAid">
                I plan to apply for financial aid
              </Label>
            </div>
          )}

          {visibleFields.program.includes('scholarship') && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="scholarship" 
                checked={programInfo.scholarship}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('scholarship', checked as boolean)
                }
              />
              <Label htmlFor="scholarship">
                I plan to apply for scholarships
              </Label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramInfoForm;

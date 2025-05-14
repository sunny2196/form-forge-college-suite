
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const PersonalInfoForm: React.FC = () => {
  const { formState, updatePersonalInfo } = useFormContext();
  const { personalInfo, visibleFields } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value } as any);
  };

  const handleSelectChange = (name: string, value: string) => {
    updatePersonalInfo({ [name]: value } as any);
  };

  return (
    <Card className="form-section-card">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFields.personal.includes('firstName') && (
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
          )}

          {visibleFields.personal.includes('lastName') && (
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          )}

          {visibleFields.personal.includes('email') && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          {visibleFields.personal.includes('phone') && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          )}

          {visibleFields.personal.includes('dob') && (
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={personalInfo.dob}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {visibleFields.personal.includes('gender') && (
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={personalInfo.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {visibleFields.personal.includes('address') && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                value={personalInfo.address}
                onChange={handleChange}
                placeholder="Enter your street address"
              />
            </div>
          )}

          {visibleFields.personal.includes('city') && (
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={personalInfo.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>
          )}

          {visibleFields.personal.includes('state') && (
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                name="state"
                value={personalInfo.state}
                onChange={handleChange}
                placeholder="Enter your state or province"
              />
            </div>
          )}

          {visibleFields.personal.includes('zip') && (
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP/Postal Code</Label>
              <Input
                id="zip"
                name="zip"
                value={personalInfo.zip}
                onChange={handleChange}
                placeholder="Enter your ZIP or postal code"
              />
            </div>
          )}

          {visibleFields.personal.includes('country') && (
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={personalInfo.country}
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;

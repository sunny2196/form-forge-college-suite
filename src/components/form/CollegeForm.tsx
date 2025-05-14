
import React, { useState } from 'react';
import { FormProvider } from '@/context/FormContext';
import FormHeader from './FormHeader';
import FormNavigation from './FormNavigation';
import PersonalInfoForm from './PersonalInfoForm';
import EducationInfoForm from './EducationInfoForm';
import ProgramInfoForm from './ProgramInfoForm';
import FormSettings from './FormSettings';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// This component uses the FormContext
const FormContent: React.FC = () => {
  const { formState } = useFormContext();
  const { currentStep, personalInfo, educationInfo, programInfo } = formState;
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine all form data into one object for submission
    const formData = {
      ...personalInfo,
      ...educationInfo,
      ...programInfo,
      form_name: "college_application"
    };

    try {
      // Create FormData object for Netlify
      const netlifyFormData = new FormData();
      
      // Add all form fields to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle arrays (like extracurricular activities)
          netlifyFormData.append(key, JSON.stringify(value));
        } else if (typeof value === 'boolean') {
          // Handle boolean values
          netlifyFormData.append(key, value.toString());
        } else {
          // Handle string and number values
          netlifyFormData.append(key, value as string);
        }
      });

      // Submit the form to Netlify forms
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(netlifyFormData as any).toString(),
      });

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted!",
      });
      console.log("Form Submission:", formState);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <FormHeader />
      
      {/* Add the hidden Netlify form for form detection */}
      <form name="college_application" data-netlify="true" hidden>
        {/* Personal Info Fields */}
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="date" name="dob" />
        <input type="text" name="gender" />
        <input type="text" name="address" />
        <input type="text" name="city" />
        <input type="text" name="state" />
        <input type="text" name="zip" />
        <input type="text" name="country" />
        
        {/* Education Info Fields */}
        <input type="text" name="highSchool" />
        <input type="text" name="highSchoolGpa" />
        <input type="text" name="graduationYear" />
        <input type="text" name="sat" />
        <input type="text" name="act" />
        <input type="text" name="extracurricular" />
        <input type="text" name="honors" />
        
        {/* Program Info Fields */}
        <input type="text" name="major" />
        <input type="text" name="minor" />
        <input type="text" name="termApplying" />
        <input type="text" name="yearApplying" />
        <input type="text" name="residency" />
        <input type="checkbox" name="financialAid" />
        <input type="checkbox" name="scholarship" />
        <input type="hidden" name="form-name" value="college_application" />
      </form>
      
      {/* Actual visible form */}
      <form onSubmit={handleSubmit} data-netlify="true" name="college_application" method="POST" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="college_application" />
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        
        <div className={`form-step ${currentStep !== 1 ? 'hidden' : ''}`}>
          <PersonalInfoForm />
        </div>

        <div className={`form-step ${currentStep !== 2 ? 'hidden' : ''}`}>
          <EducationInfoForm />
        </div>

        <div className={`form-step ${currentStep !== 3 ? 'hidden' : ''}`}>
          <ProgramInfoForm />
        </div>

        <FormNavigation />
        
        {currentStep === 3 && (
          <div className="mt-6 flex justify-center">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto px-8"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        )}
      </form>

      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? "Hide Form Settings" : "Customize Form Fields"}
        </Button>
      </div>

      {showSettings && <FormSettings />}
    </div>
  );
};

// Wrapper component that provides the FormContext
const CollegeForm: React.FC = () => {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
};

export default CollegeForm;

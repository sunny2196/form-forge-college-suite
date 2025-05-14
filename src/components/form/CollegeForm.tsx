
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
import EmailFormLayout from './EmailFormLayout';

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
      personalDetails: personalInfo.personalDetails,
      educationDetails: educationInfo.educationDetails,
      programDetails: programInfo.programDetails,
      form_name: "college_application"
    };

    try {
      // Create FormData object for Netlify
      const netlifyFormData = new FormData();
      
      // Add all form fields to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        netlifyFormData.append(key, value as string);
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
      <EmailFormLayout>
        <FormHeader />
        
        {/* Add the hidden Netlify form for form detection */}
        <form name="college_application" data-netlify="true" hidden>
          <input type="text" name="personalDetails" />
          <input type="text" name="educationDetails" />
          <input type="text" name="programDetails" />
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
      </EmailFormLayout>

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

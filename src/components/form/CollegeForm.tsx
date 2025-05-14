
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
  const { currentStep } = formState;
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted!",
    });
    console.log("Form Submission:", formState);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <FormHeader />
      
      <form onSubmit={handleSubmit}>
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

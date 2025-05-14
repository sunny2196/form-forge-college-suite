
import React, { createContext, useContext, useState } from 'react';

export type PersonalInfo = {
  personalDetails: string;
};

export type EducationInfo = {
  educationDetails: string;
};

export type ProgramInfo = {
  programDetails: string;
};

export type FormState = {
  currentStep: number;
  maxSteps: number;
  personalInfo: PersonalInfo;
  educationInfo: EducationInfo;
  programInfo: ProgramInfo;
  visibleFields: {
    personal: string[];
    education: string[];
    program: string[];
  };
};

type FormContextType = {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateEducationInfo: (info: Partial<EducationInfo>) => void;
  updateProgramInfo: (info: Partial<ProgramInfo>) => void;
  toggleFieldVisibility: (section: 'personal' | 'education' | 'program', field: string) => void;
};

const defaultFormState: FormState = {
  currentStep: 1,
  maxSteps: 3,
  personalInfo: {
    personalDetails: '',
  },
  educationInfo: {
    educationDetails: '',
  },
  programInfo: {
    programDetails: '',
  },
  visibleFields: {
    personal: ['personalDetails'],
    education: ['educationDetails'],
    program: ['programDetails'],
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const nextStep = () => {
    if (formState.currentStep < formState.maxSteps) {
      setFormState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (formState.currentStep > 1) {
      setFormState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= formState.maxSteps) {
      setFormState((prev) => ({ ...prev, currentStep: step }));
    }
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setFormState((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateEducationInfo = (info: Partial<EducationInfo>) => {
    setFormState((prev) => ({
      ...prev,
      educationInfo: { ...prev.educationInfo, ...info },
    }));
  };

  const updateProgramInfo = (info: Partial<ProgramInfo>) => {
    setFormState((prev) => ({
      ...prev,
      programInfo: { ...prev.programInfo, ...info },
    }));
  };

  const toggleFieldVisibility = (section: 'personal' | 'education' | 'program', field: string) => {
    setFormState((prev) => {
      const visibleFields = [...prev.visibleFields[section]];
      const index = visibleFields.indexOf(field);
      
      if (index > -1) {
        visibleFields.splice(index, 1); // Remove field
      } else {
        visibleFields.push(field); // Add field
      }
      
      return {
        ...prev,
        visibleFields: {
          ...prev.visibleFields,
          [section]: visibleFields,
        },
      };
    });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        setFormState,
        nextStep,
        prevStep,
        goToStep,
        updatePersonalInfo,
        updateEducationInfo,
        updateProgramInfo,
        toggleFieldVisibility,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

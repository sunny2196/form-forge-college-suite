
import React from 'react';
import { useFormContext } from '@/context/FormContext';

const FormHeader: React.FC = () => {
  const { formState } = useFormContext();
  const { currentStep, maxSteps } = formState;
  
  const progressPercentage = (currentStep / maxSteps) * 100;

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-center mb-2">College Application Form</h1>
      <p className="text-center text-muted-foreground mb-6">
        Step {currentStep} of {maxSteps} - {currentStep === 1 ? 'Personal Information' : currentStep === 2 ? 'Educational Background' : 'Program Selection'}
      </p>
      
      <div className="form-progress-bar">
        <div 
          className="form-progress-indicator" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-4">
        {Array.from({ length: maxSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <button 
              className={`step-button ${currentStep === i + 1 ? 'active' : ''} ${currentStep > i + 1 ? 'completed' : ''}`}
              onClick={() => {/* Navigation will be handled in FormNavigation */}}
            >
              {currentStep > i + 1 ? '✓' : i + 1}
            </button>
            <span className="text-xs mt-2">
              {i === 0 ? 'Personal' : i === 1 ? 'Education' : 'Program'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormHeader;

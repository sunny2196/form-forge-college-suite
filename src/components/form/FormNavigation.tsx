
import React from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/context/FormContext';

const FormNavigation: React.FC = () => {
  const { formState, nextStep, prevStep, goToStep } = useFormContext();
  const { currentStep, maxSteps } = formState;

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 1}
      >
        Previous
      </Button>

      <div className="flex gap-2">
        {Array.from({ length: maxSteps }, (_, i) => (
          <button
            key={i}
            className={`step-button ${currentStep === i + 1 ? 'active' : ''} ${currentStep > i + 1 ? 'completed' : ''}`}
            onClick={() => goToStep(i + 1)}
          >
            {currentStep > i + 1 ? '✓' : i + 1}
          </button>
        ))}
      </div>

      {currentStep < maxSteps ? (
        <Button onClick={nextStep}>
          Next
        </Button>
      ) : (
        <Button>
          Submit Application
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;

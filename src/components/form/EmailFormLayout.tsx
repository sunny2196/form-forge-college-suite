
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stamp } from 'lucide-react';
import { useFormContext } from '@/context/FormContext';

interface EmailFormLayoutProps {
  children: ReactNode;
}

const EmailFormLayout: React.FC<EmailFormLayoutProps> = ({ children }) => {
  const { formState } = useFormContext();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="max-w-4xl mx-auto my-8 border-2 border-gray-200 shadow-lg bg-white">
      <div className="bg-primary/10 p-4 border-b border-gray-200">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">From: admissions@amrita.edu</span>
            <span className="text-sm text-gray-500">{currentDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">To: applicant@example.com</span>
          </div>
          <div className="mt-2">
            <h2 className="text-xl font-semibold">Amrita Vishwa Vidyapeetham University Application</h2>
            <p className="text-sm text-gray-600">Please complete the following application form</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 relative">
        {children}
        
        {formState.currentStep === 3 && (
          <div className="flex justify-end mt-8 pt-4 border-t border-dashed border-gray-200">
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="text-sm font-medium">Amrita Vishwa Vidyapeetham</p>
                <p className="text-xs text-gray-500">Office of Admissions</p>
              </div>
              <div className="border-2 border-primary/50 rounded p-1 rotate-12">
                <Stamp className="h-12 w-12 text-primary/70" strokeWidth={1} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailFormLayout;


import React from 'react';
import CollegeForm from '@/components/form/CollegeForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto">
        <header className="text-center mb-8 flex flex-col items-center">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/3930edd1-045a-4251-bc25-6aa2542d4340.png" 
              alt="Amrita Vishwa Vidyapeetham Logo" 
              className="h-32 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-primary">College Application Portal</h1>
          <p className="text-muted-foreground mt-2">Complete the form below to apply</p>
        </header>
        
        <CollegeForm />
      </div>
    </div>
  );
};

export default Index;

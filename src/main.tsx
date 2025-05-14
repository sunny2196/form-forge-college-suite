
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// For Netlify forms to work with React SPA, we need to handle the form submission
// This ensures Netlify's form detection works with client-side routing
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-netlify="true"]');
  forms.forEach(form => {
    form.addEventListener('submit', handleSubmit);
  });

  function handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
    .then(() => console.log('Form successfully submitted'))
    .catch((error) => console.error(error));
  }
});

createRoot(document.getElementById("root")!).render(<App />);

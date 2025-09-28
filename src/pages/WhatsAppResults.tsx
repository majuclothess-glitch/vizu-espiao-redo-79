import { useState, useEffect } from "react";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import LoadingSteps from "@/components/LoadingSteps";
import VSLSection from "@/components/VSLSection";
import { useSearchParams } from "react-router-dom";
import { validatePhone, formatPhoneForDisplay } from "@/lib/phoneValidation";
import { sanitizeHtml } from "@/lib/security";

const WhatsAppResults = () => {
  const [searchParams] = useSearchParams();
  const rawPhoneNumber = searchParams.get('phone') || '+55 11 99999-9999';
  const [currentStep, setCurrentStep] = useState<'loading' | 'vsl' | 'results'>('loading');
  
  // Sanitiza e valida o número de telefone da URL
  const sanitizedPhone = sanitizeHtml(rawPhoneNumber);
  const phoneValidation = validatePhone(sanitizedPhone);
  
  const phoneNumber = phoneValidation.success 
    ? formatPhoneForDisplay(phoneValidation.data)
    : '+55 11 99999-9999'; // Fallback seguro

  const handleLoadingComplete = () => {
    setCurrentStep('vsl');
  };

  const handleVSLComplete = () => {
    setCurrentStep('results');
  };

  // Render different steps
  if (currentStep === 'loading') {
    return <LoadingSteps phoneNumber={phoneNumber} onComplete={handleLoadingComplete} />;
  }

  if (currentStep === 'vsl') {
    return <VSLSection phoneNumber={phoneNumber} onComplete={handleVSLComplete} />;
  }

  return <WhatsAppPreview phoneNumber={phoneNumber} />;
};

export default WhatsAppResults;
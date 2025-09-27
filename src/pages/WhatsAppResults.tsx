import WhatsAppPreview from "@/components/WhatsAppPreview";
import { useSearchParams } from "react-router-dom";
import { validatePhone, formatPhoneForDisplay } from "@/lib/phoneValidation";
import { sanitizeHtml } from "@/lib/security";

const WhatsAppResults = () => {
  const [searchParams] = useSearchParams();
  const rawPhoneNumber = searchParams.get('phone') || '+55 11 99999-9999';
  
  // Sanitiza e valida o número de telefone da URL
  const sanitizedPhone = sanitizeHtml(rawPhoneNumber);
  const phoneValidation = validatePhone(sanitizedPhone);
  
  const phoneNumber = phoneValidation.success 
    ? formatPhoneForDisplay(phoneValidation.data)
    : '+55 11 99999-9999'; // Fallback seguro

  return <WhatsAppPreview phoneNumber={phoneNumber} />;
};

export default WhatsAppResults;
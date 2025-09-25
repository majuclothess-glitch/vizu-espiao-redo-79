import WhatsAppPreview from "@/components/WhatsAppPreview";
import { useSearchParams } from "react-router-dom";

const WhatsAppResults = () => {
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get('phone') || '+55 11 99999-9999';

  return <WhatsAppPreview phoneNumber={phoneNumber} />;
};

export default WhatsAppResults;
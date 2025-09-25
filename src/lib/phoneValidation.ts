import { z } from 'zod';

// Schema de validação para telefone brasileiro
export const phoneSchema = z.string()
  .min(1, "Número de telefone é obrigatório")
  .regex(/^(?:\+55|55)?\s*(?:\(?\d{2}\)?\s*)?(?:9\s*)?\d{4}[-\s]?\d{4}$/, {
    message: "Formato de telefone inválido. Use (11) 90000-0000 ou 11900000000"
  })
  .transform((phone) => {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Se começa com 55, remove
    const withoutCountryCode = cleanPhone.startsWith('55') ? cleanPhone.slice(2) : cleanPhone;
    
    // Garante que tem 11 dígitos (DDD + 9 + 8 dígitos)
    if (withoutCountryCode.length === 11) {
      return withoutCountryCode;
    }
    
    // Se tem 10 dígitos, adiciona o 9 (números antigos)
    if (withoutCountryCode.length === 10) {
      const ddd = withoutCountryCode.slice(0, 2);
      const number = withoutCountryCode.slice(2);
      return ddd + '9' + number;
    }
    
    throw new Error("Número de telefone deve ter 10 ou 11 dígitos");
  })
  .refine((phone) => {
    // Valida DDD (códigos de área brasileiros válidos)
    const ddd = parseInt(phone.slice(0, 2));
    const validDDDs = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
      21, 22, 24, // RJ
      27, 28, // ES  
      31, 32, 33, 34, 35, 37, 38, // MG
      41, 42, 43, 44, 45, 46, // PR
      47, 48, 49, // SC
      51, 53, 54, 55, // RS
      61, // DF
      62, 64, // GO
      63, // TO
      65, 66, // MT
      67, // MS
      68, // AC
      69, // RO
      71, 73, 74, 75, 77, // BA
      79, // SE
      81, 87, // PE
      82, // AL
      83, // PB
      84, // RN
      85, 88, // CE
      86, 89, // PI
      91, 93, 94, // PA
      92, 97, // AM
      95, // RR
      96, // AP
      98, 99 // MA
    ];
    
    return validDDDs.includes(ddd);
  }, {
    message: "DDD inválido. Insira um código de área brasileiro válido"
  })
  .refine((phone) => {
    // Verifica se é número móvel (começa com 9)
    const ninthDigit = phone[2];
    return ninthDigit === '9';
  }, {
    message: "Apenas números de celular são aceitos (deve começar com 9 após o DDD)"
  });

// Função para formatar o número para exibição
export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

// Função para validar o telefone
export const validatePhone = (phone: string) => {
  try {
    const validatedPhone = phoneSchema.parse(phone);
    return { success: true, data: validatedPhone, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        error: error.errors[0]?.message || "Número de telefone inválido" 
      };
    }
    return { 
      success: false, 
      data: null, 
      error: "Erro na validação do telefone" 
    };
  }
};
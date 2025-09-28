/**
 * Constantes de segurança e configuração do sistema
 */

// URLs permitidas para redirecionamento
export const ALLOWED_URLS = [
  'https://pay.cakto.com.br/efgr85x_587098'
] as const;

// URLs permitidas para imagens
export const ALLOWED_IMAGE_DOMAINS = [
  'https://i.postimg.cc',
  'https://global24hub.com',
  'https://cdn-icons-png.flaticon.com'
] as const;

// Configurações de rate limiting
export const RATE_LIMIT_CONFIG = {
  maxRequests: 10,
  timeWindow: 60000, // 1 minuto
  investigationLimit: 3,
  investigationWindow: 3600000 // 1 hora
} as const;

// Configurações de validação
export const VALIDATION_CONFIG = {
  maxPhoneLength: 20,
  maxSearchQueryLength: 100,
  maxIdLength: 50,
  allowedPhonePattern: /^(?:\+55|55)?\s*(?:\(?\d{2}\)?\s*)?(?:9\s*)?\d{4}[-\s]?\d{4}$/,
  safeSearchPattern: /^[a-zA-Z0-9\s\u00C0-\u017F]*$/,
  safeIdPattern: /^[a-zA-Z0-9_-]+$/
} as const;

// Mensagens de erro padronizadas
export const ERROR_MESSAGES = {
  PHONE_REQUIRED: 'Número de telefone é obrigatório',
  PHONE_INVALID: 'Formato de telefone inválido',
  PHONE_DDD_INVALID: 'DDD inválido',
  PHONE_NOT_MOBILE: 'Apenas números de celular são aceitos',
  SEARCH_TOO_LONG: 'Consulta de pesquisa muito longa',
  SEARCH_INVALID_CHARS: 'Caracteres inválidos na pesquisa',
  URL_INVALID: 'URL inválida',
  URL_NOT_ALLOWED: 'URL não autorizada',
  ID_INVALID: 'ID inválido',
  RATE_LIMIT: 'Muitas tentativas. Aguarde um momento',
  SECURITY_ERROR: 'Erro de segurança detectado'
} as const;

// Configurações do sistema
export const SYSTEM_CONFIG = {
  notificationInterval: 15000, // 15 segundos
  promoModalDelay: 1500,
  scanStepDuration: 2000,
  maxRetries: 3
} as const;
/**
 * Content Security Policy (CSP) configuration
 * Implementa headers de segurança para prevenir ataques XSS
 */

// CSP para desenvolvimento - mais permissivo
export const developmentCSP = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'", 
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://scripts.converteai.net",
    "https://cdn.converteai.net"
  ],
  'style-src': [
    "'self'", 
    "'unsafe-inline'",
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com",
    "data:"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https:",
    "https://i.postimg.cc",
    "https://global24hub.com",
    "https://cdn-icons-png.flaticon.com"
  ],
  'connect-src': [
    "'self'",
    "https://api.vturb.com.br",
    "https://scripts.converteai.net"
  ],
  'media-src': [
    "'self'",
    "https://cdn.converteai.net"
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"]
};

// CSP para produção - mais restritivo
export const productionCSP = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'sha256-[hash-here]'", // Replace with actual hashes
    "https://scripts.converteai.net"
  ],
  'style-src': [
    "'self'",
    "'sha256-[hash-here]'", // Replace with actual hashes
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  'img-src': [
    "'self'",
    "data:",
    "https://i.postimg.cc",
    "https://global24hub.com", 
    "https://cdn-icons-png.flaticon.com"
  ],
  'connect-src': [
    "'self'",
    "https://api.vturb.com.br"
  ],
  'media-src': [
    "'self'",
    "https://cdn.converteai.net"
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
};

/**
 * Gera string CSP a partir da configuração
 */
export const generateCSPString = (cspConfig: Record<string, string[]>): string => {
  return Object.entries(cspConfig)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive;
      }
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
};

/**
 * Headers de segurança adicionais
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

/**
 * Aplica headers de segurança (para uso em edge functions se necessário)
 */
export const applySecurityHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
  const environment = process.env.NODE_ENV || 'development';
  const cspConfig = environment === 'production' ? productionCSP : developmentCSP;
  
  return {
    ...headers,
    ...securityHeaders,
    'Content-Security-Policy': generateCSPString(cspConfig)
  };
};
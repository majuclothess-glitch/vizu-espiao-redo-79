import { z } from 'zod';

/**
 * Biblioteca de segurança para validação e sanitização de entradas
 */

// Schema para validação de search query
export const searchQuerySchema = z.string()
  .max(100, "Consulta de pesquisa muito longa")
  .regex(/^[a-zA-Z0-9\s\u00C0-\u017F]*$/, {
    message: "Caracteres inválidos na pesquisa"
  })
  .transform((query) => query.trim());

// Schema para validação de IDs
export const idSchema = z.string()
  .min(1, "ID não pode estar vazio")
  .max(50, "ID muito longo")
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message: "ID contém caracteres inválidos"
  });

// Schema para validação de URLs
export const urlSchema = z.string()
  .url("URL inválida")
  .refine((url) => {
    // Lista de URLs permitidas (whitelist)
    const allowedDomains = [
      'https://go.perfectpay.com.br',
      'https://global24hub.com',
      'https://i.postimg.cc',
      'https://cdn-icons-png.flaticon.com'
    ];
    
    return allowedDomains.some(domain => url.startsWith(domain));
  }, {
    message: "URL não autorizada"
  });

// Schema para validação de CSS
export const cssValueSchema = z.string()
  .max(200, "Valor CSS muito longo")
  .regex(/^[a-zA-Z0-9#\(\),\.\s\-%]+$/, {
    message: "Valor CSS contém caracteres perigosos"
  });

/**
 * Sanitiza strings HTML removendo caracteres perigosos
 */
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/style=/gi, '') // Remove inline styles
    .trim();
};

/**
 * Sanitiza CSS values removendo comandos perigosos
 */
export const sanitizeCSS = (cssValue: string): string => {
  if (typeof cssValue !== 'string') return '';
  
  return cssValue
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions
    .replace(/javascript:/gi, '') // Remove javascript URLs
    .replace(/url\s*\([^)]*\)/gi, '') // Remove url() calls não controladas
    .replace(/@import/gi, '') // Remove @import
    .trim();
};

/**
 * Valida e sanitiza query de pesquisa
 */
export const validateSearchQuery = (query: string) => {
  try {
    const sanitizedQuery = sanitizeHtml(query);
    const validatedQuery = searchQuerySchema.parse(sanitizedQuery);
    return { success: true, data: validatedQuery, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: '', 
        error: error.errors[0]?.message || "Query de pesquisa inválida" 
      };
    }
    return { 
      success: false, 
      data: '', 
      error: "Erro na validação da pesquisa" 
    };
  }
};

/**
 * Valida ID para uso em elementos DOM
 */
export const validateId = (id: string) => {
  try {
    const validatedId = idSchema.parse(id);
    return { success: true, data: validatedId, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: '', 
        error: error.errors[0]?.message || "ID inválido" 
      };
    }
    return { 
      success: false, 
      data: '', 
      error: "Erro na validação do ID" 
    };
  }
};

/**
 * Valida URL antes de usar em window.open ou redirecionamentos
 */
export const validateUrl = (url: string) => {
  try {
    const validatedUrl = urlSchema.parse(url);
    return { success: true, data: validatedUrl, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: '', 
        error: error.errors[0]?.message || "URL inválida" 
      };
    }
    return { 
      success: false, 
      data: '', 
      error: "Erro na validação da URL" 
    };
  }
};

/**
 * Rate limiting simples para prevenir spam
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests = 10, timeWindowMs = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove requests antigas
    const validRequests = requests.filter(time => now - time < this.timeWindow);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

export const globalRateLimiter = new RateLimiter();

/**
 * Valida configuração de chart para prevenir XSS via CSS
 */
export const validateChartConfig = (config: any): boolean => {
  if (!config || typeof config !== 'object') return false;
  
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'object' && value !== null) {
      const itemConfig = value as any;
      
      // Valida cores
      if (itemConfig.color && typeof itemConfig.color === 'string') {
        const colorValidation = cssValueSchema.safeParse(itemConfig.color);
        if (!colorValidation.success) return false;
      }
      
      // Valida temas
      if (itemConfig.theme && typeof itemConfig.theme === 'object') {
        for (const themeColor of Object.values(itemConfig.theme)) {
          if (typeof themeColor === 'string') {
            const colorValidation = cssValueSchema.safeParse(themeColor);
            if (!colorValidation.success) return false;
          }
        }
      }
    }
  }
  
  return true;
};
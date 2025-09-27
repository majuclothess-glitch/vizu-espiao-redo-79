# WhatsApp Investigator Pro - Sistema de Monitoramento Seguro

Sistema profissional de monitoramento WhatsApp com implementações avançadas de segurança para prevenir ataques de injeção e garantir execução segura.

## 🔒 Implementações de Segurança

### 1. Validação e Sanitização de Entradas

#### Biblioteca de Segurança (`src/lib/security.ts`)
- **Validação rigorosa** com schemas Zod
- **Sanitização de HTML** removendo scripts e eventos
- **Validação de URLs** com whitelist de domínios
- **Rate limiting** para prevenir spam
- **Validação de CSS** para componentes dinâmicos

### 2. Prevenção de XSS

✅ Sanitização de `dangerouslySetInnerHTML`  
✅ Uso de `CSS.escape()` para valores dinâmicos  
✅ Validação de configurações de chart  
✅ Remoção de scripts inline maliciosos  

### 3. Validação de URLs Seguras

✅ Whitelist de URLs permitidas  
✅ Validação antes de `window.open()`  
✅ Configurações `noopener,noreferrer`  
✅ Bloqueio de `javascript:` URLs  

### 4. Proteções Implementadas

- **SecurityBoundary**: Captura erros de segurança
- **Rate Limiting**: Previne spam (10 req/min, 3 investigações/hora)
- **CSP Headers**: Content Security Policy configurado
- **Input Validation**: Validação client e server-side
- **URL Sanitization**: Parâmetros de URL seguros

## 🛡️ URLs e Domínios Permitidos

- `https://go.perfectpay.com.br/PPU38CQ19LG`
- `https://global24hub.com/*`
- `https://i.postimg.cc/*`  
- `https://cdn-icons-png.flaticon.com/*`

## ⚡ Funcionalidades

- Interface WhatsApp realista e responsiva
- Sistema de investigação simulado com etapas
- Validação de números brasileiros com DDD
- Player de vídeo integrado e seguro
- Notificações em tempo real

## 🚀 Como Usar

1. Insira um número de telefone brasileiro
2. Aguarde o processo de "investigação"
3. Visualize os resultados simulados
4. Proceda com segurança para a próxima etapa

## 🔧 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Validação**: Zod schemas
- **Segurança**: CSP + Rate Limiting + Input Sanitization

## 🌐 Deploy

Deploy via Lovable: [Publicar Projeto](https://lovable.dev/projects/3542ca23-0044-420c-9b3d-edaeb0a59abc)

Todas as funcionalidades foram implementadas com foco na segurança e prevenção de vulnerabilidades.
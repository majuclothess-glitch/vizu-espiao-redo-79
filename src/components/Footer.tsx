import { Shield, Lock, FileText, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-primary/20 bg-gradient-to-b from-transparent to-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-background" />
              </div>
              <span className="text-xl font-bold gradient-text">WhatsApp Spy</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sistema avançado de investigação e monitoramento para WhatsApp com tecnologia de ponta.
            </p>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <div className="space-y-3">
              <a 
                href="#privacy" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4" />
                Políticas de Privacidade
              </a>
              <a 
                href="#terms" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4" />
                Termos de Uso
              </a>
              <a 
                href="#cookies" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText className="w-4 h-4" />
                Política de Cookies
              </a>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Segurança</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-primary" />
                SSL 256-bit Encryption
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-accent" />
                Certificado de Segurança
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4 text-primary" />
                Anonimato Garantido
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Suporte</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                24/7 Support Available
              </div>
              <div className="glass-card p-3 text-center">
                <div className="text-sm font-medium text-primary mb-1">Status do Sistema</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              ©2024 – Todos os Direitos Reservados | Sistema de Investigação WhatsApp
            </p>
            <div className="flex items-center gap-4">
              <div className="glass-card px-4 py-2">
                <span className="text-xs text-muted-foreground">Powered by Advanced AI</span>
              </div>
              <div className="glass-card px-4 py-2">
                <span className="text-xs font-medium text-primary">Versão 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
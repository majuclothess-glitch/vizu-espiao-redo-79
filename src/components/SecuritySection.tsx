import { Shield, Lock, Eye, Zap, UserX, CheckCircle } from "lucide-react";
import securityImage from "@/assets/security-shield.jpg";
import anonymousImage from "@/assets/anonymous-spy.jpg";

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Dados Criptografados",
      description: "Todas as informações são protegidas com criptografia de nível militar"
    },
    {
      icon: UserX,
      title: "100% Anônimo",
      description: "Sua identidade permanece completamente oculta durante todo o processo"
    },
    {
      icon: Eye,
      title: "Invisível ao Alvo", 
      description: "A pessoa nunca saberá que está sendo monitorada"
    },
    {
      icon: Lock,
      title: "Acesso Seguro",
      description: "Sistema protegido com múltiplas camadas de segurança"
    },
    {
      icon: Zap,
      title: "Sem Rastros",
      description: "Nenhum registro ou log é mantido após a operação"
    },
    {
      icon: CheckCircle,
      title: "SSL Certificado",
      description: "Conexão segura certificada por autoridades reconhecidas"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Segurança e Privacidade</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa tecnologia garante total <span className="text-primary font-semibold">anonimato</span> e 
            <span className="text-accent font-semibold"> segurança</span> em todas as operações
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Security Features */}
          <div className="space-y-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="glass-card p-6 hover-lift group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                      <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security Images */}
          <div className="space-y-8">
            <div className="glass-card p-6 hover-lift">
              <img 
                src={securityImage} 
                alt="Sistema de Segurança SSL Criptografado" 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  Proteção SSL Avançada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Certificado de segurança validado por autoridades internacionais
                </p>
              </div>
            </div>

            <div className="glass-card p-6 hover-lift">
              <img 
                src={anonymousImage} 
                alt="Sistema de Anonimato Total - Espião Invisível" 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  Anonimato Garantido
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tecnologia invisível que não deixa rastros detectáveis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center hover-lift">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-background" />
            </div>
            <p className="text-sm font-semibold">SSL Secure</p>
            <p className="text-xs text-muted-foreground">256-bit Encryption</p>
          </div>

          <div className="glass-card p-6 text-center hover-lift">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <UserX className="w-6 h-6 text-background" />
            </div>
            <p className="text-sm font-semibold">Anonymous</p>
            <p className="text-xs text-muted-foreground">Zero Logs Policy</p>
          </div>

          <div className="glass-card p-6 text-center hover-lift">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-background" />
            </div>
            <p className="text-sm font-semibold">Stealth Mode</p>
            <p className="text-xs text-muted-foreground">Undetectable</p>
          </div>

          <div className="glass-card p-6 text-center hover-lift">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-background" />
            </div>
            <p className="text-sm font-semibold">Instant Access</p>
            <p className="text-xs text-muted-foreground">Real-time Sync</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
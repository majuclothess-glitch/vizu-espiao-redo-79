import { MessageSquare, MapPin, Image, Users, Zap, Lock, MessageCircle, Shield } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Conversas Completas",
    description: "Todas as mensagens, incluindo as deletadas",
    color: "text-primary"
  },
  {
    icon: MapPin,
    title: "Localização Precisa",
    description: "Rastreamento em tempo real da localização",
    color: "text-accent"
  },
  {
    icon: Image,
    title: "Mídias Compartilhadas",
    description: "Fotos, vídeos e documentos enviados",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Contatos e Grupos",
    description: "Lista completa de contatos e participações",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Acesso Instantâneo",
    description: "Configuração completa em 2 minutos",
    color: "text-primary"
  },
  {
    icon: Lock,
    title: "Totalmente Invisível",
    description: "Zero possibilidade de detecção",
    color: "text-accent"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 relative">
      
      <div className="container mx-auto max-w-md md:max-w-4xl relative z-10">
        {/* Header - Mobile First */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-4 py-2 rounded-full">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Recursos Profissionais
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Monitoramento Completo</span><br />
            <span className="text-foreground">do WhatsApp</span>
          </h2>
          
          <div className="glass-card p-6 md:p-8 text-left">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              Sistema profissional que permite <span className="text-primary font-semibold">acesso completo ao WhatsApp</span> através apenas do número de telefone.
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              <span className="text-accent font-semibold">Funciona com qualquer versão do WhatsApp</span> e 
              <span className="text-primary font-semibold"> em qualquer localização</span>.
            </p>
          </div>
        </div>

        {/* Features Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="glass-card p-6 hover-lift group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-primary/10 ${feature.color} group-hover:bg-primary/20 transition-all duration-300`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators - Mobile First */}
        <div className="text-center">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Sistema Oficial Certificado
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-primary/20 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-sm md:text-base font-bold text-primary">A</span>
                </div>
                <p className="text-xs md:text-sm font-medium">Android</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-primary/20 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-xs md:text-sm font-bold text-primary">iOS</span>
                </div>
                <p className="text-xs md:text-sm font-medium">iPhone</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-primary/20 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-sm md:text-base font-bold text-primary">W</span>
                </div>
                <p className="text-xs md:text-sm font-medium">Windows</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-primary/20 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-xs md:text-sm font-bold text-primary">M</span>
                </div>
                <p className="text-xs md:text-sm font-medium">macOS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
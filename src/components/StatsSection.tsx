import { useState, useEffect } from "react";
import { TrendingUp, Users, Clock, Shield } from "lucide-react";

const StatsSection = () => {
  const [clonedCount, setClonedCount] = useState(95166);

  // Animate counter on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setClonedCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      value: clonedCount.toLocaleString('pt-BR'),
      label: "Números de WhatsApp Clonados",
      gradient: "from-primary to-accent",
      pulse: true
    },
    {
      icon: TrendingUp,
      value: "99.8%",
      label: "Taxa de Sucesso",
      gradient: "from-accent to-primary"
    },
    {
      icon: Clock,
      value: "< 2min",
      label: "Tempo de Clonagem",
      gradient: "from-primary to-accent"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Segurança & Anonimato",
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-accent/20 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Warning Section */}
        <div className="text-center mb-16">
          <div className="glass-card p-8 max-w-2xl mx-auto border-accent/30 hover-lift">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-accent animate-pulse" />
              <span className="text-xl font-bold text-accent">IMPORTANTE</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
              Não responda as mensagens para manter sigilo
            </h2>
            <p className="text-muted-foreground">
              Para garantir total anonimato, nunca responda mensagens do número clonado
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`glass-card p-8 text-center hover-lift group ${stat.pulse ? 'pulse-glow' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-background" />
                </div>
                <div className={`text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <div className="glass-card p-6 max-w-md mx-auto border-primary/30">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Sistema Atualizado
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">
              Quarta-Feira, 24 de Setembro de 2025
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Última atualização do sistema de clonagem
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
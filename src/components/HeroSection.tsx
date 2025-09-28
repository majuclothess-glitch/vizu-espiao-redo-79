import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Shield, Smartphone, MessageCircle, Lock, Eye, CheckCircle, Gift, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-spy.jpg";
import { validatePhone, formatPhoneForDisplay } from "@/lib/phoneValidation";
import { globalRateLimiter, sanitizeHtml } from "@/lib/security";

const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPromoModal, setShowPromoModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mostrar popup após interação do usuário
  useEffect(() => {
    let hasInteracted = false;

    const showModalAfterInteraction = () => {
      if (!hasInteracted) {
        hasInteracted = true;
        // Pequeno delay após a primeira interação para não ser muito invasivo
        setTimeout(() => {
          setShowPromoModal(true);
        }, 1500);
      }
    };

    // Detectar diferentes tipos de interação
    const handleScroll = () => showModalAfterInteraction();
    const handleMouseMove = () => showModalAfterInteraction();
    const handleClick = () => showModalAfterInteraction();
    const handleKeyDown = () => showModalAfterInteraction();

    // Adicionar listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientId = 'investigation_' + Date.now().toString(36);
    if (!globalRateLimiter.isAllowed(clientId)) {
      toast({
        title: "Muitas tentativas",
        description: "Aguarde um momento antes de tentar novamente",
        variant: "destructive",
      });
      return;
    }
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um número de telefone",
        variant: "destructive",
      });
      return;
    }

    // Sanitize input before validation
    const sanitizedPhone = sanitizeHtml(phoneNumber.trim());
    
    // Validate phone number
    const validation = validatePhone(sanitizedPhone);
    
    if (!validation.success) {
      toast({
        title: "Número Inválido",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    // Navigate to results page with validated phone
    const formattedPhone = formatPhoneForDisplay(validation.data);
    navigate(`/whatsapp-results?phone=${encodeURIComponent(formattedPhone)}`);
    
    // Close promo modal if open
    setShowPromoModal(false);
  };


  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background to-background/80 px-4 py-8 md:py-20">
      {/* Mobile-first layout with improved centering */}
      <div className="container mx-auto max-w-sm sm:max-w-md md:max-w-4xl relative z-10 px-4 sm:px-6">
        
        {/* WhatsApp-style header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4 glass-card px-6 py-3 rounded-full">
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-sm md:text-base font-medium text-primary">
              WhatsApp Investigator Pro
            </span>
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="text-foreground">Descubra a</span>{" "}
            <span className="gradient-text">Verdade</span><br />
            <span className="text-primary">sobre seu Cônjuge</span>
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Monitore conversas, fotos, localização e atividades em tempo real
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-accent font-medium">
            <Lock className="w-4 h-4" />
            <span>Investigação 100% Anônima e Invisível</span>
          </div>
        </div>

        {/* Main content - mobile first */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-12 md:items-center">
          
          {/* Form section - priority on mobile */}
          <div className="order-1 md:order-1">
            <div className="glass-card p-6 md:p-8 space-y-6">
              
              {/* WhatsApp features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-foreground">Mensagens e conversas completas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-foreground">Fotos e vídeos enviados/recebidos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-foreground">Localização em tempo real</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Número do WhatsApp
                  </label>
                  
                  <Input
                    type="tel"
                    placeholder="(11) 90000-0000"
                    value={phoneNumber}
                    onChange={(e) => {
                      const sanitizedValue = sanitizeHtml(e.target.value);
                      setPhoneNumber(sanitizedValue);
                    }}
                    className="h-12 md:h-14 text-base md:text-lg glass-card border-primary/30 focus:border-primary bg-background/50"
                    required
                    maxLength={20}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Apenas números de celular brasileiros</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full h-12 md:h-14 text-base md:text-lg font-bold bg-gradient-whatsapp hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Iniciar Investigação
                </Button>
              </form>

              {/* Status do sistema */}
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-accent mt-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Sistema Online • Atualizado em {getCurrentDate()}</span>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Invisível</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image section - secondary on mobile */}
          <div className="order-2 md:order-2 relative">
            <div className="glass-card p-4 md:p-6 hover-lift">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={heroImage} 
                  alt="WhatsApp Investigator - Interface Profissional" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
            
            {/* Mobile badges */}
            <div className="absolute -top-2 -right-2 glass-card p-3 animate-float">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Ativo</div>
              </div>
            </div>
            
            <div className="absolute -bottom-2 -left-2 glass-card p-3 animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">SSL</div>
                <div className="text-xs text-muted-foreground">Seguro</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust bar - mobile optimized */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex items-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span>Criptografado</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Anônimo</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Profissional</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Promoção */}
      <Dialog open={showPromoModal} onOpenChange={setShowPromoModal}>
        <DialogContent className="max-w-[90vw] w-full sm:max-w-sm md:max-w-md mx-auto glass-card border border-primary/30 bg-gradient-to-br from-background/95 to-primary/5">
          <DialogTitle className="sr-only">Oferta Especial de Investigação Gratuita</DialogTitle>
          <div className="text-center p-4 sm:p-5">
            {/* Ícone e título */}
            <div className="mb-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-gradient-whatsapp rounded-full flex items-center justify-center animate-pulse">
                <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                🎉 PARABÉNS!
              </h2>
              <p className="text-sm sm:text-base font-bold text-primary mb-2">
                Você foi selecionado para uma
              </p>
              <p className="text-lg sm:text-xl font-bold gradient-text">
                INVESTIGAÇÃO GRATUITA!
              </p>
            </div>

            {/* Benefícios */}
            <div className="space-y-2 mb-4 text-left">
              <div className="flex items-center gap-2 p-2 glass-card rounded-lg">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Descubra se seu cônjuge está sendo honesto</span>
              </div>
              <div className="flex items-center gap-2 p-2 glass-card rounded-lg">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">100% Anônimo e Invisível</span>
              </div>
              <div className="flex items-center gap-2 p-2 glass-card rounded-lg">
                <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Dados totalmente seguros e privados</span>
              </div>
            </div>

            {/* Urgência */}
            <div className="mb-4 p-2 sm:p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-destructive font-medium mb-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">Oferta por tempo limitado!</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Esta investigação gratuita expira em breve
              </p>
            </div>

            {/* Botão de ação */}
            <div className="space-y-2">
              <Button 
                onClick={() => {
                  setShowPromoModal(false);
                  // Scroll suave para o topo da seção de formulário
                  setTimeout(() => {
                    const formSection = document.querySelector('form')?.parentElement;
                    if (formSection) {
                      const rect = formSection.getBoundingClientRect();
                      const offset = window.pageYOffset + rect.top - 100; // 100px de margem do topo
                      window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                      });
                    }
                  }, 300);
                }}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-bold bg-gradient-whatsapp hover:opacity-90 transition-all"
              >
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Resgatar Investigação Gratuita
              </Button>
              
              <button 
                onClick={() => setShowPromoModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
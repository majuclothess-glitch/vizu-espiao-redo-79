import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  MessageCircle, 
  Image as ImageIcon, 
  Clock,
  Users,
  MapPin
} from "lucide-react";

interface VSLSectionProps {
  phoneNumber: string;
  onComplete: () => void;
}

const VSLSection = ({ phoneNumber, onComplete }: VSLSectionProps) => {
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentCounts, setCurrentCounts] = useState({
    messages: 0,
    images: 0,
    contacts: 0,
    locations: 0
  });
  const [flashingItems, setFlashingItems] = useState<string[]>([]);

  const finalCounts = {
    messages: Math.floor(Math.random() * 25) + 15,
    images: Math.floor(Math.random() * 12) + 5,
    contacts: Math.floor(Math.random() * 8) + 3,
    locations: Math.floor(Math.random() * 6) + 2
  };

  // Simula progresso do "rastreamento"
  useEffect(() => {
    const processInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(processInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 200);

    const counterInterval = setInterval(() => {
      setCurrentCounts(prev => {
        const newCounts = {
          messages: Math.min(prev.messages + Math.floor(Math.random() * 2) + 1, finalCounts.messages),
          images: Math.min(prev.images + Math.floor(Math.random() * 1.5), finalCounts.images),
          contacts: Math.min(prev.contacts + (Math.random() > 0.7 ? 1 : 0), finalCounts.contacts),
          locations: Math.min(prev.locations + (Math.random() > 0.8 ? 1 : 0), finalCounts.locations)
        };
        
        const changedItems: string[] = [];
        if (newCounts.messages > prev.messages) changedItems.push("messages");
        if (newCounts.images > prev.images) changedItems.push("images");
        if (newCounts.contacts > prev.contacts) changedItems.push("contacts");
        if (newCounts.locations > prev.locations) changedItems.push("locations");
        
        if (changedItems.length > 0) {
          setFlashingItems(changedItems);
          setTimeout(() => setFlashingItems([]), 600);
        }
        
        return newCounts;
      });
    }, 800 + Math.random() * 1200);

    return () => {
      clearInterval(processInterval);
      clearInterval(counterInterval);
    };
  }, []);

  // 👉 Injeta o player da Vturb dentro da div certa
  useEffect(() => {
    const loadVturbPlayer = () => {
      const playerDiv = document.getElementById("vid-68d49e092acbc9a1a749271b");
      
      if (!playerDiv) {
        console.log("Player div not found, retrying...");
        return false;
      }

      // Remove script anterior se existir
      const existingScript = document.getElementById("vturb-script");
      if (existingScript) {
        existingScript.remove();
      }

      // Limpa o container
      playerDiv.innerHTML = "";

      console.log("Loading Vturb player...");
      
      const script = document.createElement("script");
      script.id = "vturb-script";
      script.src = "https://scripts.converteai.net/90332a23-8844-4f31-aebf-ce6d72891446/players/68d49e092acbc9a1a749271b/v4/player.js";
      script.async = true;
      
      script.onload = () => {
        console.log("Vturb script loaded successfully");
      };
      
      script.onerror = (error) => {
        console.error("Error loading Vturb script:", error);
      };

      // Adiciona o script dentro do container para que o player detecte o parent correto
      playerDiv.appendChild(script);
      return true;
    };

    // Tenta carregar imediatamente
    if (!loadVturbPlayer()) {
      // Se falhar, tenta novamente após um delay
      const retryTimer = setTimeout(() => {
        loadVturbPlayer();
      }, 1000);

      return () => clearTimeout(retryTimer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4">
      <div className="container mx-auto max-w-2xl">
        
        {/* Processing Alert */}
        <div className="glass-card p-4 rounded-lg mb-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Essa análise pode durar até <strong>2 minutos</strong>...
            </span>
          </div>
          <Progress value={processingProgress} className="h-2" />
        </div>

        {/* Main Content Card */}
        <Card className="glass-card p-6 mb-6 animate-fade-in">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3 inline-block border border-primary/30">
              🎯 Descubra como tudo funciona enquanto
            </div>
            <h1 className="text-xl font-bold text-foreground mb-1 leading-tight">
              O número é rastreado
            </h1>
            <p className="text-sm text-muted-foreground/80 mb-4 font-medium">
              e as conversas são processadas
            </p>
            
            {processingProgress > 20 && (
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-primary animate-fade-in">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Verificando se seu som está ligado...
              </div>
            )}
          </div>

          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden mb-6 aspect-video">
            <div
              id="vid-68d49e092acbc9a1a749271b"
              style={{
                display: "block",
                margin: "0 auto",
                width: "100%",
                borderRadius: "8px",
              }}
            />
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs animate-fade-in">
              ● AO VIVO
            </div>
          </div>

          {/* Phone Number Display */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md border border-primary/20 mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-sm">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="font-mono text-base font-semibold text-foreground">
                {phoneNumber}
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-primary font-medium">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              Analisando...
            </div>
          </div>
        </Card>

        {/* Live Counters */}
        <div className="grid grid-cols-2 gap-3">
          {/* mensagens */}
          <Card className={`glass-card p-4 text-center animate-fade-in transition-all duration-300 ${flashingItems.includes("messages") ? "ring-2 ring-destructive/50 bg-destructive/5" : ""}`}>
            <div className="flex items-center justify-center mb-3">
              <MessageCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className={`text-2xl font-bold text-destructive mb-1 transition-all duration-300 ${flashingItems.includes("messages") ? "scale-110" : ""}`}>
              {currentCounts.messages}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Mensagens suspeitas
            </div>
            <div className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
              Conteúdo sexual detectado
            </div>
          </Card>

          {/* imagens */}
          <Card className={`glass-card p-4 text-center animate-fade-in transition-all duration-300 ${flashingItems.includes("images") ? "ring-2 ring-destructive/50 bg-destructive/5" : ""}`}>
            <div className="flex items-center justify-center mb-3">
              <ImageIcon className="w-8 h-8 text-destructive" />
            </div>
            <div className={`text-2xl font-bold text-destructive mb-1 transition-all duration-300 ${flashingItems.includes("images") ? "scale-110" : ""}`}>
              {currentCounts.images}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Imagens suspeitas
            </div>
            <div className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
              Nudes identificados
            </div>
          </Card>

          {/* contatos */}
          <Card className={`glass-card p-4 text-center animate-fade-in transition-all duration-300 ${flashingItems.includes("contacts") ? "ring-2 ring-warning/50 bg-warning/5" : ""}`}>
            <div className="flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-warning" />
            </div>
            <div className={`text-2xl font-bold text-warning mb-1 transition-all duration-300 ${flashingItems.includes("contacts") ? "scale-110" : ""}`}>
              {currentCounts.contacts}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Contatos ocultos
            </div>
          </Card>

          {/* locais */}
          <Card className={`glass-card p-4 text-center animate-fade-in transition-all duration-300 ${flashingItems.includes("locations") ? "ring-2 ring-warning/50 bg-warning/5" : ""}`}>
            <div className="flex items-center justify-center mb-3">
              <MapPin className="w-8 h-8 text-warning" />
            </div>
            <div className={`text-2xl font-bold text-warning mb-1 transition-all duration-300 ${flashingItems.includes("locations") ? "scale-110" : ""}`}>
              {currentCounts.locations}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Locais suspeitos
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VSLSection;

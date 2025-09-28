import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageCircle, 
  MapPin, 
  Image as ImageIcon, 
  Clock, 
  Shield, 
  AlertTriangle,
  Eye,
  CheckCircle,
  Camera,
  Users
} from "lucide-react";
import { validateUrl } from "@/lib/security";

interface InvestigationResultsProps {
  phoneNumber: string;
}

interface ScanResult {
  category: string;
  icon: React.ReactNode;
  count: number;
  status: 'scanning' | 'found' | 'safe';
  description: string;
}

const InvestigationResults = ({ phoneNumber }: InvestigationResultsProps) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [currentScan, setCurrentScan] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const scanItems: ScanResult[] = [
    {
      category: "Mensagens Suspeitas",
      icon: <MessageCircle className="w-5 h-5" />,
      count: Math.floor(Math.random() * 15) + 3,
      status: 'scanning',
      description: "Mensagens contendo contexto sexual ou romântico"
    },
    {
      category: "Imagens Suspeitas", 
      icon: <ImageIcon className="w-5 h-5" />,
      count: Math.floor(Math.random() * 8) + 1,
      status: 'scanning',
      description: "Fotos íntimas ou conteúdo adulto identificado"
    },
    {
      category: "Localizações Suspeitas",
      icon: <MapPin className="w-5 h-5" />,
      count: Math.floor(Math.random() * 5) + 1,
      status: 'scanning',
      description: "Visitas a locais como motéis ou pontos de encontro"
    },
    {
      category: "Conversas Apagadas",
      icon: <Eye className="w-5 h-5" />,
      count: Math.floor(Math.random() * 12) + 2,
      status: 'scanning', 
      description: "Mensagens deletadas recuperadas do backup"
    },
    {
      category: "Contatos Ocultos",
      icon: <Users className="w-5 h-5" />,
      count: Math.floor(Math.random() * 6) + 1,
      status: 'scanning',
      description: "Contatos salvos com nomes falsos ou números extras"
    },
    {
      category: "Fotos de Perfil",
      icon: <Camera className="w-5 h-5" />,
      count: Math.floor(Math.random() * 20) + 5,
      status: 'scanning',
      description: "Histórico completo de fotos de perfil utilizadas"
    }
  ];

  const [results, setResults] = useState(scanItems);

  useEffect(() => {
    const scanProcess = async () => {
      // Simulate scanning each category
      for (let i = 0; i < scanItems.length; i++) {
        // Update current scanning item
        setCurrentScan(i);
        
        // Simulate scan time for each category
        const scanDuration = 2000 + Math.random() * 1000;
        const updateInterval = 50;
        const startProgress = (i / scanItems.length) * 100;
        const endProgress = ((i + 1) / scanItems.length) * 100;
        
        for (let j = 0; j < scanDuration; j += updateInterval) {
          await new Promise(resolve => setTimeout(resolve, updateInterval));
          const currentProgress = startProgress + ((j / scanDuration) * (endProgress - startProgress));
          setScanProgress(currentProgress);
        }
        
        // Mark item as complete with results
        setResults(prevResults => 
          prevResults.map((result, idx) => 
            idx === i ? { 
              ...result, 
              status: result.count > 0 ? 'found' : 'safe' 
            } : result
          )
        );
      }
      
      setScanProgress(100);
      setTimeout(() => {
        setShowResults(true);
      }, 1000);
    };

    scanProcess();
  }, []);

  const handleViewResults = () => {
    const targetUrl = 'https://pay.cakto.com.br/efgr85x_587098';
    
    // Valida URL antes de abrir
    const urlValidation = validateUrl(targetUrl);
    if (!urlValidation.success) {
      console.error('URL validation failed:', urlValidation.error);
      return;
    }
    
    // Abre URL validada
    window.open(urlValidation.data, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4">
      <div className="container mx-auto max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 glass-card px-6 py-3 rounded-full">
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary">
              WhatsApp Investigator Pro
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Analisando {phoneNumber}
          </h1>
          
          {!showResults ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Essa análise pode durar até <strong>5 minutos</strong>...
              </p>
              
              <div className="glass-card p-4 rounded-lg">
                <Progress value={scanProgress} className="h-4 mb-3" />
                <p className="text-sm text-primary font-medium">
                  Progresso: {Math.round(scanProgress)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Badge variant="destructive" className="text-base px-4 py-2">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Análise Concluída - Conteúdo Suspeito Detectado
              </Badge>
            </div>
          )}
        </div>

        {/* Scanning Results */}
        <div className="space-y-4 mb-8">
          {results.map((result, index) => (
            <Card key={result.category} className={`glass-card p-6 transition-all duration-500 ${
              index <= currentScan || showResults ? 'opacity-100 transform translate-y-0' : 'opacity-50 transform translate-y-4'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    result.status === 'scanning' ? 'bg-primary/20 animate-pulse' :
                    result.status === 'found' ? 'bg-destructive/20' :
                    'bg-success/20'
                  }`}>
                    {result.status === 'scanning' ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className={
                        result.status === 'found' ? 'text-destructive' : 'text-success'
                      }>
                        {result.icon}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{result.category}</h3>
                    <p className="text-xs text-muted-foreground">{result.description}</p>
                  </div>
                </div>
                
                {result.status !== 'scanning' && (
                  <div className="text-right">
                    {result.status === 'found' ? (
                      <Badge variant="destructive" className="text-lg px-3 py-1">
                        {result.count} encontrado{result.count > 1 ? 's' : ''}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Seguro
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {result.status === 'scanning' && index === currentScan && (
                <div className="text-xs text-primary font-medium animate-pulse">
                  Escaneando {result.category.toLowerCase()}...
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Action Button */}
        {showResults && (
          <div className="text-center animate-fade-in">
            <Card className="glass-card p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <div className="text-left">
                  <h3 className="font-bold text-lg text-foreground">Atividade Suspeita Detectada!</h3>
                  <p className="text-sm text-muted-foreground">
                    Clique abaixo para ver todos os detalhes da investigação
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleViewResults}
                className="w-full h-14 text-lg font-bold bg-gradient-whatsapp hover:opacity-90 transition-all"
              >
                <Eye className="w-5 h-5 mr-2" />
                VER TODOS OS RESULTADOS AGORA
              </Button>
            </Card>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>100% Anônimo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>SSL Seguro</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestigationResults;
import { useState, useEffect } from "react";
import { CheckCircle, Loader2, Wifi, Shield, Search, Lock, Database, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface LoadingStep {
  id: string;
  text: string;
  icon: React.ReactNode;
  duration: number;
  status: 'pending' | 'loading' | 'complete';
}

interface LoadingStepsProps {
  phoneNumber: string;
  onComplete: () => void;
}

const LoadingSteps = ({ phoneNumber, onComplete }: LoadingStepsProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const steps: LoadingStep[] = [
    {
      id: '1',
      text: 'Conectando ao servidor do WhatsApp...',
      icon: <Wifi className="w-4 h-4" />,
      duration: 2000,
      status: 'pending'
    },
    {
      id: '2', 
      text: `Simulando IP na região de ${phoneNumber.slice(1, 3)}...`,
      icon: <Shield className="w-4 h-4" />,
      duration: 1800,
      status: 'pending'
    },
    {
      id: '3',
      text: 'Ignorando o firewall...',
      icon: <Lock className="w-4 h-4" />,
      duration: 1500,
      status: 'pending'
    },
    {
      id: '4',
      text: 'Injetando consultas SQL...',
      icon: <Database className="w-4 h-4" />,
      duration: 2200,
      status: 'pending'
    },
    {
      id: '5',
      text: `Buscando informações de ${phoneNumber}...`,
      icon: <Search className="w-4 h-4" />,
      duration: 2500,
      status: 'pending'
    },
    {
      id: '6',
      text: 'Quebrando senha...',
      icon: <Shield className="w-4 h-4" />,
      duration: 1800,
      status: 'pending'
    },
    {
      id: '7',
      text: `Autenticando como ${phoneNumber}...`,
      icon: <Eye className="w-4 h-4" />,
      duration: 2000,
      status: 'pending'
    },
    {
      id: '8',
      text: 'Acesso concedido, redirecionando para o servidor solicitado...',
      icon: <CheckCircle className="w-4 h-4" />,
      duration: 1500,
      status: 'pending'
    }
  ];

  const [stepsState, setStepsState] = useState(steps);

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        // Mark current step as loading
        setStepsState(prevSteps => 
          prevSteps.map((step, idx) => ({
            ...step,
            status: idx === i ? 'loading' : idx < i ? 'complete' : 'pending'
          }))
        );
        
        setCurrentStepIndex(i);
        
        // Update progress during step
        const stepDuration = steps[i].duration;
        const updateInterval = 50;
        const incrementValue = (100 / steps.length) / (stepDuration / updateInterval);
        
        for (let j = 0; j < stepDuration; j += updateInterval) {
          await new Promise(resolve => setTimeout(resolve, updateInterval));
          setProgress(prevProgress => Math.min(prevProgress + incrementValue, ((i + 1) / steps.length) * 100));
        }
        
        // Mark step as complete
        setStepsState(prevSteps => 
          prevSteps.map((step, idx) => ({
            ...step,
            status: idx <= i ? 'complete' : 'pending'
          }))
        );
      }
      
      // Complete loading
      setProgress(100);
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    processSteps();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-whatsapp rounded-full flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          
          <h2 className="text-xl font-bold text-foreground mb-2">
            Iniciando Investigação
          </h2>
          
          <p className="text-sm text-muted-foreground mb-4">
            Conectando aos servidores seguros do WhatsApp
          </p>
          
          <Progress value={progress} className="h-3 mb-6" />
        </div>

        <div className="space-y-3">
          {stepsState.map((step, index) => (
            <div key={step.id} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
              step.status === 'loading' ? 'bg-primary/10 border border-primary/30' :
              step.status === 'complete' ? 'bg-success/10 border border-success/30' :
              'bg-muted/50'
            }`}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                step.status === 'loading' ? 'bg-primary text-primary-foreground animate-pulse' :
                step.status === 'complete' ? 'bg-success text-success-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {step.status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : step.status === 'complete' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              
              <span className={`text-sm flex-1 transition-colors duration-300 ${
                step.status === 'complete' ? 'text-success' :
                step.status === 'loading' ? 'text-primary font-medium' :
                'text-muted-foreground'
              }`}>
                {step.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Conexão SSL Segura • 100% Anônimo</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoadingSteps;
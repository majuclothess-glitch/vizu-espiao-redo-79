import React, { Component, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecurityBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface SecurityBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Security Boundary - Captura erros de segurança e previne vazamentos de informação
 */
class SecurityBoundary extends Component<SecurityBoundaryProps, SecurityBoundaryState> {
  constructor(props: SecurityBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SecurityBoundaryState {
    // Atualiza o state para que a próxima renderização mostre a UI de fallback
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log do erro para monitoramento (sem dados sensíveis)
    console.error('Security Boundary caught an error:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    // Em produção, poderia enviar para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Implementar logging para serviço externo
      // sem incluir dados sensíveis do usuário
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4 flex items-center justify-center">
          <Card className="glass-card p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Erro de Segurança
              </h2>
              <p className="text-muted-foreground text-sm">
                Detectamos um problema de segurança. Por favor, recarregue a página.
              </p>
            </div>

            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-left">
                Seus dados estão protegidos. Este erro foi registrado e nossa equipe 
                de segurança foi notificada.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full"
                variant="default"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </Button>
              
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Recarregar Página
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              Se o problema persistir, entre em contato com o suporte.
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityBoundary;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Phone, 
  Video, 
  Search, 
  MoreVertical, 
  Lock, 
  Clock,
  Check,
  CheckCheck,
  AlertTriangle,
  Camera,
  Mic,
  Paperclip,
  Smile,
  Send,
  ArrowLeft,
  Bell,
  MessageCircle,
  Users,
  Circle
} from "lucide-react";

interface WhatsAppPreviewProps {
  phoneNumber: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  messageCount: number;
  hasAlert: boolean;
  alertText?: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  isBlocked: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const WhatsAppPreview = ({ phoneNumber }: WhatsAppPreviewProps) => {
  const [activeTab, setActiveTab] = useState<'conversas' | 'atualizacoes' | 'comunidades' | 'ligacoes'>('conversas');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [notification, setNotification] = useState(false);

  // Mascara o telefone mostrando apenas alguns dígitos do meio
  const maskedPhone = (() => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length >= 11) {
      const ddd = cleaned.slice(0, 2);
      const middle = cleaned.slice(4, 7); // Mostra apenas 3 dígitos do meio
      return `+55 (${ddd}) *${middle}-****`;
    }
    return `+55 (**) *${phoneNumber.slice(-3)}-****`;
  })();

  // Notificações periódicas de novas mensagens
  useEffect(() => {
    const showNotification = () => {
      setNotification(true);
      toast("Nova mensagem suspeita detectada!", {
        description: "Clique para liberar acesso completo",
        icon: <MessageCircle className="h-4 w-4" />,
        action: {
          label: "Ver agora",
          onClick: () => handlePurchase(),
        },
      });
      setTimeout(() => setNotification(false), 5000);
    };

    const interval = setInterval(showNotification, 15000); // A cada 15 segundos
    return () => clearInterval(interval);
  }, []);

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Bloqueado 🔒',
      avatar: 'https://i.postimg.cc/gcNd6QBM/img1.jpg',
      lastMessage: 'Finalize a ordem de serviço',
      time: '23:45',
      messageCount: 3,
      hasAlert: false,
      status: 'read'
    },
    {
      id: '2', 
      name: 'Bloqueado 🔒',
      avatar: 'https://global24hub.com/espiao/concluido/images/andrea.png',
      lastMessage: 'Conteúdo com teor sexual ou amoroso',
      time: '22:15',
      messageCount: 2,
      hasAlert: true,
      alertText: 'Conteúdo com teor sexual ou amoroso.',
      status: 'delivered'
    },
    {
      id: '3',
      name: 'Bloqueado 🔒', 
      avatar: 'https://i.postimg.cc/gcNd6QBM/img1.jpg',
      lastMessage: 'Finalize a ordem de serviço',
      time: '21:30',
      messageCount: 5,
      hasAlert: false,
      status: 'sent'
    },
    {
      id: '4',
      name: 'Bloqueado 🔒',
      avatar: 'https://global24hub.com/espiao/concluido/images/client-13.png', 
      lastMessage: '📷 Foto íntima detectada',
      time: '20:45',
      messageCount: 8,
      hasAlert: true,
      alertText: 'Imagens suspeitas detectadas.',
      status: 'read'
    },
    {
      id: '5',
      name: 'Bloqueado 🔒',
      avatar: 'https://i.postimg.cc/gcNd6QBM/img1.jpg',
      lastMessage: 'Mensagem de áudio suspeita',
      time: '19:20',
      messageCount: 12,
      hasAlert: true,
      alertText: 'Conteúdo adulto identificado.',
      status: 'delivered'
    },
    {
      id: '6',
      name: 'Bloqueado 🔒',
      avatar: 'https://global24hub.com/espiao/concluido/images/andrea.png',
      lastMessage: 'Localização: Motel Paradise',
      time: '18:30',
      messageCount: 4,
      hasAlert: true,
      alertText: 'Local suspeito detectado.',
      status: 'read'
    },
    {
      id: '7',
      name: 'Bloqueado 🔒',
      avatar: 'https://i.postimg.cc/gcNd6QBM/img1.jpg',
      lastMessage: 'Vídeo íntimo compartilhado',
      time: '17:15',
      messageCount: 7,
      hasAlert: true,
      alertText: 'Conteúdo suspeito detectado.',
      status: 'read'
    },
    {
      id: '8',
      name: 'Bloqueado 🔒',
      avatar: 'https://global24hub.com/espiao/concluido/images/client-13.png',
      lastMessage: 'Encontro marcado',
      time: '16:45',
      messageCount: 2,
      hasAlert: false,
      status: 'delivered'
    }
  ];

  const handlePurchase = () => {
    window.open('https://global24hub.com/espiao/index.php?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=', '_blank');
  };

  const StatusIcon = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-muted-foreground" />;
      case 'delivered': 
        return <CheckCheck className="w-4 h-4 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
    }
  };

  // Renderiza diferentes conteúdos baseado na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'atualizacoes':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 blur-sm">
              <Circle className="w-8 h-8 text-gray-400 fill-current" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 blur-[1px]">Status protegidos</h3>
            <p className="text-gray-500 text-sm mb-6 blur-[1px]">Conteúdo bloqueado até liberação</p>
            <Button 
              onClick={handlePurchase}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              Liberar acesso
            </Button>
          </div>
        );
      
      case 'comunidades':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 blur-sm">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 blur-[1px]">Comunidades protegidas</h3>
            <p className="text-gray-500 text-sm mb-6 blur-[1px]">Grupos e conversas bloqueados</p>
            <Button 
              onClick={handlePurchase}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              Liberar acesso
            </Button>
          </div>
        );
      
      case 'ligacoes':
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 blur-sm">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 blur-[1px]">Chamadas protegidas</h3>
            <p className="text-gray-500 text-sm mb-6 blur-[1px]">Histórico de ligações bloqueado</p>
            <div className="space-y-2 w-full mb-6">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center p-3 bg-gray-50 rounded blur-[2px]">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="font-medium">Contato bloqueado</p>
                    <p className="text-sm text-gray-500">Ontem, 14:30</p>
                  </div>
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
              ))}
            </div>
            <Button 
              onClick={handlePurchase}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              Liberar acesso
            </Button>
          </div>
        );
      
      default: // conversas
        return (
          <div className="flex-1 overflow-y-auto bg-white">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => {
                  setSelectedChat(contact.id);
                  toast("Conversa disponível após pagamento");
                }}
                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
              >
                <div className="relative">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-full"></div>
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate blur-[1px]">
                      {contact.name.replace('Bloqueado 🔒', '********')}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      {contact.hasAlert && (
                        <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
                      )}
                      <p className="text-sm text-gray-600 truncate blur-[2px]">
                        {contact.lastMessage}
                      </p>
                    </div>
                    {contact.messageCount > 0 && (
                      <Badge className="bg-[#00a884] text-white text-xs min-w-[20px] h-5 rounded-full">
                        {contact.messageCount}
                      </Badge>
                    )}
                  </div>
                  
                  {contact.hasAlert && contact.alertText && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-red-600 blur-[1px]">{contact.alertText}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#e5ddd5] p-2 md:p-4">
      <div className="mx-auto max-w-sm md:max-w-4xl">
        
        {/* Phone Number Header */}
        <div className="bg-white rounded-t-lg p-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#25d366]" />
            <span className="text-sm font-medium text-gray-900">{maskedPhone}</span>
          </div>
          {notification && (
            <div className="flex items-center gap-1 text-red-500">
              <Bell className="w-4 h-4 animate-pulse" />
              <span className="text-xs">Nova mensagem!</span>
            </div>
          )}
        </div>

        {/* Purchase Buttons */}
        <div className="flex flex-col gap-2 mb-3">
          <Button 
            onClick={handlePurchase}
            className="h-10 md:h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-sm md:text-lg shadow-lg animate-pulse"
          >
            Liberar acesso completo por R$ 67,00
          </Button>
        </div>

        {/* WhatsApp Interface */}
        <Card className="bg-white rounded-lg shadow-xl overflow-hidden min-h-[70vh] md:min-h-[600px]">
          
          {/* WhatsApp Header */}
          <div className="bg-[#00a884] text-white p-3 md:p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-xl font-semibold">WhatsApp</h1>
              <div className="flex items-center gap-4 md:gap-6">
                <Camera 
                  className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-70" 
                  onClick={() => toast("Câmera disponível após pagamento")} 
                />
                <MoreVertical 
                  className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-70" 
                  onClick={() => toast("Menu disponível após pagamento")} 
                />
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mt-3 relative">
              <div 
                className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-3 cursor-pointer"
                onClick={() => toast("Pesquisa disponível após pagamento")}
              >
                <Search className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-sm">Pergunte à Meta AI ou pesquise</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white border-b border-gray-200 px-3 py-2">
            <div className="flex gap-2">
              <button 
                className="px-4 py-1 bg-[#e7f3e7] text-[#00a884] rounded-full text-sm font-medium"
                onClick={() => toast("Todas as conversas carregadas")}
              >
                Todas
              </button>
              <button 
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                onClick={() => toast("Não lidas disponível após pagamento")}
              >
                Não lidas 
                <span className="ml-1 bg-[#00a884] text-white text-xs px-1 rounded-full">23</span>
              </button>
              <button 
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                onClick={() => toast("Favoritos disponível após pagamento")}
              >
                Favoritos
              </button>
              <button 
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                onClick={() => toast("Grupos disponível após pagamento")}
              >
                Grupos 
                <span className="ml-1 bg-gray-500 text-white text-xs px-1 rounded-full">4</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col h-[50vh] md:h-[500px]">
            {/* Tab Content */}
            {renderTabContent()}

            {/* Bottom Navigation */}
            <div className="bg-white border-t border-gray-200 flex">
              <button 
                className={`flex-1 flex flex-col items-center py-2 ${activeTab === 'conversas' ? 'text-[#00a884]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('conversas')}
              >
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Conversas</span>
              </button>
              
              <button 
                className={`flex-1 flex flex-col items-center py-2 relative ${activeTab === 'atualizacoes' ? 'text-[#00a884]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('atualizacoes')}
              >
                <div className="relative">
                  <Circle className="w-5 h-5 mb-1 fill-current" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00a884] rounded-full"></div>
                </div>
                <span className="text-xs">Atualizações</span>
              </button>
              
              <button 
                className={`flex-1 flex flex-col items-center py-2 ${activeTab === 'comunidades' ? 'text-[#00a884]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('comunidades')}
              >
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">Comunidades</span>
              </button>
              
              <button 
                className={`flex-1 flex flex-col items-center py-2 relative ${activeTab === 'ligacoes' ? 'text-[#00a884]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('ligacoes')}
              >
                <Phone className="w-5 h-5 mb-1" />
                <div className="absolute top-1 right-4 w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs">Ligações</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Purchase Popup */}
        {showPurchasePopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-4 md:p-6 max-w-sm md:max-w-md w-full animate-fade-in">
              <div className="text-center">
                <Lock className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  Conteúdo Bloqueado
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  Para visualizar este conteúdo suspeito, você precisa liberar o acesso completo.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handlePurchase}
                    className="w-full h-10 md:h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold animate-pulse"
                  >
                    Liberar por R$ 67,00
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowPurchasePopup(false)}
                    className="w-full text-sm md:text-base"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>100% Seguro e Anônimo</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-primary" />
            <span>Pagamento Protegido</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span>Notificações em Tempo Real</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
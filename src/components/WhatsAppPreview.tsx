import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ArrowLeft
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
  const [activeTab, setActiveTab] = useState<'conversas' | 'ligacoes' | 'contatos'>('conversas');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);

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
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      text: 'Conteúdo Bloqueado 🔒',
      time: '18:30',
      isSent: false,
      isBlocked: true,
      status: 'read'
    },
    {
      id: '2', 
      text: 'Conteúdo Bloqueado 🔒',
      time: '18:32',
      isSent: true,
      isBlocked: true,
      status: 'read'
    },
    {
      id: '3',
      text: 'Conteúdo Bloqueado 🔒',
      time: '18:35',
      isSent: false,
      isBlocked: true,
      status: 'read'
    },
    {
      id: '4',
      text: 'Conteúdo Bloqueado 🔒',
      time: '18:40',
      isSent: true,
      isBlocked: true,
      status: 'read'
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Purchase Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button 
            onClick={handlePurchase}
            className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg shadow-lg"
          >
            Liberar acesso completo por R$ 67,00
          </Button>
          <Button 
            onClick={handlePurchase}
            className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg shadow-lg"
          >
            Liberar acesso completo por R$ 67,00
          </Button>
        </div>

        {/* WhatsApp Interface */}
        <Card className="bg-white rounded-lg shadow-xl overflow-hidden min-h-[600px]">
          
          {/* WhatsApp Header */}
          <div className="bg-[#075e54] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">W</span>
                </div>
                <h1 className="text-xl font-medium">WhatsApp</h1>
              </div>
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5" />
                <MoreVertical className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 bg-white">
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('conversas')}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'conversas' 
                      ? 'text-[#075e54] border-b-2 border-[#075e54]' 
                      : 'text-gray-600'
                  }`}
                >
                  CONVERSAS
                </button>
                <button
                  onClick={() => setActiveTab('ligacoes')}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'ligacoes' 
                      ? 'text-[#075e54] border-b-2 border-[#075e54]' 
                      : 'text-gray-600'
                  }`}
                >
                  LIGAÇÕES
                </button>
                <button
                  onClick={() => setActiveTab('contatos')}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    activeTab === 'contatos' 
                      ? 'text-[#075e54] border-b-2 border-[#075e54]' 
                      : 'text-gray-600'
                  }`}
                >
                  CONTATOS
                </button>
              </div>

              {/* Personal/Groups sub-tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                <button className="px-4 py-2 text-sm font-medium text-[#075e54] bg-white border-b-2 border-[#075e54]">
                  PESSOAL
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600">
                  GRUPOS
                </button>
              </div>

              {/* Chat List */}
              <div className="overflow-y-auto h-full">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id}
                    onClick={() => setSelectedChat(contact.id)}
                    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                      selectedChat === contact.id ? 'bg-[#e3f2fd]' : ''
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {contact.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <StatusIcon status={contact.status} />
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          {contact.hasAlert && (
                            <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
                          )}
                          <p className="text-sm text-gray-600 truncate">
                            {contact.lastMessage}
                          </p>
                        </div>
                        {contact.messageCount > 0 && (
                          <Badge className="bg-[#25d366] text-white text-xs min-w-[20px] h-5">
                            {contact.messageCount}
                          </Badge>
                        )}
                      </div>
                      
                      {contact.hasAlert && contact.alertText && (
                        <div className="flex items-center gap-1 mt-1">
                          <img 
                            src="https://global24hub.com/espiao/concluido/images/alerta.gif" 
                            alt="Alert" 
                            className="w-3 h-3"
                          />
                          <p className="text-xs text-red-600">{contact.alertText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="bg-[#f0f0f0] border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ArrowLeft 
                          className="w-5 h-5 text-gray-600 cursor-pointer md:hidden" 
                          onClick={() => setSelectedChat(null)}
                        />
                        <img 
                          src={contacts.find(c => c.id === selectedChat)?.avatar} 
                          alt="Contact"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {contacts.find(c => c.id === selectedChat)?.name}
                          </h3>
                          <p className="text-sm text-gray-500">Última atualização</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Video className="w-5 h-5 text-gray-600" />
                        <Phone className="w-5 h-5 text-gray-600" />
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 bg-[#ece5dd] p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
                              message.isSent 
                                ? 'bg-[#dcf8c6] text-gray-900' 
                                : 'bg-white text-gray-900'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Lock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{message.text}</span>
                            </div>
                            <div className="text-xs text-gray-500 text-right flex items-center justify-end gap-1">
                              <span>{message.time}</span>
                              {message.isSent && <StatusIcon status={message.status} />}
                            </div>
                            
                            <div className="mt-2 p-2 bg-red-50 rounded border-l-4 border-red-500">
                              <p className="text-xs text-red-700 font-medium">
                                ⚠️ Conteúdo suspeito detectado
                              </p>
                              <Button
                                size="sm"
                                onClick={() => setShowPurchasePopup(true)}
                                className="mt-1 h-6 text-xs bg-red-500 hover:bg-red-600"
                              >
                                Desbloquear agora
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="bg-[#f0f0f0] border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <Smile className="w-6 h-6 text-gray-500" />
                      <Paperclip className="w-6 h-6 text-gray-500" />
                      <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Escreva sua mensagem"
                          className="flex-1 outline-none text-sm"
                          disabled
                        />
                        <Camera className="w-5 h-5 text-gray-500" />
                        <Mic className="w-5 h-5 text-gray-500" />
                      </div>
                      <Send className="w-6 h-6 text-[#075e54]" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-[#f0f0f0]">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Lock className="w-16 h-16 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Conteúdo Bloqueado
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Selecione uma conversa para ver o conteúdo detectado
                    </p>
                    <Button 
                      onClick={handlePurchase}
                      className="bg-[#25d366] hover:bg-[#20c55a] text-white"
                    >
                      Liberar Acesso Completo - R$ 67,00
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Purchase Popup */}
        {showPurchasePopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-6 max-w-md w-full">
              <div className="text-center">
                <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Conteúdo Bloqueado
                </h3>
                <p className="text-gray-600 mb-4">
                  Para visualizar este conteúdo suspeito, você precisa liberar o acesso completo.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handlePurchase}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
                  >
                    Liberar por R$ 67,00
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowPurchasePopup(false)}
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>100% Seguro e Anônimo</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-primary" />
            <span>Pagamento Protegido</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
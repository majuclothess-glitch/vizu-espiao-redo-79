import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Lock, Unlock, Zap, Clock, Eye, Image, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = {
  id: number;
  text: string;
  time: string;
  type: 'text' | 'emoji' | 'image';
  blurred?: boolean;
  visible: boolean;
};

const Desbloquear = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const scrollRefLeft = useRef<HTMLDivElement>(null);
  const scrollRefRight = useRef<HTMLDivElement>(null);

  const messageSequence: Omit<Message, 'id' | 'visible'>[] = [
    { text: "Oi amor, tudo bem?", time: "21:15", type: "text" },
    { text: "Tô com saudade...", time: "21:16", type: "text" },
    { text: "Vem aqui em casa?", time: "21:17", type: "text" },
    { text: "😏💋", time: "21:18", type: "emoji" },
    { text: "[Foto]", time: "21:19", type: "image" },
    { text: "Gostou do que viu?", time: "21:20", type: "text", blurred: true },
    { text: "Tô te esperando...", time: "21:21", type: "text", blurred: true },
    { text: "🔥😈", time: "21:22", type: "emoji", blurred: true },
    { text: "[Foto]", time: "21:23", type: "image", blurred: true },
    { text: "Não demora, tá?", time: "21:24", type: "text", blurred: true },
    { text: "❤️‍🔥💦", time: "21:25", type: "emoji", blurred: true },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulse = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }, 3000);
    return () => clearInterval(pulse);
  }, []);

  useEffect(() => {
    if (currentMessageIndex < messageSequence.length) {
      const timer = setTimeout(() => {
        const newMessage: Message = {
          ...messageSequence[currentMessageIndex],
          id: currentMessageIndex,
          visible: true,
        };
        setMessages(prev => [...prev, newMessage]);
        setCurrentMessageIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentMessageIndex(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex]);

  useEffect(() => {
    if (scrollRefLeft.current) {
      scrollRefLeft.current.scrollTop = scrollRefLeft.current.scrollHeight;
    }
    if (scrollRefRight.current) {
      setTimeout(() => {
        if (scrollRefRight.current) {
          scrollRefRight.current.scrollTop = scrollRefRight.current.scrollHeight;
        }
      }, 300);
    }
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUnlock = () => {
    window.open('https://pay.kirvano.com/b54c2fd7-3eb1-4e07-8a93-8e01e8aef9d7', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Neon glow effect */}
      <div className="fixed inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent opacity-30 animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Timer de urgência */}
        <div className="flex justify-center mb-8">
          <div className={`bg-red-600/20 border-2 border-red-500 rounded-lg px-6 py-3 flex items-center gap-3 ${pulseEffect ? 'animate-pulse' : ''}`}>
            <Clock className="w-5 h-5 text-red-400" />
            <div className="text-center">
              <div className="text-xs text-red-300 mb-1">OFERTA EXPIRA EM:</div>
              <div className="text-2xl font-bold text-red-400 font-mono">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        {/* Headline principal */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500 text-sm px-4 py-1">
            SIMULAÇÃO AO VIVO
          </Badge>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">VEJA AO VIVO:</span>
            <br />
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              O CELULAR ESPERA, O OUTRO RESPONDE
            </span>
          </h1>
          
          <Button
            onClick={handleUnlock}
            size="lg"
            className="w-full max-w-md mx-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 hover:scale-105 transition-all duration-300 border-2 border-red-400 animate-pulse flex items-center justify-center gap-2"
          >
            <span className="text-xl sm:text-2xl">🔥</span>
            <span className="leading-tight">DESBLOQUEIE O TUTORIAL AGORA</span>
          </Button>
        </div>

        {/* Mockups de celular */}
        <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-5xl mx-auto mb-12">
          {/* Phone Esquerdo - Origem */}
          <div className="relative group">
            <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl md:rounded-2xl blur-md md:blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-gray-900 rounded-xl md:rounded-2xl p-1 md:p-2 border border-blue-400/60 md:border-2 shadow-2xl">
              <div className="bg-black rounded-lg md:rounded-xl overflow-hidden">
                <div className="h-3 md:h-4 bg-black relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-3 md:h-4 bg-gray-900 rounded-b-lg md:rounded-b-xl" />
                </div>
                
                <div className="p-2 md:p-3 flex flex-col h-[280px] md:h-[400px]">
                  <div className="text-center text-[8px] md:text-[10px] text-gray-500 mb-2 md:mb-3">Dispositivo A — Enviando...</div>
                  
                  <div className="flex items-center gap-1.5 md:gap-2 pb-1.5 md:pb-2 border-b border-gray-800">
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Smartphone className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-[9px] md:text-xs">Contato Origem</div>
                      <div className="text-[7px] md:text-[10px] text-green-400">online</div>
                    </div>
                  </div>

                  <div ref={scrollRefLeft} className="flex-1 overflow-y-auto space-y-1 md:space-y-1.5 mt-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scroll-smooth">
                    {messages.map((msg, idx) => (
                      <div 
                        key={msg.id}
                        className="bg-green-600/30 rounded-md md:rounded-lg p-1.5 md:p-2 ml-auto max-w-[85%] text-right animate-fade-in"
                      >
                        {msg.blurred ? (
                          <div className="relative">
                            {msg.type === 'image' ? (
                              <div className="w-full h-12 md:h-20 bg-green-700/30 rounded blur-md flex items-center justify-center relative">
                                <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-400 animate-pulse absolute z-10" style={{ filter: 'blur(0)' }} />
                              </div>
                            ) : (
                              <>
                                <p className="text-[9px] md:text-xs blur-sm select-none opacity-40">{msg.text}</p>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Lock className="w-2 h-2 md:w-2.5 md:h-2.5 text-red-400 animate-pulse" style={{ filter: 'blur(0)' }} />
                                </div>
                              </>
                            )}
                          </div>
                        ) : msg.type === 'image' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <Image className="w-3 h-3 md:w-4 md:h-4 text-green-300" />
                            <p className="text-[9px] md:text-xs">Foto enviada</p>
                          </div>
                        ) : (
                          <p className="text-[9px] md:text-xs">{msg.text}</p>
                        )}
                        <div className="flex items-center justify-end gap-0.5 mt-0.5">
                          <span className="text-[7px] md:text-[10px] text-gray-400">{msg.time}</span>
                          <Check className="w-2 h-2 md:w-2.5 md:h-2.5 text-blue-400" />
                        </div>
                      </div>
                    ))}
                    {messages.length > 0 && messages.length < messageSequence.length && (
                      <div className="bg-green-600/20 rounded-md md:rounded-lg p-1.5 md:p-2 ml-auto max-w-[60%] text-right animate-pulse">
                        <p className="text-[9px] md:text-xs text-gray-400">digitando...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-2 md:mt-3 text-[9px] md:text-xs text-blue-300 font-semibold tracking-wider">
              ORIGEM
            </div>
          </div>

          {/* Phone Direito - Espelho */}
          <div className="relative group">
            <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl md:rounded-2xl blur-md md:blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-gray-900 rounded-xl md:rounded-2xl p-1 md:p-2 border border-green-400/60 md:border-2 shadow-2xl">
              <div className="bg-black rounded-lg md:rounded-xl overflow-hidden relative">
                <div className="h-3 md:h-4 bg-black relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-3 md:h-4 bg-gray-900 rounded-b-lg md:rounded-b-xl" />
                </div>
                
                <div className="p-2 md:p-3 flex flex-col h-[280px] md:h-[400px] relative">
                  <div className="text-center text-[8px] md:text-[10px] text-gray-500 mb-2 md:mb-3">Dispositivo B — Espelhando...</div>
                  
                  <div className="flex items-center gap-1.5 md:gap-2 pb-1.5 md:pb-2 border-b border-gray-800">
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Eye className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-green-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="font-semibold text-[9px] md:text-xs">Contato Espelhado</div>
                      <div className="text-[7px] md:text-[10px] text-green-400">online</div>
                    </div>
                  </div>

                  <div ref={scrollRefRight} className="flex-1 overflow-y-auto space-y-1 md:space-y-1.5 mt-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scroll-smooth">
                    {messages.map((msg, idx) => (
                      <div 
                        key={`mirror-${msg.id}`}
                        className="bg-gray-800/50 rounded-md md:rounded-lg p-1.5 md:p-2 max-w-[85%] animate-fade-in"
                        style={{ animationDelay: '0.3s' }}
                      >
                        {msg.blurred ? (
                          <div className="relative">
                            {msg.type === 'image' ? (
                              <div className="w-full h-12 md:h-20 bg-gray-700/50 rounded blur-md flex items-center justify-center relative">
                                <Lock className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-400 animate-pulse absolute z-10" style={{ filter: 'blur(0)' }} />
                              </div>
                            ) : (
                              <>
                                <p className="text-[9px] md:text-xs blur-sm select-none opacity-40">{msg.text}</p>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Lock className="w-2 h-2 md:w-2.5 md:h-2.5 text-red-400 animate-pulse" style={{ filter: 'blur(0)' }} />
                                </div>
                              </>
                            )}
                            <span className="text-[7px] md:text-[10px] text-gray-500 block mt-0.5">{msg.time}</span>
                          </div>
                        ) : (
                          <>
                            {msg.type === 'image' ? (
                              <div className="flex items-center gap-1.5">
                                <Image className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                                <p className="text-[9px] md:text-xs">Foto</p>
                              </div>
                            ) : (
                              <p className="text-[9px] md:text-xs">{msg.text}</p>
                            )}
                            <span className="text-[7px] md:text-[10px] text-gray-400 block mt-0.5">{msg.time}</span>
                          </>
                        )}
                      </div>
                    ))}
                    {messages.length > 0 && messages.length < messageSequence.length && (
                      <div className="bg-gray-800/30 rounded-md md:rounded-lg p-1.5 md:p-2 max-w-[60%] animate-pulse" style={{ animationDelay: '0.3s' }}>
                        <p className="text-[9px] md:text-xs text-gray-500">recebendo...</p>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-2 md:mt-3 text-[9px] md:text-xs text-green-300 font-semibold tracking-wider">
              ESPELHO
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-b from-green-950/50 to-transparent border-2 border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-green-400">
              Aprenda como fazer isso na prática
            </h2>
            <p className="text-lg text-gray-300">
              Tutorial passo a passo + suporte completo
            </p>
          </div>

          <Button
            onClick={handleUnlock}
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-base md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105 transition-all duration-300 border-2 border-green-400 flex items-center justify-center gap-3"
          >
            <Unlock className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="whitespace-nowrap">DESBLOQUEAR TUTORIAL</span>
            <Zap className="w-5 h-5 md:w-6 md:h-6 animate-pulse flex-shrink-0" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-yellow-400 font-semibold animate-pulse">
            <Clock className="w-5 h-5" />
            <span>Aproveite enquanto a técnica funciona</span>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-xs text-gray-400 mt-1">Acesso Imediato</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-xs text-gray-400 mt-1">Suporte 24h</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-xs text-gray-400 mt-1">Garantia 7 dias</div>
            </div>
          </div>
        </div>

        {/* Badges de confiança */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 text-sm">
          <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-950/30">
            🔒 Conexão Segura
          </Badge>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-950/30">
            👤 100% Anônimo
          </Badge>
          <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-950/30">
            💳 Pagamento Protegido
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Desbloquear;
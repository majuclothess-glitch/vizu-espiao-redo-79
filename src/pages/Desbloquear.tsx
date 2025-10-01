import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Lock, Unlock, Zap, Clock, Eye, Image, Check, ArrowRight, Play, Star, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = {
  id: number;
  text: string;
  time: string;
  type: 'text' | 'emoji' | 'image';
  blurred?: boolean;
  visible: boolean;
  sender: 'sent' | 'received';
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
    { text: "Oii", time: "22:15", type: "text", sender: "received" },
    { text: "Oi, tudo bem?", time: "22:16", type: "text", sender: "sent" },
    { text: "Tô com saudades...", time: "22:17", type: "text", sender: "received" },
    { text: "Vai conseguir dar uma escapadinha hoje?", time: "22:18", type: "text", sender: "received" },
    { text: "Já disse pra não me mandar msg aqui!", time: "22:19", type: "text", sender: "sent" },
    { text: "Desculpa amor 😔", time: "22:20", type: "text", sender: "received" },
    { text: "Mas é que estou louca de vontade de...", time: "22:21", type: "text", sender: "received" },
    { text: "[Foto]", time: "22:22", type: "image", sender: "received", blurred: true },
    { text: "😈🔥", time: "22:23", type: "emoji", sender: "received", blurred: true },
    { text: "[Áudio 0:32]", time: "22:24", type: "text", sender: "received", blurred: true },
    { text: "Para com isso!", time: "22:25", type: "text", sender: "sent", blurred: true },
    { text: "Gostou do que ouviu? 😏", time: "22:26", type: "text", sender: "received", blurred: true },
    { text: "[Foto]", time: "22:27", type: "image", sender: "received", blurred: true },
    { text: "💦😏", time: "22:28", type: "emoji", sender: "received", blurred: true },
    { text: "[Vídeo 0:15]", time: "22:29", type: "text", sender: "received", blurred: true },
    { text: "Tô te esperando igual da última vez...", time: "22:30", type: "text", sender: "received", blurred: true },
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
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentMessageIndex(0);
      }, 5000);
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
        {/* Timer de urgência - Mais dramático */}
        <div className="flex justify-center mb-8">
          <div className={`relative bg-gradient-to-r from-red-600/30 to-orange-600/30 border-2 border-red-500 rounded-2xl px-8 py-4 flex items-center gap-4 shadow-2xl shadow-red-500/50 ${pulseEffect ? 'scale-105' : 'scale-100'} transition-transform duration-300`}>
            <div className="absolute inset-0 bg-red-500/10 rounded-2xl animate-pulse" />
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-red-400 animate-spin-slow relative z-10" style={{ animationDuration: '3s' }} />
            <div className="text-center relative z-10">
              <div className="text-xs md:text-sm text-red-300 mb-1 font-semibold tracking-wider">⚠️ OFERTA EXPIRA EM:</div>
              <div className="text-3xl md:text-4xl font-bold text-red-400 font-mono tracking-wider drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]">{formatTime(timeLeft)}</div>
            </div>
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse relative z-10" />
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
            <span className="text-blue-400">UM CELULAR ENVIA,</span>
            <br />
            <span className="text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              O OUTRO RECEBE NA HORA
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

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
          <div className="text-center bg-gradient-to-b from-blue-950/50 to-transparent border border-blue-500/30 rounded-lg p-3 md:p-4">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl md:text-3xl font-bold text-blue-400">12.847</div>
            <div className="text-[10px] md:text-xs text-gray-400 mt-1">Pessoas já descobriram</div>
          </div>
          <div className="text-center bg-gradient-to-b from-green-950/50 to-transparent border border-green-500/30 rounded-lg p-3 md:p-4">
            <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl md:text-3xl font-bold text-yellow-400">4.9/5</div>
            <div className="text-[10px] md:text-xs text-gray-400 mt-1">Avaliação média</div>
          </div>
          <div className="text-center bg-gradient-to-b from-purple-950/50 to-transparent border border-purple-500/30 rounded-lg p-3 md:p-4">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-xl md:text-3xl font-bold text-purple-400">100%</div>
            <div className="text-[10px] md:text-xs text-gray-400 mt-1">Seguro e anônimo</div>
          </div>
        </div>

        {/* Mockups de celular */}
        <div className="relative grid grid-cols-2 gap-3 md:gap-8 max-w-5xl mx-auto mb-12">
          {/* Indicador de sincronização animado */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2">
            <ArrowRight className="w-8 h-8 text-green-400 animate-pulse" />
            <div className="bg-green-500/20 border border-green-400 rounded-full px-3 py-1 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-green-400 animate-pulse">SINCRONIZANDO</span>
            </div>
            <ArrowRight className="w-8 h-8 text-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
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
                        className={`rounded-md md:rounded-lg p-1.5 md:p-2 max-w-[85%] animate-fade-in ${
                          msg.sender === 'sent' 
                            ? 'bg-green-600/30 ml-auto text-right' 
                            : 'bg-gray-800/50 mr-auto text-left'
                        }`}
                      >
                        {msg.blurred ? (
                          <div className="relative">
                            {msg.type === 'image' ? (
                              <div className={`w-full h-12 md:h-20 rounded blur-md flex items-center justify-center relative ${
                                msg.sender === 'sent' ? 'bg-green-700/30' : 'bg-gray-700/30'
                              }`}>
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
                          <div className={`flex items-center gap-1.5 ${msg.sender === 'sent' ? 'justify-end' : 'justify-start'}`}>
                            <Image className="w-3 h-3 md:w-4 md:h-4 text-green-300" />
                            <p className="text-[9px] md:text-xs">Foto</p>
                          </div>
                        ) : (
                          <p className="text-[9px] md:text-xs">{msg.text}</p>
                        )}
                        <div className={`flex items-center gap-0.5 mt-0.5 ${msg.sender === 'sent' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[7px] md:text-[10px] text-gray-400">{msg.time}</span>
                          {msg.sender === 'sent' && <Check className="w-2 h-2 md:w-2.5 md:h-2.5 text-blue-400" />}
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

        {/* Vídeo thumbnail */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group cursor-pointer" onClick={handleUnlock}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/50 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                {/* Thumbnail fake */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                
                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 group-hover:scale-110 transition-transform border-4 border-white/20">
                    <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-2xl font-bold text-white mb-1">▶️ Assista o Tutorial Completo</div>
                    <div className="text-sm md:text-base text-gray-300">Passo a passo detalhado (3:47)</div>
                  </div>
                </div>

                {/* Badge ao vivo */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  TUTORIAL LIBERADO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
            O que estão dizendo sobre o método
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  "Descobri que minha suspeita estava certa. O método funciona perfeitamente e é muito fácil de usar."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-400">MC</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Maria C.</div>
                    <div className="text-xs text-gray-500">São Paulo, SP</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  "Incrível! Em menos de 5 minutos já estava vendo tudo. Valeu cada centavo."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-400">RS</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Roberto S.</div>
                    <div className="text-xs text-gray-500">Rio de Janeiro, RJ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  "Melhor investimento que fiz. Agora sei a verdade e posso tomar minhas decisões."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-400">AF</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Ana F.</div>
                    <div className="text-xs text-gray-500">Belo Horizonte, MG</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
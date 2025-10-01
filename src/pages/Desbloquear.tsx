import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Lock, Unlock, Zap, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Desbloquear = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  const [pulseEffect, setPulseEffect] = useState(false);

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
          
          <p className="text-xl md:text-2xl text-red-400 font-semibold animate-pulse">
            🔥 DESBLOQUEIE O TUTORIAL AGORA
          </p>
        </div>

        {/* Mockups de celular */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-12">
          {/* Phone Esquerdo - Origem */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-gray-900 rounded-2xl p-2 border-2 border-blue-400/60 shadow-2xl">
              <div className="bg-black rounded-xl overflow-hidden">
                {/* Notch */}
                <div className="h-4 bg-black relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-b-xl" />
                </div>
                
                {/* Screen content */}
                <div className="p-3 space-y-2 min-h-[380px]">
                  <div className="text-center text-[10px] text-gray-500 mb-3">Dispositivo A — Enviando...</div>
                  
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                    <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Smartphone className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">Contato Origem</div>
                      <div className="text-[10px] text-green-400">online</div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-1.5">
                    <div className="bg-green-600/30 rounded-lg p-2 ml-auto max-w-[80%] text-right">
                      <p className="text-xs">Oi, tudo bem?</p>
                      <span className="text-[10px] text-gray-400">14:32</span>
                    </div>
                    <div className="bg-green-600/30 rounded-lg p-2 ml-auto max-w-[80%] text-right">
                      <p className="text-xs">Preciso falar contigo...</p>
                      <span className="text-[10px] text-gray-400">14:33</span>
                    </div>
                    <div className="bg-green-600/30 rounded-lg p-2 ml-auto max-w-[80%] text-right">
                      <p className="text-xs">Onde você está?</p>
                      <span className="text-[10px] text-gray-400">14:34</span>
                    </div>
                    <div className="bg-green-600/30 rounded-lg p-2 ml-auto max-w-[80%] text-right animate-pulse">
                      <p className="text-xs">Digitando...</p>
                      <span className="text-[10px] text-gray-400">agora</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-3 text-xs text-blue-300 font-semibold tracking-wider">
              DISPOSITIVO A
            </div>
          </div>

          {/* Phone Direito - Espelho */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-gray-900 rounded-2xl p-2 border-2 border-green-400/60 shadow-2xl">
              <div className="bg-black rounded-xl overflow-hidden relative">
                {/* Notch */}
                <div className="h-4 bg-black relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-b-xl" />
                </div>
                
                {/* Screen content */}
                <div className="p-3 space-y-2 min-h-[380px] relative">
                  <div className="text-center text-[10px] text-gray-500 mb-3">Dispositivo B — Recebendo (simulação)</div>
                  
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                    <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">Contato Espelhado</div>
                      <div className="text-[10px] text-green-400">online</div>
                    </div>
                  </div>

                  {/* Messages (parcialmente borradas) */}
                  <div className="space-y-1.5">
                    <div className="bg-gray-800/50 rounded-lg p-2 max-w-[80%]">
                      <div className="relative">
                        <p className="text-xs blur-md select-none opacity-50">Oi, tudo bem?</p>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-red-400" />
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500">14:32</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-2 max-w-[80%]">
                      <p className="text-xs">Preciso falar contigo...</p>
                      <span className="text-[10px] text-gray-400">14:33</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-2 max-w-[80%]">
                      <div className="relative">
                        <p className="text-xs blur-md select-none opacity-50">Onde você está?</p>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-red-400" />
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500">14:34</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-2 max-w-[80%]">
                      <div className="relative">
                        <p className="text-xs blur-md select-none opacity-50">████████████</p>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-red-400 animate-pulse" />
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500">agora</span>
                    </div>
                  </div>

                  {/* Overlay de bloqueio */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-3 text-xs text-green-300 font-semibold tracking-wider">
              DISPOSITIVO B (ESPELHO)
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
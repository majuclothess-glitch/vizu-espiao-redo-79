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
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-12">
          {/* Phone Esquerdo - Origem */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-gray-900 rounded-3xl p-3 border-2 border-blue-400 shadow-2xl">
              <div className="bg-black rounded-2xl overflow-hidden">
                {/* Notch */}
                <div className="h-6 bg-black relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
                </div>
                
                {/* Screen content */}
                <div className="p-4 space-y-3 min-h-[500px]">
                  <div className="text-center text-xs text-gray-500 mb-4">Dispositivo A — Enviando...</div>
                  
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Contato Origem</div>
                      <div className="text-xs text-green-400">online</div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-2">
                    <div className="bg-green-600/30 rounded-lg p-3 ml-auto max-w-[80%] text-right">
                      <p className="text-sm">Oi, tudo bem?</p>
                      <span className="text-xs text-gray-400">14:32</span>
                    </div>
                    <div className="bg-green-600/30 rounded-lg p-3 ml-auto max-w-[80%] text-right">
                      <p className="text-sm">Preciso falar contigo...</p>
                      <span className="text-xs text-gray-400">14:33</span>
                    </div>
                    <div className="bg-green-600/30 rounded-lg p-3 ml-auto max-w-[80%] text-right animate-pulse">
                      <p className="text-sm">Digitando...</p>
                      <span className="text-xs text-gray-400">agora</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4 text-sm text-blue-300 font-semibold">
              DISPOSITIVO A
            </div>
          </div>

          {/* Phone Direito - Espelho */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
            
            <div className="relative bg-gray-900 rounded-3xl p-3 border-2 border-green-400 shadow-2xl">
              <div className="bg-black rounded-2xl overflow-hidden relative">
                {/* Tag vermelha */}
                <div className="absolute top-8 right-2 z-20 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                  60% OCULTAS — DESBLOQUEIE
                </div>

                {/* Notch */}
                <div className="h-6 bg-black relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
                </div>
                
                {/* Screen content */}
                <div className="p-4 space-y-3 min-h-[500px] relative">
                  <div className="text-center text-xs text-gray-500 mb-4">Dispositivo B — Recebendo (simulação)</div>
                  
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Contato Espelhado</div>
                      <div className="text-xs text-green-400">online</div>
                    </div>
                  </div>

                  {/* Messages (parcialmente borradas) */}
                  <div className="space-y-2">
                    <div className="bg-gray-800/50 rounded-lg p-3 max-w-[80%]">
                      <div className="relative">
                        <p className="text-sm blur-sm select-none">Oi, tudo bem?</p>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-red-400" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">14:32</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Preciso falar contigo...</p>
                      <span className="text-xs text-gray-400">14:33</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-3 max-w-[80%]">
                      <div className="relative">
                        <p className="text-sm blur-sm select-none">████████████</p>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-red-400" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">14:34</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-3 max-w-[80%]">
                      <div className="relative">
                        <p className="text-sm blur-sm select-none">██████████████████</p>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-red-400" />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">14:35</span>
                    </div>
                  </div>

                  {/* Overlay de bloqueio */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4 text-sm text-green-300 font-semibold">
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
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl px-12 py-8 rounded-xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 hover:scale-105 transition-all duration-300 border-2 border-green-400"
          >
            <Unlock className="w-6 h-6 mr-3" />
            DESBLOQUEAR TUTORIAL COMPLETO
            <Zap className="w-6 h-6 ml-3 animate-pulse" />
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
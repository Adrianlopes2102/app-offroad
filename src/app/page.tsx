"use client";

import { useState } from "react";
import { User, Wrench, Calendar, Trophy, Star, MapPin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [userPlan] = useState<"free" | "pro">("free");
  const [points] = useState(150);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6F00] to-[#FF8F00] rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">OffRoad Pilots</h1>
              <p className="text-xs text-[#A0A0A0]">Sua jornada off-road</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#2A2A2A]">
              <Trophy className="w-4 h-4 text-[#FF6F00]" />
              <span className="text-sm font-semibold">{points} pts</span>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              userPlan === "pro" 
                ? "bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] text-white" 
                : "bg-[#2A2A2A] text-[#A0A0A0]"
            }`}>
              {userPlan === "pro" ? "PRO" : "FREE"}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-[#A0A0A0] bg-clip-text text-transparent">
            Domine as Trilhas
          </h2>
          <p className="text-lg md:text-xl text-[#A0A0A0]">
            Gerencie seu perfil, manutenções e participe dos melhores eventos off-road
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Perfil do Piloto */}
          <Link href="/perfil">
            <div className="group relative bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#FF6F00] transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6F00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6F00] to-[#FF8F00] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Perfil</h3>
                <p className="text-[#A0A0A0] text-sm">
                  Gerencie suas informações e conquistas
                </p>
              </div>
            </div>
          </Link>

          {/* Manutenções */}
          <Link href="/manutencoes">
            <div className="group relative bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#FF6F00] transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6F00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6F00] to-[#FF8F00] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Manutenções</h3>
                <p className="text-[#A0A0A0] text-sm">
                  Registre e acompanhe sua moto
                </p>
                {userPlan === "free" && (
                  <div className="mt-3 text-xs text-[#FF6F00] font-semibold">
                    Limite: 5 registros
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Eventos */}
          <Link href="/eventos">
            <div className="group relative bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#FF6F00] transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6F00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6F00] to-[#FF8F00] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Eventos</h3>
                <p className="text-[#A0A0A0] text-sm">
                  Descubra trilhas e participe
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-12 border-t border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Eventos em Destaque</h3>
          <Link href="/eventos" className="text-[#FF6F00] hover:text-[#FF8F00] transition-colors text-sm font-semibold">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Trilha da Serra", date: "15 Jan 2025", city: "Campos do Jordão", level: "Intermediário" },
            { name: "Aventura Extrema", date: "22 Jan 2025", city: "Socorro", level: "Avançado" },
            { name: "Rota das Cachoeiras", date: "28 Jan 2025", city: "Brotas", level: "Iniciante" },
          ].map((event, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#FF6F00] transition-all duration-300 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1 group-hover:text-[#FF6F00] transition-colors">{event.name}</h4>
                  <p className="text-sm text-[#A0A0A0]">{event.city}</p>
                </div>
                <Star className="w-5 h-5 text-[#FF6F00]" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A0A0A0]">{event.date}</span>
                <span className="px-3 py-1 bg-[#2A2A2A] rounded-full text-xs font-semibold">{event.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {userPlan === "free" && (
        <section className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Upgrade para PRO</h3>
            <p className="text-lg mb-6 opacity-90">
              Manutenções ilimitadas, crie eventos e destaque suas trilhas
            </p>
            <button className="bg-white text-[#FF6F00] px-8 py-3 rounded-lg font-bold hover:bg-[#F5F5F5] transition-colors">
              Assinar Agora
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-[#A0A0A0] text-sm">
          <p>© 2025 OffRoad Pilots. Sua jornada off-road começa aqui.</p>
        </div>
      </footer>
    </div>
  );
}

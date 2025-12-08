"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Calendar, MapPin, Star, Users, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";

interface Evento {
  id: number;
  nome: string;
  data: string;
  local: string;
  cidade: string;
  estado: string;
  nivel_recomendado: string;
  link_contato: string;
  destacado: boolean;
  participantes?: number;
}

export default function EventosPage() {
  const [userPlan] = useState<"free" | "pro">("free");
  const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
  const [showForm, setShowForm] = useState(false);
  
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      nome: "Trilha da Serra",
      data: "2025-01-15",
      local: "Parque Estadual",
      cidade: "Campos do Jordão",
      estado: "São Paulo",
      nivel_recomendado: "Intermediário",
      link_contato: "https://wa.me/5511999999999",
      destacado: true,
      participantes: 24,
    },
    {
      id: 2,
      nome: "Aventura Extrema",
      data: "2025-01-22",
      local: "Trilha do Morro",
      cidade: "Socorro",
      estado: "São Paulo",
      nivel_recomendado: "Avançado",
      link_contato: "https://wa.me/5511888888888",
      destacado: true,
      participantes: 18,
    },
    {
      id: 3,
      nome: "Rota das Cachoeiras",
      data: "2025-01-28",
      local: "Circuito Natural",
      cidade: "Brotas",
      estado: "São Paulo",
      nivel_recomendado: "Iniciante",
      link_contato: "https://wa.me/5511777777777",
      destacado: false,
      participantes: 32,
    },
    {
      id: 4,
      nome: "Desafio Off-Road",
      data: "2025-02-05",
      local: "Fazenda Santa Rita",
      cidade: "Curitiba",
      estado: "Paraná",
      nivel_recomendado: "Intermediário",
      link_contato: "https://wa.me/5511666666666",
      destacado: false,
      participantes: 15,
    },
    {
      id: 5,
      nome: "Trilha das Montanhas",
      data: "2025-02-12",
      local: "Serra Catarinense",
      cidade: "Urubici",
      estado: "Santa Catarina",
      nivel_recomendado: "Avançado",
      link_contato: "https://wa.me/5548999999999",
      destacado: false,
      participantes: 20,
    },
  ]);

  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    local: "",
    cidade: "",
    estado: "São Paulo",
    nivel_recomendado: "Iniciante",
    link_contato: "",
    destacado: false,
  });

  const estados = [
    "Todos",
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ];

  const eventosFiltrados = filtroEstado === "Todos" 
    ? eventos 
    : eventos.filter(e => e.estado === filtroEstado);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userPlan === "free") {
      alert("Apenas usuários PRO podem criar eventos!");
      return;
    }

    const novoEvento: Evento = {
      ...formData,
      id: Date.now(),
      participantes: 0,
    };

    setEventos([novoEvento, ...eventos]);
    setFormData({
      nome: "",
      data: "",
      local: "",
      cidade: "",
      estado: "São Paulo",
      nivel_recomendado: "Iniciante",
      link_contato: "",
      destacado: false,
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Voltar</span>
          </Link>
          
          <h1 className="text-xl font-bold">Eventos</h1>
          
          <button
            onClick={() => {
              if (userPlan === "free") {
                alert("Apenas usuários PRO podem criar eventos!");
                return;
              }
              setShowForm(!showForm);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold ${
              userPlan === "pro"
                ? "bg-[#FF6F00] hover:bg-[#FF8F00]"
                : "bg-[#2A2A2A] text-[#A0A0A0] cursor-not-allowed"
            }`}
          >
            <Plus className="w-4 h-4" />
            Criar Evento
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Filter */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-5 h-5 text-[#FF6F00]" />
            <span className="font-semibold">Filtrar por Estado</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {estados.map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  filtroEstado === estado
                    ? "bg-[#FF6F00] text-white"
                    : "bg-[#2A2A2A] text-[#A0A0A0] hover:bg-[#3A3A3A]"
                }`}
              >
                {estado}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && userPlan === "pro" && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Criar Novo Evento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">Nome do Evento</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Trilha da Serra"
                  className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">Data</label>
                  <input
                    type="date"
                    required
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">Nível Recomendado</label>
                  <select
                    value={formData.nivel_recomendado}
                    onChange={(e) => setFormData({ ...formData, nivel_recomendado: e.target.value })}
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">Local</label>
                  <input
                    type="text"
                    required
                    value={formData.local}
                    onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                    placeholder="Ex: Parque Estadual"
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">Cidade</label>
                  <input
                    type="text"
                    required
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    placeholder="Ex: Campos do Jordão"
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                >
                  <option value="Acre">Acre</option>
                  <option value="Alagoas">Alagoas</option>
                  <option value="Amapá">Amapá</option>
                  <option value="Amazonas">Amazonas</option>
                  <option value="Bahia">Bahia</option>
                  <option value="Ceará">Ceará</option>
                  <option value="Distrito Federal">Distrito Federal</option>
                  <option value="Espírito Santo">Espírito Santo</option>
                  <option value="Goiás">Goiás</option>
                  <option value="Maranhão">Maranhão</option>
                  <option value="Mato Grosso">Mato Grosso</option>
                  <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                  <option value="Minas Gerais">Minas Gerais</option>
                  <option value="Pará">Pará</option>
                  <option value="Paraíba">Paraíba</option>
                  <option value="Paraná">Paraná</option>
                  <option value="Pernambuco">Pernambuco</option>
                  <option value="Piauí">Piauí</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                  <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                  <option value="Rondônia">Rondônia</option>
                  <option value="Roraima">Roraima</option>
                  <option value="Santa Catarina">Santa Catarina</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Sergipe">Sergipe</option>
                  <option value="Tocantins">Tocantins</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">Link de Contato</label>
                <input
                  type="url"
                  required
                  value={formData.link_contato}
                  onChange={(e) => setFormData({ ...formData, link_contato: e.target.value })}
                  placeholder="https://wa.me/5511999999999"
                  className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#2A2A2A] rounded-lg p-4">
                <input
                  type="checkbox"
                  id="destacado"
                  checked={formData.destacado}
                  onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                  className="w-5 h-5 accent-[#FF6F00]"
                />
                <label htmlFor="destacado" className="flex-1">
                  <div className="font-semibold">Destacar Evento</div>
                  <div className="text-sm text-[#A0A0A0]">
                    Seu evento aparecerá em destaque na home (recurso PRO)
                  </div>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#FF6F00] hover:bg-[#FF8F00] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Criar Evento
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-lg font-semibold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventosFiltrados.map((evento) => (
            <div
              key={evento.id}
              className={`bg-[#1A1A1A] border rounded-xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer ${
                evento.destacado ? "border-[#FF6F00]" : "border-[#2A2A2A] hover:border-[#FF6F00]"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-[#FF6F00] transition-colors">
                    {evento.nome}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                    <MapPin className="w-4 h-4" />
                    {evento.cidade} - {evento.estado}
                  </div>
                </div>
                {evento.destacado && (
                  <div className="bg-[#FF6F00] p-2 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-[#FF6F00]" />
                  <span className="text-[#A0A0A0]" suppressHydrationWarning>
                    {new Date(evento.data).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-[#FF6F00]" />
                  <span className="text-[#A0A0A0]">{evento.local}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-[#FF6F00]" />
                  <span className="text-[#A0A0A0]">{evento.participantes} participantes</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                <span className="px-3 py-1 bg-[#2A2A2A] rounded-full text-xs font-semibold">
                  {evento.nivel_recomendado}
                </span>
                <a
                  href={evento.link_contato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FF6F00] hover:text-[#FF8F00] transition-colors text-sm font-semibold"
                >
                  Contato
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {eventosFiltrados.length === 0 && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-[#A0A0A0] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Nenhum evento encontrado</h3>
            <p className="text-[#A0A0A0]">
              Tente ajustar os filtros ou aguarde novos eventos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Wrench, Calendar, Gauge, FileText, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

interface Manutencao {
  id: number;
  tipo: string;
  data: string;
  km: number;
  observacao: string;
}

export default function ManutencoesPage() {
  const [userPlan] = useState<"free" | "pro">("free");
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([
    { id: 1, tipo: "Troca de óleo", data: "2025-01-10", km: 5000, observacao: "Óleo Motul 10W40" },
    { id: 2, tipo: "Revisão completa", data: "2024-12-15", km: 4500, observacao: "Revisão dos 4500km" },
    { id: 3, tipo: "Troca de pneus", data: "2024-11-20", km: 4000, observacao: "Pneus Pirelli MT60" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    tipo: "",
    data: "",
    km: 0,
    observacao: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userPlan === "free" && manutencoes.length >= 5 && !editingId) {
      alert("Limite de 5 manutenções atingido. Faça upgrade para PRO!");
      return;
    }

    if (editingId) {
      setManutencoes(manutencoes.map(m => 
        m.id === editingId ? { ...formData, id: editingId } : m
      ));
      setEditingId(null);
    } else {
      const newManutencao = {
        ...formData,
        id: Date.now(),
      };
      setManutencoes([newManutencao, ...manutencoes]);
    }

    setFormData({ tipo: "", data: "", km: 0, observacao: "" });
    setShowForm(false);
  };

  const handleEdit = (manutencao: Manutencao) => {
    setFormData({
      tipo: manutencao.tipo,
      data: manutencao.data,
      km: manutencao.km,
      observacao: manutencao.observacao,
    });
    setEditingId(manutencao.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja realmente excluir esta manutenção?")) {
      setManutencoes(manutencoes.filter(m => m.id !== id));
    }
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
          
          <h1 className="text-xl font-bold">Manutenções</h1>
          
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ tipo: "", data: "", km: 0, observacao: "" });
            }}
            className="flex items-center gap-2 bg-[#FF6F00] hover:bg-[#FF8F00] px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Limit Warning */}
        {userPlan === "free" && (
          <div className="bg-[#1A1A1A] border border-[#FF6F00] rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-[#FF6F00]" />
              <div>
                <p className="font-semibold">Plano FREE</p>
                <p className="text-sm text-[#A0A0A0]">
                  {manutencoes.length}/5 manutenções registradas
                </p>
              </div>
            </div>
            <button className="bg-[#FF6F00] hover:bg-[#FF8F00] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Upgrade PRO
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">
              {editingId ? "Editar Manutenção" : "Nova Manutenção"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">Tipo de Manutenção</label>
                <input
                  type="text"
                  required
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  placeholder="Ex: Troca de óleo, Revisão..."
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
                  <label className="block text-sm text-[#A0A0A0] mb-2">Quilometragem</label>
                  <input
                    type="number"
                    required
                    value={formData.km}
                    onChange={(e) => setFormData({ ...formData, km: parseInt(e.target.value) })}
                    placeholder="Ex: 5000"
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A0A0A0] mb-2">Observações</label>
                <textarea
                  value={formData.observacao}
                  onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                  placeholder="Detalhes sobre a manutenção..."
                  rows={3}
                  className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#FF6F00] hover:bg-[#FF8F00] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {editingId ? "Salvar Alterações" : "Adicionar Manutenção"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ tipo: "", data: "", km: 0, observacao: "" });
                  }}
                  className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-lg font-semibold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {manutencoes.length === 0 ? (
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-12 text-center">
              <Wrench className="w-16 h-16 text-[#A0A0A0] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Nenhuma manutenção registrada</h3>
              <p className="text-[#A0A0A0] mb-6">
                Comece a registrar as manutenções da sua moto
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#FF6F00] hover:bg-[#FF8F00] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Adicionar Primeira Manutenção
              </button>
            </div>
          ) : (
            manutencoes.map((manutencao) => (
              <div
                key={manutencao.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#FF6F00] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF6F00] transition-colors">
                      {manutencao.tipo}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#A0A0A0]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span suppressHydrationWarning>
                          {new Date(manutencao.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        {manutencao.km.toLocaleString()} km
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(manutencao)}
                      className="p-2 bg-[#2A2A2A] hover:bg-[#FF6F00] rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(manutencao.id)}
                      className="p-2 bg-[#2A2A2A] hover:bg-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {manutencao.observacao && (
                  <div className="flex items-start gap-2 bg-[#2A2A2A] rounded-lg p-3">
                    <FileText className="w-4 h-4 text-[#FF6F00] mt-0.5" />
                    <p className="text-sm text-[#A0A0A0]">{manutencao.observacao}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

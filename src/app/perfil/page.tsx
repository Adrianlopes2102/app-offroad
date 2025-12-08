"use client";

import { useState, useRef } from "react";
import { ArrowLeft, User, MapPin, Bike, Award, Edit2, Save, Camera } from "lucide-react";
import Link from "next/link";

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nome: "João Silva",
    idade: 32,
    moto: "Honda CRF 250",
    cidade: "São Paulo",
    nivel: "Intermediário",
    foto: null as string | null,
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, foto: reader.result as string });
      };
      reader.readAsDataURL(file);
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
          
          <h1 className="text-xl font-bold">Perfil do Piloto</h1>
          
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2 bg-[#FF6F00] hover:bg-[#FF8F00] px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Salvar
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Editar
              </>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF6F00] to-[#FF8F00] rounded-2xl flex items-center justify-center overflow-hidden">
                {editedProfile.foto ? (
                  <img 
                    src={editedProfile.foto} 
                    alt="Foto do piloto" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              
              {/* Botão de câmera */}
              <button
                onClick={handlePhotoClick}
                className="absolute -bottom-2 -right-2 bg-[#FF6F00] hover:bg-[#FF8F00] border-2 border-[#0D0D0D] rounded-full p-2 transition-colors"
                title="Adicionar foto"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
              
              {/* Input file escondido */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              
              <div className="absolute -bottom-2 -left-2 bg-[#0D0D0D] border-2 border-[#FF6F00] rounded-full p-2">
                <Award className="w-6 h-6 text-[#FF6F00]" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2">Nome</label>
                    <input
                      type="text"
                      value={editedProfile.nome}
                      onChange={(e) => setEditedProfile({ ...editedProfile, nome: e.target.value })}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-2">Idade</label>
                      <input
                        type="number"
                        value={editedProfile.idade}
                        onChange={(e) => setEditedProfile({ ...editedProfile, idade: parseInt(e.target.value) })}
                        className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-2">Nível</label>
                      <select
                        value={editedProfile.nivel}
                        onChange={(e) => setEditedProfile({ ...editedProfile, nivel: e.target.value })}
                        className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                      >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2">Moto</label>
                    <input
                      type="text"
                      value={editedProfile.moto}
                      onChange={(e) => setEditedProfile({ ...editedProfile, moto: e.target.value })}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-2">Cidade</label>
                    <input
                      type="text"
                      value={editedProfile.cidade}
                      onChange={(e) => setEditedProfile({ ...editedProfile, cidade: e.target.value })}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6F00] transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">{profile.nome}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
                      <User className="w-5 h-5 text-[#FF6F00]" />
                      <div>
                        <p className="text-xs text-[#A0A0A0]">Idade</p>
                        <p className="font-semibold">{profile.idade} anos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
                      <Award className="w-5 h-5 text-[#FF6F00]" />
                      <div>
                        <p className="text-xs text-[#A0A0A0]">Nível</p>
                        <p className="font-semibold">{profile.nivel}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
                      <Bike className="w-5 h-5 text-[#FF6F00]" />
                      <div>
                        <p className="text-xs text-[#A0A0A0]">Moto</p>
                        <p className="font-semibold">{profile.moto}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-[#2A2A2A] rounded-lg px-4 py-3">
                      <MapPin className="w-5 h-5 text-[#FF6F00]" />
                      <div>
                        <p className="text-xs text-[#A0A0A0]">Cidade</p>
                        <p className="font-semibold">{profile.cidade}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#FF6F00] mb-2">12</div>
            <p className="text-[#A0A0A0]">Eventos Participados</p>
          </div>
          
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#FF6F00] mb-2">5</div>
            <p className="text-[#A0A0A0]">Manutenções Registradas</p>
          </div>
          
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#FF6F00] mb-2">150</div>
            <p className="text-[#A0A0A0]">Pontos Acumulados</p>
          </div>
        </div>
      </div>
    </div>
  );
}

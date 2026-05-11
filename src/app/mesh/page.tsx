'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import ClientLayout from '@/components/ClientLayout';
import OrganismAvatar from '@/components/OrganismAvatar';
import { Globe, Search, Sparkles, GitFork, Activity } from 'lucide-react';
import type { NexusCore, MeshOrganism } from '@/types';
import { fetchPublicMesh } from '@/lib/supabase';

function MeshNode({ org, onSelect }: { org: MeshOrganism, onSelect: (org: MeshOrganism) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowColor = org.avatar_color || '#D4FF00';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + org.x;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + org.y;
    }
  });

  return (
    <group position={[org.x * 10, org.y * 10, org.z * 10]}>
      <mesh ref={meshRef} onClick={() => onSelect(org)} onPointerOver={(e) => (document.body.style.cursor = 'pointer')} onPointerOut={(e) => (document.body.style.cursor = 'auto')}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={glowColor} wireframe={true} emissive={glowColor} emissiveIntensity={2} />
      </mesh>
      <Html position={[0, -2, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="bg-black border-2 border-white px-3 py-1 font-sans font-bold text-white whitespace-nowrap uppercase tracking-widest text-xs">
          {org.name}
        </div>
      </Html>
    </group>
  );
}

export default function MeshPage() {
  const router = useRouter();
  const { addOrganism } = useStore();
  const [meshOrganisms, setMeshOrganisms] = useState<MeshOrganism[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [forked, setForked] = useState<Set<string>>(new Set());
  const [selectedOrg, setSelectedOrg] = useState<MeshOrganism | null>(null);

  useEffect(() => {
    async function loadMesh() {
      const data = await fetchPublicMesh();
      setMeshOrganisms(data);
      setLoading(false);
    }
    loadMesh();
  }, []);

  const filtered = search
    ? meshOrganisms.filter(o => o.name?.toLowerCase().includes(search.toLowerCase()) || o.tagline?.toLowerCase().includes(search.toLowerCase()))
    : meshOrganisms;

  const handleFork = (org: MeshOrganism) => {
    const now = new Date().toISOString();
    const id = `fork-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const forkedOrg: NexusCore = {
      id,
      name: `${org.name} Fork`,
      tagline: org.tagline || '',
      seed_type: 'text',
      seed_content: `Forked from: ${org.name} — ${org.tagline}`,
      dna: [], // To perfectly duplicate we'd need the full DNA, but this is a mesh preview
      agents: [],
      generation: (org.generation || 1) + 1,
      mutations: 0,
      health: 100,
      status: 'embryo',
      created_at: now,
      updated_at: now,
      user_id: 'local',
      is_public: false,
      family_tree: [{
        id: `ft-${id}-0`, nexus_id: id, parent_ids: [org.id || ''], generation: 1,
        label: 'Forked', type: 'birth', summary: `Forked from ${org.name}`, created_at: now,
      }],
      avatar_color: org.avatar_color || '#D4FF00',
      avatar_glow: org.avatar_glow || '#D4FF00',
    };
    addOrganism(forkedOrg);
    setForked(prev => new Set(prev).add(org.id));
    setTimeout(() => router.push(`/organisms`), 500);
  };

  return (
    <ClientLayout>
      <div className="relative min-h-screen pt-[120px] pb-20 px-6 max-w-[1600px] mx-auto border-x-8 border-black overflow-hidden bg-black flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel: Search & 3D Canvas */}
        <div className="flex-1 flex flex-col border-4 border-white relative z-10 bg-black/50 p-4 shadow-[12px_12px_0_rgba(255,255,255,1)]">
          <div className="mb-6 border-b-8 border-white/20 pb-6">
            <h1 className="display-massive uppercase tracking-tighter leading-[0.8] text-white">
              <span className="text-black bg-[var(--brand-violet)] px-4 inline-block border-4 border-white shadow-[8px_8px_0_rgba(255,255,255,0.2)] transform -rotate-2">3D</span> MESH
            </h1>
            <p className="text-xl text-[var(--text-secondary)] font-sans mt-4 max-w-lg leading-tight font-bold border-l-8 border-[var(--brand-lime)] pl-4 uppercase">
              Global Supabase Neural Network
            </p>
          </div>

          <div className="relative flex items-center bg-black border-4 border-white focus-within:border-[var(--brand-orange)] focus-within:shadow-[8px_8px_0_rgba(255,51,0,1)] transition-all mb-4">
            <Search size={28} className="ml-4 text-white" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="SEARCH NODE..."
              className="w-full bg-transparent border-none outline-none font-sans font-black text-xl text-[var(--brand-lime)] placeholder-[var(--text-tertiary)] p-4 uppercase"
            />
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-[500px]">
            {/* DOM-based List Sidebar */}
            <div className="w-full md:w-1/3 bg-black border-4 border-white/20 flex flex-col overflow-hidden">
              <div className="p-3 bg-white/10 border-b-4 border-white/20 font-sans font-black text-white uppercase text-sm tracking-widest">
                INDEXED NODES ({filtered.length})
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-2">
                {filtered.map(org => (
                  <button
                    key={`dom-${org.id}`}
                    onClick={() => setSelectedOrg(org)}
                    className={`w-full text-left p-3 border-2 transition-colors ${
                      selectedOrg?.id === org.id 
                        ? 'border-[var(--brand-lime)] bg-[var(--brand-lime)]/20 text-white' 
                        : 'border-white/10 hover:border-white/40 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <div className="font-sans font-black uppercase truncate text-lg">{org.name}</div>
                    <div className="text-xs truncate font-bold opacity-70 mt-1">{org.tagline}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Canvas Area */}
            <div className="flex-1 border-4 border-dashed border-white/20 relative cursor-crosshair">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center font-sans font-black text-4xl text-[var(--brand-lime)] animate-pulse uppercase text-center p-6">
                  <Activity className="mr-4 animate-spin inline" size={48} /> SYNCHRONIZING WITH SUPABASE...
                </div>
              ) : (
                <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
                  
                  {filtered.map((org) => (
                    <MeshNode key={org.id} org={org} onSelect={setSelectedOrg} />
                  ))}

                  {/* Grid Helper to make it look brutal and technical */}
                  <gridHelper args={[200, 50, 0xffffff, 0x333333]} position={[0, -20, 0]} />
                </Canvas>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Selected Organism Details */}
        <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col gap-6 relative z-10">
          {selectedOrg ? (
            <motion.div 
              key={selectedOrg.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black border-4 border-white p-8 hover:shadow-[12px_12px_0_rgba(212,255,0,1)] transition-all h-full flex flex-col"
            >
              <div className="border-b-4 border-white/20 pb-4 mb-6 flex justify-between items-start">
                <span className="px-3 py-1 bg-[var(--brand-lime)] text-black font-tech font-black text-sm tracking-widest border-2 border-black uppercase">
                  SELECTED NODE
                </span>
                <span className="text-[var(--text-tertiary)] font-tech text-xs">ID: {selectedOrg.id.split('-')[0]}</span>
              </div>
              
              <h2 className="font-sans font-black text-5xl text-white mb-4 uppercase tracking-tighter leading-none break-words">
                {selectedOrg.name}
              </h2>
              
              <p className="text-[var(--text-secondary)] font-sans text-xl font-bold mb-8 flex-1">
                {selectedOrg.tagline}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border-4 border-white/10 p-4 text-center">
                  <span className="block text-tech text-white/50 mb-1 font-bold">HEALTH</span>
                  <span className="font-sans font-black text-3xl text-[var(--brand-lime)]">{selectedOrg.health}%</span>
                </div>
                <div className="border-4 border-white/10 p-4 text-center">
                  <span className="block text-tech text-white/50 mb-1 font-bold">GENERATION</span>
                  <span className="font-sans font-black text-3xl text-white">GEN {selectedOrg.generation}</span>
                </div>
                <div className="border-4 border-white/10 p-4 text-center col-span-2">
                  <span className="block text-tech text-white/50 mb-1 font-bold">MUTATIONS</span>
                  <span className="font-sans font-black text-3xl text-[var(--brand-orange)]">{selectedOrg.mutations} ANOMALIES</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => router.push(`/organism/${selectedOrg.id}`)}
                  className="btn-brutal w-full !text-2xl !py-4 !border-4 !rounded-none uppercase tracking-widest flex justify-center items-center gap-3 !bg-[var(--brand-lime)] !text-black"
                >
                  <Search size={28} /> INSPECT NODE
                </button>
                <button
                  onClick={() => handleFork(selectedOrg)}
                  disabled={forked.has(selectedOrg.id)}
                  className={`btn-brutal w-full !text-2xl !py-4 !border-4 !rounded-none uppercase tracking-widest flex justify-center items-center gap-3 ${forked.has(selectedOrg.id) ? '!bg-[var(--brand-violet)] !text-white' : ''}`}
                >
                  {forked.has(selectedOrg.id) ? (
                    <><Sparkles size={28} /> FORKED</>
                  ) : (
                    <><GitFork size={28} /> FORK SEED</>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-black/50 border-8 border-dashed border-white/10 p-8 h-full flex items-center justify-center flex-col text-center">
              <Globe size={64} className="text-white/20 mb-6" />
              <p className="font-sans font-black text-4xl text-white/20 uppercase tracking-tighter">SELECT A NODE</p>
              <p className="font-sans font-bold text-[var(--text-tertiary)] mt-2">Interact with the 3D Mesh to extract data.</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}

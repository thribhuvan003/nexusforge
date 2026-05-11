import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NexusCore, AgentMessage, ThemeMode, MeshOrganism, BreedingProposal } from '@/types';

interface NexusForgeState {
  // Theme
  theme: ThemeMode;
  toggleTheme: () => void;

  // Current organism
  currentOrganism: NexusCore | null;
  setCurrentOrganism: (organism: NexusCore | null) => void;

  // User's organisms
  organisms: NexusCore[];
  addOrganism: (organism: NexusCore) => void;
  updateOrganism: (id: string, updates: Partial<NexusCore>) => void;
  removeOrganism: (id: string) => void;

  // Agent chat
  messages: AgentMessage[];
  addMessage: (message: AgentMessage) => void;
  clearMessages: () => void;
  isAgentsThinking: boolean;
  setAgentsThinking: (thinking: boolean) => void;
  activeAgent: string | null;
  setActiveAgent: (agentId: string | null) => void;

  // Mesh
  meshOrganisms: MeshOrganism[];
  setMeshOrganisms: (organisms: MeshOrganism[]) => void;

  // Breeding
  breedingProposal: BreedingProposal | null;
  setBreedingProposal: (proposal: BreedingProposal | null) => void;

  // UI state
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isCreating: boolean;
  setIsCreating: (creating: boolean) => void;
  evolutionCountdown: number;
  setEvolutionCountdown: (seconds: number) => void;
}

export const useStore = create<NexusForgeState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
        return { theme: newTheme };
      }),

      // Current organism
      currentOrganism: null,
      setCurrentOrganism: (organism) => set({ currentOrganism: organism }),

      // User's organisms
      organisms: [],
      addOrganism: (organism) => set((state) => ({
        organisms: [organism, ...state.organisms],
      })),
      updateOrganism: (id, updates) => set((state) => ({
        organisms: state.organisms.map((o) =>
          o.id === id ? { ...o, ...updates } : o
        ),
      })),
      removeOrganism: (id) => set((state) => ({
        organisms: state.organisms.filter((o) => o.id !== id),
      })),

      // Agent chat
      messages: [],
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
      })),
      clearMessages: () => set({ messages: [] }),
      isAgentsThinking: false,
      setAgentsThinking: (thinking) => set({ isAgentsThinking: thinking }),
      activeAgent: null,
      setActiveAgent: (agentId) => set({ activeAgent: agentId }),

      // Mesh
      meshOrganisms: [],
      setMeshOrganisms: (organisms) => set({ meshOrganisms: organisms }),

      // Breeding
      breedingProposal: null,
      setBreedingProposal: (proposal) => set({ breedingProposal: proposal }),

      // UI state
      isSidebarOpen: false,
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),
      isCreating: false,
      setIsCreating: (creating) => set({ isCreating: creating }),
      evolutionCountdown: 3600,
      setEvolutionCountdown: (seconds) => set({ evolutionCountdown: seconds }),
    }),
    {
      name: 'nexusforge-storage',
      partialize: (state) => ({
        theme: state.theme,
        organisms: state.organisms,
      }),
    }
  )
);

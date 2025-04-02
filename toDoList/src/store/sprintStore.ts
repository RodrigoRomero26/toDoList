import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
    sprints: ISprint[]; // Array of sprint IDs
    setArraySprints: (sprints: ISprint[]) => void;
    activeSprint: ISprint | null;
    setActiveSprint: (sprint: ISprint | null) => void;
    addSprint: (sprint: ISprint) => void;
    updateSprint: (sprint: ISprint) => void;
    deleteSprint: (sprintId: string) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    activeSprint: null,
    setArraySprints: (sprintArray) => set(() => ({ sprints: sprintArray })),
    setActiveSprint: (activeSprintIn) => set(() => ({ activeSprint: activeSprintIn })),
    addSprint: (newSprint) => set((state) => ({ sprints: [...state.sprints, newSprint] })),
    updateSprint: (updatedSprint) =>
        set((state) => {
            const updatedSprints = state.sprints.map((sprintA) =>
                sprintA.id === updatedSprint.id ? { ...sprintA, ...updatedSprint } : sprintA
            );
            return { sprints: updatedSprints };
        }),
    deleteSprint: (sprintId) =>
        set((state) => {
            const updatedSprints = state.sprints.filter((sprint) => sprint.id !== sprintId);
            return { sprints: updatedSprints };
        }),
}));
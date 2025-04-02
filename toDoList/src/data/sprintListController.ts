import axios from "axios";
import { API_URL_SPRINT } from "../Const";
import { ISprint } from "../types/ISprint";
import { putSprintList } from "../http/sprintListPut";

export const getSprintsController = async () : Promise<ISprint[]> => {
    try{
        const response = await axios.get<{ sprints: ISprint[]}>(API_URL_SPRINT);
        return response.data.sprints;
    } catch (error) {
        console.error("Error en getSprintsController:", error);
        return [];
    }
}

export const createSprintController = async (newSprint: ISprint) => {
    try {
        const sprintsDB = await getSprintsController();
        if (sprintsDB) {
            await putSprintList([...sprintsDB, newSprint]);
        } else {
            await putSprintList([newSprint]);
        }
        return newSprint;
    } catch (error) {
        console.error("Error en createSprintController:", error);
    }
}

export const updateSprintController = async (updatedSprint: ISprint) => {
    try {
        const sprintsDB = await getSprintsController();
        if (sprintsDB) {
            const result = sprintsDB.map((sprintDB) =>
                sprintDB.id === updatedSprint.id ? { ...sprintDB, ...updatedSprint } : sprintDB
            );
            await putSprintList(result);
        }
    } catch (error) {
        console.error("Error en updateSprintController:", error);
    }
}

export const deleteSprintController = async (idDeletedSprint: string) => {
    try {
        const sprintsDB = await getSprintsController();
        if (sprintsDB) {
            const updatedSprints = sprintsDB.filter((sprint) => sprint.id !== idDeletedSprint);
            await putSprintList(updatedSprints);
        }
    } catch (error) {
        console.error("Error en deleteSprintController:", error);
    }
}


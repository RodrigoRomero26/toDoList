import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ISprintList } from "../types/ISprintList";
import { API_URL_SPRINT } from "../Const";

export const putSprintList = async (sprint: ISprint[]) => {
    try{
        const response = await axios.put<ISprintList>(API_URL_SPRINT, {
            sprints: sprint
        });
        return response.data;
    } catch (error) {
        console.error("Algo salio mal sprintListPut:", error);
    }
}
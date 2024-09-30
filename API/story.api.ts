import { toast } from "sonner";
import api from "./middleware";

export const fetchStory = async (id: string) => {
    try {
        const response = await api.get(`/story/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error)
        toast.message("Something went wrong")
    }
}
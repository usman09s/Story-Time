import api from "./middleware";


export const uploadMedia = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);
    const { data } = await api.post("/upload-media", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

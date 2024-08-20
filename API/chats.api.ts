import { toast } from "sonner";
import api from "./middleware";


export const uploadMedia = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("media", file);
        const  {data}  = await api.post("/upload-media", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        
    }
};

export const downloadImage = async (key:string) => {
    try {
        const response = await api.post('/image-download', { key }, {
            responseType: 'blob' 
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = key.split('/').pop() || 'download'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Error downloading image:', error);
        toast.error('Download failed');
    }
};

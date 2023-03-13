import axios from "axios";
import { toast } from "react-toastify";

export async function uploadImg(file) {
    const formData = new FormData();
    formData.append('image', file);
    const imageApiKey = "906bfdafb7a4a5b92021d570714ff50f";

    if (file) {
        try {
            const imgResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, formData)
            if (imgResponse.status === 200) {
                const photoURL = imgResponse.data.data.url;
                return photoURL
            }
        } catch (error) {
            console.log(error);
            return toast.error(error.message)
        }

    }
}
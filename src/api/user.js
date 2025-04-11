import { API_BASE_URL } from "../../config/config";

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });
        return await response.json();
    } catch (error) {
        console.error("Error saat mengambil profil user:", error);
        return null;
    }
};

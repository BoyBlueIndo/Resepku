import API_URL from '../config/config';

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error saat login:", error);
        return null;
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error saat register:", error);
        return null;
    }
};

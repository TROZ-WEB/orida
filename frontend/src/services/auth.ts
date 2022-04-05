import { POST } from "@utils/http";

export interface LoginProps {
    email: string;
    password: string;
}
export async function login({ email, password }: LoginProps) {
    try {
        const response = await POST("/users/login", { email, password });
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        //
    } catch (error) {
        console.error(error);
    }
}

const AuthService = {
    login,
    logout,
}

export default AuthService;

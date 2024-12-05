import { useUserStore } from "../store/useUserStore";

const useLoginUser = () => {
    
    const {setUser} = useUserStore();
    const _handleLogin = async (email: string, password: string) => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Credenciales incorrectas');
                }
                throw new Error('Error en el login');
            }


            const loginData = await response.json();
            const token = loginData.access_token;

            if (!token) {
                throw new Error('Token de acceso no recibido');
            }

            const profileResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!profileResponse.ok) {
                if (profileResponse.status === 401) {
                    throw new Error('No autorizado. Verifica tu token de acceso');
                }
                throw new Error('No se pudo obtener el perfil del usuario');
            }

            const profileData = await profileResponse.json();

            // Guardamos los datos del perfil en el store
            setUser(profileData);

            return profileData;
        } catch (error: any) {
            console.error('Error en el proceso de login o perfil:', error);
            return null; 
        }
    };

    return {
        _handleLogin,
    };
};

export default useLoginUser;

import axios from "axios";
const ENV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXNlbWFuYTItZGVzYWZpbzM2MC0xNzM0MjA1NzczMzc3LmNsdXN0ZXItZm5qZGZmbXR0amh5MnFxZHVnaDN5ZWhoczIuY2xvdWR3b3Jrc3RhdGlvbnMuZGV2IiwiaWF0IjoxNzM2MTIwNTIxLCJleHAiOjE3MzYyMDY5MjB9.X-DEy3rR8fmhOijHWRobMlgflBfMAc3RktGNx8uF0QAeLU7TZWpcrmKzxeeNC6HRMDzF2CVm-esamiiuItzob_rsnrDTVs591C6jN2wZrOYTMj8AEWjnd8Dlk0rxV5jHX0LeFJM87wTBFasVW52Dk-PBgOHM-6XPaKx9kERUhaIANF4GxYg_hY5DtuRNMeFzi09O4-cPejqnr1d80VbEayXBph6r2jl7gKnORr56ja0tZTiD8Up0MddOnS0JfwKa12ptxSzBge54H2mNhbr2VUAaTLhWO9Ju9KwaQGhZs_ErBxPCrnaLc5X7wnpFBjx95SxF0wJ6xI7BrkgjFMFxHg"; // Token proporcionado por la variable de entorno

// Función para obtener el token del usuario
const getUserToken = (): string | null => {
  return localStorage.getItem("jwtToken"); // Asegúrate de almacenar el token de usuario aquí
};

// Configurar un cliente axios con los encabezados necesarios
const apiClient = axios.create({
  baseURL: "api",
  withCredentials: true, 
});

// Interceptor para agregar ambos tokens a las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    // Agregar el token proporcionado por la variable de entorno
    if (ENV_TOKEN) {
      //config.headers["Env-Token"] = ENV_TOKEN;
      config.headers.Authorization = `Bearer ${ENV_TOKEN}`;

    }

    // Agregar el token del usuario si está disponible
    const userToken = getUserToken();
    if (userToken) {
      //config.headers.Authorization = `Bearer ${userToken}`;
      config.headers["Access-X"] = `Bearer ${userToken}`;;

    }

    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default apiClient;
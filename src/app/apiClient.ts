import axios from "axios";
const ENV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXNlbWFuYTItZGVzYWZpbzM2MC0xNzM0MjA1NzczMzc3LmNsdXN0ZXItZm5qZGZmbXR0amh5MnFxZHVnaDN5ZWhoczIuY2xvdWR3b3Jrc3RhdGlvbnMuZGV2IiwiaWF0IjoxNzM2MDI5ODM5LCJleHAiOjE3MzYxMTYyMzl9.ut7B8JCQH34Zio3tS6IEDmLiijdYJUWWArTisy_1j7cTX_5p1Xh33F07HNHWoJbEXujrLP7rAD26Y4z70my86mKmAwKwplZcR4nl_zM624Q8A99COI7noC-cDBUCzR0db65PXEJoZcyxQTYfu_mkboZFuC9lcsPCOB6p3vlMWzJfSjXBXBPUJjuhyif7s77mQSqkC4Lw_8xLTvc0jokrO6LngAUCe5NfH-IpcF9hrQlY4fi-5KrQizL4AQUIy5Rwkx96Mc661_UP8bBlcAP4AdeCDJ84aY9lCeJ2hhMuXZzbjJVlYFEhIvS9YkO0Ctrf3stJgE3wPP_ov8_KgICGpQ"; // Token proporcionado por la variable de entorno

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
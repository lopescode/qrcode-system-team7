import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost:3000";

export abstract class Api {
  static async get<T>(path: string): Promise<T | null> {
    try {
      const { data } = await axios.get(`${API_URL}/${path}`);

      return data;
    } catch (error) {
      toast(`Erro ao buscar ${path}, tente novamente`);
      return null;
    }
  }

  static async post<T>(path: string, body: any): Promise<T | null> {
    try {
      const { data } = await axios.post(`${API_URL}/${path}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      toast(`Erro ao acessar ${path}, tente novamente`);
      return null;
    }
  }
}

import axios from "axios";

type TGenericResponseData = {
  statusCode: number;
  path: string;
  timestamp: string;
  message?: any[];
  error?: string;
};

type TPostResponseData = TGenericResponseData & {
  result: any[];
};

type TPutResponseData = TPostResponseData;

type TGetResponseData = TGenericResponseData & {
  result: any[];
};

export abstract class HttpRequestHelper {
  static async post(
    path: string,
    body: { [key: string]: any },
    accessToken?: string
  ): Promise<TPostResponseData | undefined> {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + path,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async put(
    path: string,
    body: { [key: string]: any },
    accessToken?: string
  ): Promise<TPutResponseData | undefined> {
    try {
      const { data } = await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URL + path,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          method: "PUT",
          body: JSON.stringify(body),
        }
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async get(
    path: string,
    accessToken?: string
  ): Promise<TGetResponseData | undefined> {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + path,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

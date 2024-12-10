import axios from "axios";
import md5 from "md5";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

export interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface FetchComicsResponse {
  comics: Comic[];
  total: number;
}

export const fetchComics = async (
  page: number,
  limit: number
): Promise<FetchComicsResponse> => {
  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);
  const offset = (page - 1) * limit;

  const response = await axios.get(`${BASE_URL}/comics`, {
    params: {
      apikey: PUBLIC_KEY,
      ts: timestamp,
      hash,
      format: "comic",
      limit,
      offset,
    },
    headers: {
      Accept: "*/*",
    },
  });

  return {
    comics: response.data.data.results,
    total: response.data.data.total,
  };
};

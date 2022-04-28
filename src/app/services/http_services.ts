import { request } from "../utils/http";
import { GET_ALL_ASSETS } from "../utils/constants";

export async function getAssets(page: number, sort?: string) {
  return request.get(GET_ALL_ASSETS + page + (sort ? `&sort=${sort}` : ""));
}

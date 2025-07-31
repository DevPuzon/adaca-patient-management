import { cookie } from "./cookie";

export const getToken = () => cookie.get("token");

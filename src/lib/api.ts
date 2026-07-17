import axios from "axios";
import { env } from "@/configs/env.config";


export const api = axios.create({
    baseURL: env.API_URL,
    withCredentials: true
})
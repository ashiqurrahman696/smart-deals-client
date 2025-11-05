import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: "https://smart-deals-server-beryl.vercel.app/"
});

const useAxiosSecure = () => {
    const {user, signOutUser} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(config => {
            const token = user.accessToken;
            if(token){
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        });
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.status;
            if(status === 401 || status === 403){
                console.log("Logout user for bad request");
                signOutUser().then(() => {
                    navigate("/register")
                });
            }
        });
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }
    }, [user, navigate, signOutUser]);
    return instance;
}

export default useAxiosSecure;
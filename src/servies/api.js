import { json } from "react-router-dom";

const baseURL= 'http://localhost:4000';

const request = async (method, endpoint, params, token = null) => {
    
    method = method.toLowercase();
    let fullUrl = `${baseURL}${endpoint}`;
    let body = null;

    switch(method){
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            body= JSON.stringify(params);
        break;  
    }

    let headers = {'Content-type': 'aplication/json'};

    if(token){
        headers.Autorization= `Bearer ${token}`;
    }

    let req = await fetch(fullUrl, {method, headers, body});
    let json = await req.json();

    return json;
}


export default () => {
    return {

        getToken: ()=>{
            return localStorage.getItem('token');
        },

        validateToken: async ()=>{
            let token= localStorage.getItem('token');
            let json= await request('post', '', {}, token); //verificar e fazer
            return json;
        },

        login: async(login, senha)=>{
            let json = await request('post', '/login', {login, senha});
            return json;
        }

    };
}
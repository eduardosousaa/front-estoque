"use client"
import {useState, useEffect, createContext} from "react";
import {useRouter, usePathname} from "next/navigation";
import Constantes from '../Constantes';
import {parseCookies,setCookie} from "nookies";
import LoadingGif from "../Components/ElementsUI/LoadingGif";

export const AuthContext = createContext({});
export function AuthProvider({children}) {

    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const router = useRouter();
    const [permissions, setPermissions] = useState();
    const [profileName, setProfileName] = useState();
    const [username, setUsername] = useState();

    const { "token1": token1 } = parseCookies();
    const { "contas": contas } = parseCookies();
   
   /*  if(contasCookie != undefined){
        setContas(contasCookie);
    } */

    async function signIn(username,password){ 
        
        await fetch(Constantes.urlBackAdmin + 'admin/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                      username, 
                      password
                  }),
                }).then((response) => 
                    response.json().then(data => ({
                         headers: response.headers.get("authorization"),
                         status: response.status, 
                         body: data }))
                ) 
                .then(({headers, status, body}) => {
          
                    switch(status){
                        case 200:
                          setCookie(undefined,"token1",headers,{path:"/"});
                          body.forEach((_,index) => {
                            body[index].principal = index == 0; 
                          });
                          setCookie(undefined,"contas",JSON.stringify(body),{path:"/"});
                          getInfo(headers,body[0].id);
                          router.push("/custos");
                        break;
                        case 400:
                          console.log("erro:",body);
                        break;
                        
                    }
                })
                .catch((error) => {
                   console.log(error);
                   /* acionarAlerta("warning", "Não foi possível cadastrar o Contrato")
                    setLoading(false); */
                 });
        
    }


    async function getInfo(token1,id){ 
       
        await fetch(Constantes.urlBackAdmin + 'admin/info?' + new URLSearchParams({accountId: id}), {
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json',
                         'Module': 'ADMINISTRATION',
                         'Authorization': `Bearer ${token1}`
                     },
                     }).then((response) => 
                        response.json().then(data => ({
                            headers: response.headers.get("authorization"),
                            status: response.status, 
                            body: data }))
                     ) 
                     .then(({headers, status, body}) => {
                        
                        switch(status){
                            case 200:
                              /* console.log(headers) */
                              if(contas != undefined){
                                let contasParse = JSON.parse(contas);
                                contasParse.forEach((_,index) => {
                                  contasParse[index].principal =  contasParse[index].id == id; 
                                });
                                setCookie(undefined,"contas",JSON.stringify(contasParse),{path:"/"});
                              }
                              setCookie(undefined,"token2",headers,{path:"/"});
                              setPermissions(body.permissions);
                              setProfileName(body.profileName);
                              setUsername(body.username);
                            break;
                            case 400:
                              console.log("erro:",body);
                            break;
                            case 404:
                              console.log("erro:",body);
                            break;
                            
                        }
                   })
                   .catch((error) => {
                      console.log(error);
                      /* acionarAlerta("warning", "Não foi possível cadastrar o Contrato")
                       setLoading(false); */
                    });
   }

   useEffect(() => {

      if(token1 == undefined){
        router.push("/login");
      }else{
        /* if(pathname.includes("estoque") || pathname.includes("/login")){
           router.push(pathname);
        }else{
           router.push("/estoque")
        }  
 */
        if(contas != undefined){
          let contasParse = JSON.parse(contas);
          let index = contasParse.findIndex((conta) => conta.principal == true);
          getInfo(token1,contasParse[index].id);
        }
      }
      setLoading(false);
   },[]);

   if(loading){
     return (<LoadingGif/>);
   }
   
   return (

        <AuthContext.Provider value={{ contas, signIn, getInfo, permissions, profileName, username }}>
            {children}
        </AuthContext.Provider>       
   )
}
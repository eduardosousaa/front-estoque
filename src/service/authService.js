// 'use client';
// import { createContext, useState } from 'react';
// import { setCookie } from 'nookies';
// import { useRouter } from 'next/navigation';

// export const AuthContext = createContext({});

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   async function signIn(username, password) {
//     // Simula login
//     console.log('Fazendo login com:', username, password);
    
//     // Simula resposta com "token"
//     const fakeResponse = { token: 'fake-token' };

//     // Armazena o token em cookie
//     setCookie(undefined, 'token', fakeResponse.token, {
//       maxAge: 60 * 60 * 1, // 1 hora
//       path: '/',
//     });

//     setIsAuthenticated(true);
//     router.push('/estoque'); // redireciona para página home
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, signIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

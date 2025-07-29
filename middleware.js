import { NextResponse } from "next/server";

export function middleware(request) {

  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin','*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', '*');

  if(request.method === "OPTIONS"){
        return new Response(null, {status:204,
                                   headers:{
                                     'Access-Control-Allow-Origin':'*',
                                     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                                     'Access-Control-Allow-Headers': '*',

                                   }})
    
  }


  return response;
}

export const config = {
    matcher: ['/api/:path*'],
}
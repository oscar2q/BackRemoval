/* eslint-disable prettier/prettier */
export interface userIntBasic {
  id_cliente:string;
  correoelectronico:string;
  nombre_user:string;
  apellido:string;
  genero:Genero;
  ubicacion:string;
}

export interface user{
  correoelectronico:string;
  nombre_user:string;
  apellido:string;
  genero:string;
  ubicacion:string;
} 


export interface BDB{ verificationemail:string; };
export interface BDBGetPassword{ password:string[] }
export interface passwor{ contrasena:string }

enum Genero{
  "Masculino" = "H",
  "Femenino" = "M"
}

export interface jwtUserBasic extends user{
  iat:string;
  exp:string;
}
/* eslint-disable prettier/prettier */
export interface userIntBasic {
  correoelectronico:string;
  nombre_user:string;
  apellido:string;
  genero:Genero;
  ubicacion:string;
}


export interface BDB{ verificationemail:string; };
export interface BDBGetPassword{ password:string[] }
export interface passwor{ contrasena:string }

enum Genero{
  "Masculino" = "H",
  "Femenino" = "M"
}


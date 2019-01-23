interface User {
  name?:string;
  age?:number;
  children?:string[];
}
interface HelloRequest {
  users?:User[];
}
interface HelloReply {
  users?:User[];
}
export function sayHello(param:HelloRequest):Promise<HelloReply>;
# grpc-vuex
JavaScript (Vuex) code generator with grpc-web



## Install
`npm i -g grpc-vuex` or `yarn global add grpc-vuex`

### Dependencies (Required!)
protoc  
http://google.github.io/proto-lens/installing-protoc.html

protoc-gen-grpc-web  
https://github.com/grpc/grpc-web#code-generator-plugin



## Run
`grpc-vuex <output_file_path> <proto_file_paths ...>`

## Command Options
`grpc-vuex -h`

## Example
`grpc-vuex output.js helloworld.proto --endpoint https://yourdomain.com`

### helloworld.proto

```proto
syntax = "proto3";
package helloworld;
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}
message User {
  string name = 1;
  int32 age = 2;
  repeated string children = 3;
}
message HelloRequest {
  repeated User users = 1;
}
message HelloReply {
  repeated User users = 1;
}
```

### output.d.ts

```ts
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
```

### output.js

```
(omitted)
```

### In your JS code

```js
import { sayHello } from './output'

sayHello({
  users: [
    {
      name: 'foobar',
      age: '99',
      children: ['john', 'mike']
    }
  ]
}).then((res)=>console.log(res))
```
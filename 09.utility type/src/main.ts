@ Partial
파셔 타입은 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있습니다.

interface Address {
  email : string;
  address: string;
}

const me = {};
// 비어있어도 {} 가 포함되기에 Partial을 줄 수 있음
const you: Partial<Address> = { email:"john@gmail.com"};
// you의 경우 한 가지 내용만 들어가 있어서 Address 그대로 쓸 경우 오류가 남
// 이 때 Partial Utility Type을 사용할 수 있음
// 위와같이 지정해줬을때, Address 안에 있는 것들이 사용되고만 있으면 됨
const all: Address = { email: "john@gmail.com", address: "John"};
// all 의 경우 두 내용이 들어가 있기 때문에 Address를 써도 무방

@ Pick
픽 타입은 특정 타입에서 몇 개의 속성을 선택하여 타입을 정의합니다.

interface Todo {
  title:string;
  description:string;
  completed:boolean;
}

 type TodoPriview = Pick<Todo, "title" | "completed">;
 // interface 안에서 필요한 타입만 선택하여 위와 같이 작성
 // Pick은 특정 타입에서 필요한 타입을 pick 해서 새롭게 정의 해주는 것.

const todo = {
  title:"Clean Room",
  completed: false
}

// 이렇게 될 경우 변수 todo에 타입을 어떻게 줘야할까?
// todo 옆에 Partial<Todo> 이렇게 주기도 가능함

@ Omit(생략하다)
특정 속성만 제거한 타입을 정의함. Pick과 반대

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPriview = Omit<Todo, "description">;
// 타입을 명시해야하는데, todo에서는 description이 없음, 그래서 Omit을 사용해서 필요없는 속성 제거한 나머지 필요한 속성만 담긴 Todo 반환

const todo = { 
  title: "Clean Room ",
  completed: false,
  createdAt:124324234
}

@ Exclude
일반 Union 유형을 전달한 다음 두 번째 인수에서 제거할 멤버를 지정합니다.

type myUnionType = 'Raspberries' | "Apples" | "lemons" | "bananas"

// this works!
let lemon: myUnionType = "lemons"

let noLemonsPlease: Exclude<myUnionType, "lemons"> = "Raspberries"

// -- Type is "Raspberries" | "Apples" | "bananas"

let noApplesOrLemons: Exclude<myUnionType, "lemons" | "Apples"> = "Raspberries"

// -- Type is "Raspberries" | "bananas"

let onlyRaspberries: Exclude<myUnionType, "lemons" | "Apples" | "bananas"> = "Raspberries"

// -- Type is "Raspberries"

let backToLemons: myUnionType = "lemons"

// -- Type is 'Raspberries' | "Apples" | "lemons" | "bananas"

@ Required
원래 유형이 일부 속성을 선택 사항으로 정의한 경우에도 객체에 Required 속성이 있는지 확인해야하는 경우가 있음

type User = {
  firstName: string,
  lastName? : string
} // lastName에 ?(옵셔널 체이닝)을 걸어 사용해도 되고 안해도 되게끔 해두었음


let firstUser: User = {
  firstName: "John"
}

let secondUser: Required<User> = {
  firstName: "John"
}
// 하지만 Required<User>로 했을 경우 ?가 있어도 모든 속성을 다 필수로 만들어버림 

@ Record <KeyUsage, Type>
속성 키가 Keys 이고 속성 값이 Type인 객체 type을 구성합니다.
이 유틸리티는 type의 속성을 다른 type에 매핑하는 데 사용할 수 있습니다.

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred"

const cats: Record<CatName, CatInfo> = {
  miffy: {age: 10, breed:"persian"},
  boris: {age:5, breed:"maine coon"},
  mordred: {age:16, breed:"british shorthair"}
}

@ ReturnType <T>
함수 T의 반환 타입으로 구성된 타입을 만듭니다.

type T0 = ReturnType<()=> string> // string
type T1 = ReturnType<(s: string)  => void> // void

function fn(str:string) {
  return str;
}

const a : ReturnType<typeof fn> = "Hello"
const b : ReturnType<typeof fn> = true; // Error
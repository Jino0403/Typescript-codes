@ 예시 1

// Generic 사용 전
// function getArrayLength(arr: number[] | string[] | boolean[]) {
//   return arr.length;
// }

// const array1 = [1, 2, 3];
// const array2 = ['a', 'b', 'c'];
// const array3 = [true, false, true];

// getArrayLength(array1);
// getArrayLength(array2);
// getArrayLength(array3);

// getArrayLength에 다른 타입의 배열을 넣어주고 싶을때 마다, getArrayLength의 매개변수의 타입을
// union타입으로 추가해줄 수도 있지만 Generic을 사용해서 더 깔끔하게 만들 수 있음

// Generic 사용 후
function getArrayLength<T>(arr: T[]) {
  return arr.length;
}
// 함수 이름 옆에 <T> 라고 넣고 매개변수 타입을 T[]라고 해준 후에

const array1 = [1, 2, 3];
const array2 = ['a', 'b', 'c'];
const array3 = [true, false, true];

getArrayLength<number>(array1);
getArrayLength<string>(array2);
getArrayLength<boolean>(array3);

// 위와 같이 <T> 자리에 넣고자하는 배열의 타입을 넣으면 된다.


@ 예시 2

interface Vehicle {
  name:string;
  color:string;
  option:any;
}

const car:Vehicle = {
  name: 'Car',
  color: 'Red',
  option: {
    price: 1000
  }
}

const bike:Vehicle = {
  name: 'Bike',
  color: 'Green',
  option: true
}

// 이와 같이 car와 bike 타입 지정까지 해준 상황에서 Vehicle의 option: any에서 any를 쓰지 않고
// 타입을 처리해 주고 싶음, 이 때도 Generic 사용가능

interface Vehicle<T> {
  name:string;
  color:string;
  option:T;
}

const car:Vehicle<{price:number}> = {
  name: 'Car',
  color: 'Red',
  option: {
    price: 1000
  }
}

const bike:Vehicle<boolean> = {
  name: 'Bike',
  color: 'Green',
  option: true
}

// 위와 같이 Vehicle<T> 써주고 제네릭을 사용하고자 하는 부분에 위와같이 사용해주면, 각각에 맞춰 잘 들어감

 @ Generic 사용시 장점 !
// Generic 사용시 재사용성이 높은 함수와 클래스를 생성할 수 있음
// any 처럼 타입을 직접 지정하지 않지만, 타입을 체크해 컴파일러가 오류를 찾을 수 있게됨


 @ 예시 3 (함수 매개변수 1개 일때)
 // non-generic
 const makeArr = (x: number) => {
  return [x];
 }

 const arr = makeArr(5);
 const arr1 = makeArr("a"); // 매개변수 타입이 넘버가 아니므로 오류 발생

  // generic
 const makeArr1 = <T>(x: T) => {
    return [x];
 }

const arr2 = makeArr1(5);
const arr3 = makeArr1("a");

 // 이와 같이 해주면 문제 없이 됨

  @ 예시 4 (함수 매개변수 2개일 때)
  const makeArry = <T,Y>(x:T, y:Y) : [T,Y] => {
    return [x,y];
  }
  
  const arry = makeArry<number , number>(4,5);
  const arry1 = makeArry<string , string>("a","b"); 
  
  // 위와 같이 타입을 지정해 줄 수있고, T,Y의 경우 어느것을 써도 상관은 없음.
  // 반환하는 타입은 매개변수의 타입인 T와 Y를 배열에 넣어 반환하면 됨
  // 또한 T,Y에 아래와 같이기본값을 넣어줄 수 있음.

  const makeArry = <T,Y = string>(x:T, y:Y) : [T,Y] => {
    return [x,y];
  }

  @ 예시 5 (Generic과 Extends 같이 사용)

  const makeFullName  = (obj: {firstName: string, lastName: string}) => {
    return {
      ...obj,
      fullName: obj.firstName + " " + obj.lastName
    }
  }

  makeFullName({firstName:"John", lastName: "Doe", location:"Seoul"})
  // firstName과 lastName말고 location을 넣어주고 싶은데 object에 타입으로 넣어 줄 때 없었어서 오류 발생
  // 아래와 같이 해주면 됨

  const makeFullName  = <T extends {firstName: string, lastName: string}> (obj: T) => {
    return {
      ...obj,
      fullName: obj.firstName + " " + obj.lastName
    }
  }

  // 이렇게 작성을 하게 되면 obj에 매개변수로 firstName과 lastName부분은 항상 들어오고 그 다음 여기에서 확장해서 
  // 새로운 것들이 들어올 수 있게 됨 


  @ React에서의 Generic

  import React from 'react'

  interface Props {
    name: string;
  }

  const ReactComponent:React.FC<Props> = ({name}) => {
    const [state] = useState<{name: string|null}>({name:""});
  
    state.name

    return <div>{name}</div>
  }

  // 컴포넌트에 Props로 무엇이 올지 모르기 때문에 Generic을 사용하고
  // useState도 Generic 타입을 받습니다.

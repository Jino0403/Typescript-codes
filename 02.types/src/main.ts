// Boolean
let boolean: boolean;
let falseBoolean: boolean = false;

// Number
let number: number;
let integer: number = 6;
let float: number = 1.2345;

// String
let string: string;
let firstName: string = 'Doe';

// Array
// 한가지 타입만 가지는 배열, 둘다 동일하게 배열안에 string 타입 들어있는것이 됨
let names1: string[] = ['John', 'Kim'];
let names2: Array<string> = ['John', 'Kim'];

// 여러 타입을 가지는 배열(유니언 타입 사용)
let array1: (string | number)[] = ['John', 1, 2];
let array2: Array<string | number> = ['John', 1, 2];

// 여러 타입을 단언할 수 없을때 Any
let someArray: any[] = ['John', 1, [], [], false];

// Interface, Type

// 읽기 전용 배열 생성(readonly, ReadonlyArray)
let stringArray: readonly string[] = ['John', 'Kim', 'hi'];
let numberArray: ReadonlyArray<number> = [1, 2, 3];

stringArray.push('c');
//
numberArray[0] = 3;

// Tuple
// 배열과 비슷하지만 그 자리에 정해진 type과 고정된 길이를 지켜줘야함
let tuple1: [string, number];
tuple1 = ['a', 1];
tuple1 = ['a', 1, 2]; // 길이가 다르기에 오류
tuple1 = [1, 'a']; // 순서가 다르기에 오류

// 이차원 배열
let users: [number, string][];
users = [
  [1, 'John'],
  [2, 'Joe'],
];

let tuple2: [string, number];
tuple2 = ['a', 1];
tuple2.push(2);
console.log(tuple2); // 콘솔로 값이 잘 들어간 것도 확인 가능 (3) ["a",1,2]
// 메소드를 이용해 가지고 값을 넣는것은 에러발생 없이 가능
// 하지만 string , number이외의 타입들을 넣는것은 에러발생, 불가능

// Any
// 모든 타입 할당가능, 변수의 어떤 값도 할당 가능하므로 되도록 사용 X
// 만약 third-party library 사용할때 라이브러리 타입 다 알수가 없음. 그때 사용해주면됨
let any: any = 'abc';
any = 1;
any = [];

// unknown
// 알수없는 타입, 어떠한 값도 할당이 가능
// 이 타입이 들어가 있는 변수는 다른 변수에 할당할 수는 없음
let unknown: unknown = false;
let string1: boolean = unknown; // 통상적으로 할당해 주지 못하지만 할당하는 방법이 있음
let string2: boolean = unknown as boolean; // 타입단원방법. 타입스크립트에게 이 타입이 맞다, 에러 발생시키지 말라 얘기함

// Object
// typeof {} , typeof [] , typeof null typeof new Date()을 사용하면 모두 "object"가 나온다. 잘못된 것이지만 너무나 많이 사용중이기에
// 변경이 불가하다. 이렇게 나온다는 거 정도만 참고하고 있어라.

let obj: object = {};
let arr: object = [];
let nul: object = null; // tsconfig.json 에서 strint 옵션을 true로 해주면 null 할당 오류가 발생, 없애주면 할당가능
let date: object = new Date();

const obj1: { id: number; title: string; description: string } = {
  id: 1,
  title: 'title1',
  description: 'description1',
};
// 여기서 type을 object로 줘도 되지만 그거보다는 위와같이 상세하게 해주는게 좋다.
// 안에 값을 추가할 때도 type을 같이 추가해줘야 오류가 발생하지 않는다.

// Union
// 두 개 이상의 타입을 허용

let union: string | number;
union = 'a';
union = 1;
union = [];

// function
// 반환이 있을때
let func1: (arg1: number, arg2: number) => number;
func1 = function (x, y) {
  return x * y;
};
// let func1;까지만 선언 한다면 x,y 에는 암시적 any 형식 오류가 발생하여 위와 같이 작성하기

// 반환이 없을 때는 void 타입을 사용하기
let func2: () => void;
func2 = function () {
  console.log('hi');
};

// null, undefined
// 어떠한 type에도 할당을 해 줄 수가 있음
// 형식 할당오류는 tsconfig.json 파일에서 compilerOption에서 strictNullChecks가 기본 true로 되어있으므로 false로 변경, 추가해주기
let number1: number = undefined;
let string9: string = null;
let object: { a: 10; b: false } = undefined;
let array: any[] = null;
let undefined1: undefined = null;
let null1: null = undefined;
let void1: void = null;
let void2: void = undefined;

// 위에서 얘기햇듯이, strictNullChecks 가 false가 되어있으면 위와같이 null, undefined에 할당 가능
// 실제로는 true로 해주는게 맞음. void 타입이 저종된 변수에는 undefined 값 할당 가능

// Void
// 함수에서 return 하지 않을때 주로 사용
function greeting(): void {
  console.log('hi');
}
const hi: void = greeting();
console.log(hi); // undefined ,, 가 나오지만 그렇다고 void가 아닌 undefined를 타입 지정해주려하면 에러남
//실제 위 함수에서 return 안하면 반환은 undefined

// Never
// 항상 오류를 출력하거나 return 값을 절대로 내보내지 않음을 확신할 때 사용
// 아래와 같이 항상 오류를 출력하거나
function throwError(): never {
  throw new Error('error');
}

// return 값을 절대 내보내지 않는 무한반복..
function keepProcessing(): never {
  while (true) {
    console.log('hi');
  }
}

// 빈 배열을 타입으로 잘못 선언한 경우에도 never 타입을 가짐
const never: [] = [];
never.push(1); // 실제로 배열에 아무것도 들어오지 않아 never, 할당불가 발생

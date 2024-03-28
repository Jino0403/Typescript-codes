// 기본적인 구조는 같지만 매개변수가 다를 때 오버로딩을 이용해서 두 함수를 하나로 만들어 줄 수 있음

// 타입 선언
function add(a: string, b: string): string;
function add(a: number, b: number): number;

// 함수 구현
function add(a: any, b: any): any {
  return a + b;
}

// 결과 확인
add('hello', 'world'); // hello world
add(1, 2); // 1 2
add(1, 'hello'); // string과 number가 동시에 있는 것은 없으므로 오류 발생


@ 매개면수에 직접적으로 type을 union으로 내주는 방법
function saySomething(word: string): string {
  return word;
}

saySomething('hello'); // "hello"
// 만약 saySomething(['hello' , 'world']) 이렇게 넣었을때 'hello world' 이런식으로 나타내고 싶음
// 첫번째 방법은 union 타입 이용, word: string | string[]으로 변경 및 함수 내 타입 별 반환 로직 변경

function saySomething(word: string | string[]): string {
  if (typeof word === 'string') {
    return word;
  } else if (Array.isArray(word)) {
    return word.join(' ');
  }
  throw new Error("unable to say something")
}
// 이 상태로 두게 되면 string 부분에서 에러가 발생하는데 끝에 둘다 아닐경우를 return 해주는게 없어서
// 에러가 발생함. thow new Error (에러) 던져주면됨

saySomething('hello'); // "hello"

@ 오버로딩으로 하는 방법

function saySomething(word:string): string
function saySomething(words: string[]): string
function saySomething(word:any): string {
  if (typeof word === 'string') {
    return word;
  } else if (Array.isArray(word)) {
    return word.join(' ');
  }
  throw new Error("unable to say something")
}
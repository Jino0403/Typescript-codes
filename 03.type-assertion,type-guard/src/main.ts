const bodyElement = document.querySelector('body') as HTMLBodyElement;
bodyElement.innerText = 'Hello';
// bodyElement가 null 일수도 있다는 에러가 뜨는데 우리는 index.html에서 body가 있다고 알고있지만
// 혹여나 body가 없는 경우 null 값을 반환함. 이 오류는 type 단원을 사용하여 처리 가능
// document.querySelector('body') 뒤에 as HTMLBodyElement;를 붙여주면 에러가 안남

const bodyElement1 = document.querySelector('body');
bodyElement1!.innerText = 'Hello';

// 이외에도 ! (exclamation / bang operator): 느낌표 연산자를 사용하여
// null이나 undefined가 아니라고 TypeScript에 절대 아니라고 말해줄 수 있음

// 마지막으로 typeGuard를 사용하여 아래와 같이 bodyElement가 무조건 있을때만
// innerText를 이용해 텍스트 넣어줄 수 있게도 사용가능하게 할 수있음
const bodyElement2 = document.querySelector('body');
if (bodyElement2) {
  bodyElement2.innerText = 'Hello';
}

// 타입 단원을 잘못 사용한 예시

function func(arg: string | null) {
  return (arg as string).toLowerCase();
}

func('hello');
func(null);

// 그냥 arg.toLowerCase()까지만 쓱면 arg가 null 일수도 있다는 메세지가 뜨기에 타입 단원 사용
// 무조건 string이라고 명명 했지만, console을 찍어보면 null을 넣었을때는 에러가 발생한다.
// string은 상관없지만 null을 받아왔을때는 toLowerCase() 메소드를 사용할 수 없는데 사용하려고 해서.
// 이럴때는 typeGuard를 사용해준다.

// function func(arg: string | null) {
//   if (arg) {
//     return arg.toLowerCase();
//   }
// }

// func('hello');
// func(null);
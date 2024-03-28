@ Extends 
Extends 키워드는 자바스크립트에서도 사용할 수 있으며 부모 클래스에 있는 프로퍼티나 메소드를 상속해서 사용할 수 있게 만들어줌

@ implements
implements 키워드는 새로운 클래스의 타입 체크를 위해서 사용되며,  그 클래스의 모양을 정의할 때 사용합니다.
(부모 클래스의 프로퍼티와 메소드를 상속받아서 사용하는게 아님)   

class Car {
   mileage = 0;
   price = 100;
   color = 'white';

   drive() {
    return 'drive!';
   }

   brake() {
    return 'brake!';
   }
}

class Ford extends Car {

}
const myFordCar = new Ford();
// myFordCar. 하게되면 Car와 Ford 안에 있는 메소드나 프로퍼티 전부 사용 가능

 - 변경 전()
  class Ford1 implements Car {

  }
  // 'Ford1' 형식에 'Car' 형식의 mileage, price, color, drive, brake 속성이 없습니다. 라고 뜸.
  // implements는 상속을 하는 것이 아닌 이 모양을 정의를 해주는 것.
  // 에러를 해결하기 위해서는 Ford1 클래스에도 Car 클래스에 있는 속성들을 넣어주면 됨


 - 변경 후
interface Part {
  seats: number;
  tire: number;
}

class Ford1 implements Car, Part {
    mileage = 1;
    price = 2;
    color = 'white';
    seats = 2;
    tire = 3;

    drive() {
    return 'drive!';
    }

    brake() {
    return 'brake!';
    }
}
const myFordCar1 = new Ford1();
// 위와같이 작성하면 완료. implements에는 interface도 넣어줄수 있는데 넣어줄 경우, 그 안의 속성도
// 같이 넣어줘야함.


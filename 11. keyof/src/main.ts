@ 예제 1
interface IUser {
  name: string;
  age: number;
  address: string;
}

type UserKeys = keyof IUser;
// 여긴 바로 type으로 되어있기 때문에 keyof 바로 사용
// "name" | "age" | "address" 이렇게 반환됨

@ 예제 2
const user = {
  name: 'John',
  age: 20,
  address: 'Seoul',
};
// 이 객체를 이용하여 Union 타입 만드려면? user 객체를 Type으로 바꾼다음에 keyof연산자를 적용!

type UserKeys = keyof typeof user;
// "name" | "age" | "address" 이렇게 반환됨

@ 예제 3

enum UserRole {
  admin,
  manger
}

type UserRoleKeys = keyof typeof UserRole
// typeof 먼저 하고 keyof 해주면 enum도 키를 추출하고 Union 타입으로 반환함
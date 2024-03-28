interface getLikeNumber {
  (like: number): number;
  // 이렇게 만드는것이 바로 호출 시그니쳐 !
  // 소괄호 안에 매개변수 넣어주고 return하는 값을 콜론 뒤에 넣어주면 됨
}

interface Post {
  id: number;
  title: string;
  // getLikeNumber: (like:number) => number;  // 따로 빼기 전
  getLikeNumber: getLikeNumber;
}

const post1: Post = {
  id: 1,
  title: 'title 1',
  getLikeNumber(like: number) {
    return like;
  },
};

post1.getLikeNumber(1);

// 여기서 interface안의 getLikeNumber의 값을 재사용하고 싶다면?
// interface로 getLikeNumber를 따로 빼서 만들어서 대입

// 속성의 모든 이름을 미리 알지 못하는 경우가 있지만 값의 형태는 알고 있을 때 ,
// index signature를 사용하여 가능한 값의 type을 지정할 수 있음

// @ 객체 인덱스 시그니처
// 아래의 경우에서 처럼 계속 속성이 더해져서 post1 객체에 모든 속성의 이름을 알지 못할 때 사용 가능
// 예를들어 객체를 생성한 후 property를 더 많이 넣어줘야 하는 상황이 발생하였지만
// 어떠한 property를 넣을 건지 아직 확신을 하지 못하는 상황이라면 사용 가능

  interface Post {
    [key: string]: unknown;
    // 대괄호를 사용 property값들은 전부 string이고 뒤에 오는 값을 모를 경우 unknown을 사용하면 됨
    id: number;
    title: string;
  }

  const post2 = {
    id: 1,
    title: 'post 1',
  };

  post1['description'] = 'description 1';
  post1['pages'] = 300;

// @ 배열 인덱스 시그니처

  interface Names {
    [item: number]: string;
    // 예를들어 userNames[0] === 'John'이라 하면 userNames[0]이 item, string이 John
  }

  const userNames = ['John', 'kim', 'Joe'];

class Post {
  public id: number = 0; // 초기값 설정 가능
  public title: string = ''; //초기값 설정 가능

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  // 위 두개를 합쳐서 생략하려면 아래와 같이 작성하면 된다. 기본값도 추가 가능하다.
  // constructor(
  //   public  id: number = 0,
  //   public title: string = ''
  // ) {}

  getPost() {
    return `postId: ${this.id}, postTitle: ${this.title}`;
  }
}

const post = new Post(1, 'title 1');

// TypeScript에서는 this로 접근하는 속성들을 위한 type을 class body 안에 넣어줘야한다.
// 안넣어주면 위의 title과 id에 'Post' 형식에 'title' or 'id' 속성이 없습니다 라고 뜰것

// access modifier는 세 개가 존재함(접근 제어자)

// public default 값이며, 어디서나 접근 가능
// protected  클래스 내, 상속받은 자식 클래스에서 접근 가능
// private 클래스 내에서만 접근 가능

console.log(post.id);
console.log(post.title);

// public을 protected로 바꾸면 에러가 뜬다. 클래스내, 상속받은 자식클래스에서 접근 가능하기에
// 클래스 새로 하나 생성

class PostB extends Post {
  getPost() {
    return this.title;
  }
}

//Post 클래스의 하위 클래스이기 때문에 문제없이 사용 가능

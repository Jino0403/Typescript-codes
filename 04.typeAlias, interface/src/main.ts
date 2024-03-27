// interface의 확장은 extends를 이용해서 확장

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear1: Bear = {
  name: 'honey bear',
  honey: true,
};

// Type Alias의 확장은 intersection Operator(&)을 이용해서 확장

type Animal1 = {
  name: string;
};

type Bear1 = Animal & {
  honey: boolean;
};

const bear2: Bear1 = {
  name: 'honey bear',
  honey: true,
};

// interface는 선언 병합(Declaration Merging)이 가능하고 Type Alias는 불가능
// 선언 병합이 되면 두개가 합쳐져서 Animal 타입에 name과 honey가 둘다 들어가 있는거

interface Animal {
  name: string;
}

interface Animal {
  honey: boolean;
}

const bear1: Animal = {
  name: 'honey bear',
  honey: true,
};

type Animal = {
  name: string;
};

type Animal = {
  honey: boolean;
};

const bear1: Animal = {
  name: 'honey bear',
  honey: true,
};
// 식별자 중복 오류 발생
// Type Alias와 interface 모두에 implements를 사용할 수 있습니다.

interface IArticle {
  category: string;
  content: string;
}

class Article implements IArticle {
  public category = '';
  public content = '';
}

type MyArticle = {
  category: string;
  content: string;
};

class Article implements MyArticle {
  public category = '';
  public content = '';
}

// Union 유형 사용 가능
// Union 유형을 사용하면 개발자가 타입 A 또는 타입 B가 될 수 있는 새 Type을 만들 수 있습니다.
// | 연산자를 사용하여 Type과 interface를 모두 사용하여 새로운 Union 유형을 생성합니다.
// 그러나 선언은 항상 Type 이어야합니다.

interface Animal {
  name: string;
}

interface Bear {
  honey: boolean;
}

type NewType = Animal | Bear;

const bear1: NewType = {
  name: 'honey bear',
  honey: true,
};

type Animal = {
  name: string;
};

type Bear = {
  honey: boolean;
};

type NewType = Animal | Bear;

const bear1: NewType = {
  name: 'honey bear',
  honey: true,
};

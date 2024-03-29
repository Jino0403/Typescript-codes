디렉터리에 tsconfig.json 파일이 있으면 해당 디렉터리가 TypeScript 프로젝트의 루트임을 나타냄
tsconfig.json 파일은 프로젝트를 컴파일하는데 필요한 루트 파일과 컴파일러 옵션을 지정

{
  // 컴파일러 옵션 지정
  "compilerOptions": {},
  // 컴파일할 개별 파일 목록(확장자 이름 필수 _ ts)
  "files": [
    "node_modules/library/index.ts"
  ],
  // 컴파일러를 이용해서 변환될 폴더 경로를 지정
  "include": [
    "src/**/*", // src 하위 모든 폴더
    "tests/**/*" //
  ],
  // 컴파일러를 이용해서 변환하지 않을 폴더 경로를 지정
  "exclude": [
    "node_modules",
    "dist"
  ],
  // 상속에서 사용할 다른 TS 구성파일 지정
  // 만약 ts-config.json 파일 말고도 다른데 다가도 이 옵션들을 지정했을때,
  // 그 다음 그거를 가져와서 사용하려고 할 때 extends에 그 파일의 이름을 넣어주면됨
  "extends": "main_config.json"
}

@ compilerOptions의 옵션들

* lib 
- 배열 컴파일 할때 사용되는 라이브러리 삽입(ex. ESNext, DOM)
- lib를 비워두면 아무것도 사용안하고, 없으면 자동으로 사용되는것이있음
- 만약 target es3 를 이용하고 있으면 기본값은 lib.dts를 이용
    target es5를 이용하면 기본값은 dom-library, es6, script-host 이런식으로 타겟에 따라 다른 기본값을 가짐
    {
        "lib": ["ESNext", "DOM"]
    }

* moduleResolution
- Node 아니면 classic
- 타입스크립트 컴파일러가 모듈을 찾는 방법
 1. Relative vs Non-relative module imports 
 먼저 모듈 import가 relative 인지 non-relative 인지 구별함

  - Relative(상대적)
    import Entry from "/components/Entry"
    import { DefaultHeaders } from "../constants/http";

  - Non-Relative(비상대적)
    import * as $ from "jquery"
    import { Component } from "@angular/core";


 2. Classic 또는 Node 전략 중 하나를 사용해서 컴파일러에서 moduleA를 찾을 위치를 알려줍니다.
    - 클래식 전략은 TypeScript 1.6 이전에 기본 값, 현재는 Node만 사용한다고 보면됨(기본값)
{
    *moduleResolution": "Node"
}
 
* baseUrl
- 이 프로퍼티가 지정되어 있다면 비-상대적 import의 모듈 해석 과정에 하나의 과정을 추가합니다.
  ex.ts
  // 원래 여기서 helloWorld 불러오려면 import { helloWorld } from "./hello/world"이게 맞으나
  // baseUrl로 "./" 설정해주면 아래와 같이 할수있다.
   import { helloWorld } from "hello/world";
   console.log(helloWorld)

   "baseUrl": "./"을 사용하면 TypeScript는 tsconfig.json과 동일한 폴더에서 시작하는 파일을 찾습니다.
    
* paths 
만약 src/foo/a/b/index.ts에서 src/bar/indexedDB.ts에 있는 함수를 import 해오려면?

    * 원래파일구조는 아래와 같음 
    src
    - index.ts
    - foo
    |   |- a
    |      |- b
    |         |- indexedDB.ts
    |- bar
        |- index.ts

    import { bar } from "../../../../bar";
    
    export const foo = () => {
        console.log(bar());
    };

    * path 옵션 설정
    {
        "compilerOptions": {
            //...
            "baseUrl": ".",
            "paths": {
                "@src/*": [ // 상대경로를 기준으로 이 경로에 있는 것을 가져올때 @src 하고 해당 경로에 있는것을 가져올 수 있음
                    "src/*"
                ]
            }
        }
    }

    위와 같이 하면 @src 적용하면 아래와 같이 가져 올 수 있음

    import { bar } from "@src/bar";

    export const foo = () => {
        console.log(bar());
    }

* isolatedModules

  - true로 설정하면 프로젝트 내에 모든 각각의 소스코드 파일을 모듈로 만들기를 강제합니다.
    소스코드 파일에서 import 또는 export를 사용하면 그 파일은 모듈이 되지만 만약 import / export를 하지 않으면
    그 파일은 전역 공간으로 정의되고 모듈이 아니기에 에러가 나게 됩니다.
    export { } << 이런식으로만 해줘도 에러가 사라지게 됨

* removeComments
  - 컴파일 시에 타입스크립트 소스의 주석을 모두 제거하는 것을 설정합니다.

* checkJS 
  - allowJs와 함께 작동합니다. check.js가 활성화되면 JavaScript 파일에 오류가 보고됩니다.
    이는 프로젝트에 포함된 모든 JavaScript 파일의 맨 위에 // @ts-check를 포함하는 것과 같습니다.
    이 기능을 true로 설정하면 JavaScript와 TypeScript를 같이 사용할 수 있습니다. => JS로 개발후 TS로 바꿀때도 유용
    즉 이기능을 사용하면 js에서도 타입 체크를 할 수있음   

* forceConsistentCasingInFileNames
  - 파일의 이름을 대소문자 판별하게 하는 옵션입니다.
   test.ts

   import {B} from "./Test";

* declaration
  - 이 옵션을 true로 하면 TS파일을 JS로 컴파일하는 과정에서 JS 파일과 함께 debugger.ts 선언 파일이 생성됨
  - 이 선언 파일에서 타입들만 따로 관리할 수 있습니다.

* strict
  - "strict":true, /* 모든 엄격한 유형 검사 옵션 활성화 */
  // "noimplicitAny":true, /* 명시적이지 않은 'any*유형으로 표현식 및 선언 사용 시 오류 발생/
  // "strictNullChecks": true, /*엄격한 null 검사 사용*/
  // "strictFunctionTypes": true, /*엄격한 함수 유형 검사 사용*/
  // "strictBindCallApply": true, /*엄격한 'bind*, 'call', 'apply' 함수 메서드 사용/
  // "strictPropertyInitialization": true, /* 클래스에서 속성 초기화 엄격 검사 사용 */
  // "noimplicitThis": true, /*명시적이지 않은 'any' 유형으로 'this' 표현식 사용 시 오류 발생*/
  // "alwaysStrict":true, /*엄격모드에서 구문 분석 후 , 각 소스 파일에 "use Strict" 코드를 출력 */
  
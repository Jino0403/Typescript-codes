// 현재 사용자의 구성 값
type AppConfig = {
    username: string;
    email: string;
}

// 사용자에게 구성 값을 변경할 수 있는 권한이 있는지 여부
type AppPermissions = {
    changeUsername: boolean;
    changeEmail:boolean;
}

이 예제는 AppConfig와 AppPermissions 사이에 암시적 관계가 있기 때문에 문제가 있습니다.
새 구성 값이 AppConfig에 추가 될 때마다 AppPermission에 해당 boolean 값도 있어야 합니다.
// 만약 AppConfig에 address:string라는 값이 생기면 AppPermissions에도 changeAddress:boolean 이런 값이 있어야함.
두 Type에 대한 적절한 업데이트를 동시에 수행하기 위해 향후 프로그램 편집자의 규칙에 의존하는 것 보다
Type 시스템이 이 관계르 관리하도록 하는 것이 좋습니다.

이러한 때에 mapped Type를 사용하면 좋습니다.

@ 맵드 타입
컴퓨터 과학 맥락에서 맵(map)이라는 용어는 
- 한 type을 다른 type으로 변환하는 것을 의미하거나
- 유사한 type을 변환된 type의 다른 목록으로 바꾸는 것을 의미합니다.

Array.prototype.map()이 대표적인 예입니다.
[1,2,3].map(value => value.toString()) // ["1", "2", "3"]
// map 메소드를 이용해 하나씩 순회하면서 value.toString 해서 이 반환된 배열 안에는 
// 전부 number가 string으로 바뀐 것을 확인할 수 있음


여기에서 배열의 각 숫자를 가져와서 문자열로 변환했습니다.
이것처럼 TypeScript에서 Mapped Type은 하나의 Type을 가져와 각 속성에 변환을 적용하여 다른 type으로 변환한다는 의미입니다.

@ mapped type 사용해보기

type Users = "John" | "Han" | "Kim";

type UserFirstNames = {[K in Users]: string};

// 위에 결과로 string으로 하나씩 바꿔주니 아래와 같이 됨
// type UserFirstName = {
    //     John: string,
    //     Han: string,
    //     Kim: string
    // }
    
    const userFirstNameInfo : UserFirstNames = {
        John: "Doe",
        Han: "Ho",
        Kim: "jun"
    }
    
    
    type UserFirstNames = {[K in Users]: number};
    
    // 위에 결과로 string으로 하나씩 바꿔주니 아래와 같이 됨
    // type UserFirstName = {
        //     John: number,
        //     Han: number,
        //     Kim: number
        // }
        
        
        const userFirstNameInfo : UserFirstNames = {
            John: 10,
            Han: 20,
            Kim: 30
        }
        
@ 좀 더 실용적인 예시

type DeviceFormatter<T> = {
    [k in keyof T]: T[K] ;
    // 여기서 keyof는 manufacturer | price 이렇게 됨.
    // T[K]에서 T가 Manufacturer K가 Manufacturer이니까 string으로 변환
    // type DeviceFormatter = {
    //    manufacturer: string;
    //    price: number; 
    // } 이것과 같음
}
 //

type Device = {
    manufacturer: string;
    price: number;
}

// 여기서 제네릭의 T는 Device의 속성인 manufcaturer, price 

const iphone: DeviceFormatter<Device> = { manufacturer: "apple", price: 100};

// 만약 객체에서 가격이나 제조사만 가지거나 둘다 가지지 않는 것이 있을 경우에는?
const priceOnly: DeviceFormatter<Device> = { price: 23};
const manufacturer: DeviceFormatter<Device> = { manufacturer : "apple"}
const empty: DeviceFormatter<Device> = {};

type DeviceFormatter<T> = {
    [k in keyof T]?: T[K] ;
    // 뒷부분에 ? 하나 넣어서 프로퍼티들을 선택사항으로 만들어줌
}
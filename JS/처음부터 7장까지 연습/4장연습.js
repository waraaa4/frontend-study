//빈 객체 생성
let person = new Object();

//객체에 프로퍼티 추가
person.firstName = "고";
person.lastName = "길동";
person.age = 30;

//객체에 함수 추가
person.getFullName = function () {
  return this.firstName + " " + this.lastName;
};

const arr = [1, "aa", true, "5", 10];
let sum = 0;
// v: 1, "aa", true, "5", 10 
for (let v of arr) {
  // 배열의 요소를 숫자로 변환할 수 있는지 확인
  if (!isNaN(v)) {
    console.log(v, "변환가능");
    if(typeof v == "number" || typeof v == "boolean"){ //1, true(1), 10
      sum = sum + v; 
    } else if (typeof v == "string") {  //"5"
      sum = sum + parseInt(v); 
    } 
  }

}
console.log(sum); //합계

const a = {
  a1: 1,
  a2: "2"
}
console.log(a.a1);

const foodList = ['Pizza', 'Hamburger', 'Chicken', 'Steak'];
const foodList1 = foodList[0];
const foodList2 = foodList[3];
console.log(foodList1+foodList2);

// Q.객체 person의 나이가 20살 미만이고 성별이 남자이면, 
// "남학생입니다"를 출력하는 조건식을 작성하세요
const person = {
  age: 15,
  genger: "M",
  name: "둘리",
  address: "서울",
};
if(person.age < 20 && person.genger === "M"){
  console.log("남학생입니다.");
}

// Q.배열에 숫자 10이 포함되어 있으면 "배열에 10이 있습니다"를 출력하고,
// 없으면 "10이 배열에 없습니다"를 출력하는 조건식을 작성하세요
const arr = [5, 12, 8, 130, 44];
if(arr.includes(10)){
  console.log("숫자10");
} else {
  console.log("숫자10없음");
}

// 반복문을 사용하여 1부터 10까지 수 중에서 짝수만 출력하세요
for(let i=1; i<11; i++){
  if(i % 2 == 0){
    console.log(i);
  }
}

let sum = 0;
const arr2 = [1,'aa', true, 5, 10];
for(let i=0; i <arr2.length; i++){
  let type = typeof arr2[i];
  if(type == "number"){
    sum = sum + arr2[i];
  }
  
}
console.log(sum);


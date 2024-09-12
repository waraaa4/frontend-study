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

function addNum(arr, value) {
  return arr.includes(value);
}
console.log(addNum(["apple", "banana", "cherry"], "banana"));


function arr3(arr) {
  let newArr = []
  for(let i=0; i<arr.length; i++){
    if(typeof arr[i] == "string"){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(arr3([1, "apple", true, "banana", 42, "cherry"]));


function stud(students, subject) {
  
  let all = 0;
  let length = students.length;

  for(const student of students){
    all = all + student[subject];
  }

  return all / length;
}
const students = [
  { name: "둘리", math: 90, english: 85 },
  { name: "또치", math: 80, english: 95 },
  { name: "도우너", math: 70, english: 75 },
];
let result = stud(students, "math");
console.log(result);


  function calculateAvgSalary(employees, position) {
    let total = 0;
    let count = 0;

    for (const employee of employees) {
      if (employee.position === position) {
        total = total + employee.salary;
        count++;
      }
    }

    return total / count;
  }

  const employees = [
    { name: "짱구", position: "부장", salary: 500 },
    { name: "철수", position: "차장", salary: 380 },
    { name: "훈이", position: "사원", salary: 260 },
    { name: "맹구", position: "차장", salary: 420 },
    { name: "유리", position: "사원", salary: 220 },
  ];

console.log(calculateAvgSalary(employees, "사원"));


const employee11 = {
  name: "철수",
  position: "사원",
  salary: 300
};

for (const key in employee11) {
  console.log("in: " + employee11[key]);
}

const person1 = {
  name: 'John',
  age: 30,
  city: 'New York'
};

for (const key in person1) {
  console.log(key, person1[key]); // 'name John', 'age 30', 'city New York' 출력
}

// 16. 학생 객체 배열을 입력 받아, 특정 과목의 평균 점수를 반환하는 함수를 만드세요
// 입력: students, ‘math’
// 반환: 80
function stud(students11, math) {
  let sum11 = 0;
  let length11 = students11.length;
  console.log(length11);

  for(const value of students11){
    sum11 = sum11 + value.math;
  }
  return sum11 / length11;
}

const students11 = [
  { name: "둘리", math: 90, english: 85 },
  { name: "또치", math: 80, english: 95 },
  { name: "도우너", math: 70, english: 75 },
];

let result11 = stud(students11, "math");
console.log(result11);


// Q17. 직원 객체 배열을 입력 받아, 특정 직급의 평균 월급을 반환하는 함수를 만드세요
// 입력: employees, ‘사원’
// 반환: 240
function asd(params) {
  
}

const employees22 = [
  { name: "짱구", position: "부장", salary: 500 },
  { name: "철수", position: "차장", salary: 380 },
  { name: "훈이", position: "사원", salary: 260 },
  { name: "맹구", position: "차장", salary: 420 },
  { name: "유리", position: "사원", salary: 220 },
];

let result22 = asd(employees22, "사원");
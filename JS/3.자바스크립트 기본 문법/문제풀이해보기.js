let productList = [
    { name: "솔의눈", price: 700 },
    { name: "커피", price: 700 },
    { name: "파워레이드", price: 1200 },
    { name: "오렌지", price: 1000 },
    { name: "보리차", price: 1200 },
    { name: "밀키스", price: 800 },
  ];
  
  // 800원으로 구매할 수 있는 음료수 찾기
  let inputCoin = 800;
  let outputList = [];
  
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].price <= inputCoin) {
      outputList.push(productList[i]); //outputList에 추가
    }
  }
  for (let i = 0; i < outputList.length; i++) {
    console.log(outputList[i]);
  }
  let arr = [3, 4, 5];
for (let i in arr) {
  // 배열을 순회하면서 인덱스를 꺼냄
  console.log(i + ", " + arr[i]);
}

/* for-of문 */
for (let v of arr) {
  // 배열을 순회하면서 값을 꺼냄
  console.log(v);
}
  
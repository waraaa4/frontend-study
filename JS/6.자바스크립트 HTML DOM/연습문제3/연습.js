// “회원가입” 버튼을 누르면 입력된 정보의 유효성을 먼저 확인하세요.
// 조건을 만족하지 않으면 경고 메시지를 표시합니다.
// 1. 아이디는 4~8자의 소문자 또는 숫자로만 입력되어야 합니다.
// 2. 비밀번호와 비밀번호 확인이 일치해야 합니다.
// 3. 주민등록번호는 앞자리 6자리 숫자와 뒷자리 7자리 숫자로 입력해야 합니다.
// 4. 관심분야는 최소 하나 이상 선택해야 합니다.
function validate(f) {
  // 아이디 정규식        
  var regId = /^[0-9a-z]{4,8}$/;
  // 비밀번호
  var regPw = /^\d{2,}$/;
  // 주민등록번호 정규식(앞자리)
  var regPid1 = /^\d{6}$/;
  // 주민등록번호 정규식(뒷자리)
  var regPid2 = /^\d{7}$/;

  if (!regId.exec(f.id.value)) {
    alert("아이디는 4~8자리의 소문자 또는 숫자로만 입력되어야 합니다");
    f.id.focus();
    return;
  }

  if (!regPw.exec(f.pw.value)) {
    alert("비밀번호를 4자리 이상 입력해주세요");
    f.pw.focus();
    return;
  }

  if (f.pw.value != f.checkpw.value) {
    alert("비밀번호가 맞지 않습니다..");
    f.checkpw.focus();
    return;
  }

  if (f.name.value == "") {
    alert("이름을 입력하세요..");
    f.name.focus();
    return;
  }

  if (!regPid1.exec(f.sn1.value)) {
    alert("주민등록번호 앞자리는 숫자 6자리");
    return;
  } else if (!regPid2.exec(f.sn2.value)) {
    alert("주민등록번호 뒷자리는 숫자 7자리");
    return;
  }

  if (!Array.from(f.interest).some(input => input.checked)) {
    alert("관심분야를 선택하세요..");
    return;
  }

  addDataToTable();

}

// 주민번호를 입력한 후 “확인” 버튼을 클릭하면, 
// 뒷자리의 첫번째 숫자를 통해 성별을 판별하고,
// 해당 성별의 라디오 버튼이 자동으로 선택되도록 하세요
function checkGender() {
  // 변수 선언
  const s2 = document.getElementById('sn2').value;
  const male = document.getElementById('male');
  const female = document.getElementById('female');

  if (s2.length > 0) {
    const gendr = s2.charAt(0);
    if (gendr == 1 || gendr == 3) {
      male.checked = true;
    } else if (gendr == 2 || gendr == 4) {
      female.checked = true;
    } else {
      mele.checked = false;
      female.checked = false;
    }
  }
}

// 유효성 체크에 통과하면, 입력된 정보를 테이블에 새로운 회원으로 추가하세요
function addDataToTable() {
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const interests = document.querySelectorAll('input[name="interest"]:checked');
  const tableBody = document.getElementById('info-table').querySelector('tbody');
  const arr = [];

  interests.forEach((interest) => {
    arr.push(interest.value);
  });
  const interestList = arr.join(', ');

  let newRow = `
    <tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${gender ? gender.value : ''}</td>
      <td>${interestList}</td>
    </tr>
  `;
  tableBody.insertAdjacentHTML("beforeend", newRow);
  document.querySelector('form').reset();
}

function searchMember() {
  // 검색어와 검색 타입을 가져옴
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const searchType = document.getElementById('searchType').value;

  // 테이블의 모든 행을 가져옴
  const rows = document.querySelectorAll('tbody > tr');

  // 각 행을 순회하며 검색어에 맞는 행을 표시하고, 맞지 않으면 숨김
  for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let targetValue = '';

      // 검색 타입에 따라 검색할 값 선택
      if (searchType === 'id') {
          targetValue = cells[0].textContent.toLowerCase(); // 아이디 검색
      } else if (searchType === 'name') {
          targetValue = cells[1].textContent.toLowerCase(); // 이름 검색
      } else if (searchType === 'interest') {
          targetValue = cells[3].textContent.toLowerCase(); // 관심분야 검색
      }

      // 검색어와 일치하는지 여부 확인 후, 행을 표시하거나 숨김
      if (targetValue.includes(searchValue)) {
          rows[i].style.display = ''; // 검색어에 맞으면 표시
      } else {
          rows[i].style.display = 'none'; // 검색어에 맞지 않으면 숨김
      }
  }
}

function resetBtn() {
  const rows = document.querySelectorAll('tbody > tr');
  rows.forEach(function(row) {
    row.style.display = 'table-row';
  });
}
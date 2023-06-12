document.signupfrm.onsubmit = function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const userId = document.getElementById("username").value;
    const userPw = document.getElementById("userpw").value;
    const userPw2 = document.getElementById("userpw2").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // 아이디
    const regExp1 = /^[a-z][a-z\d]{3,11}$/;
    const regExp2 = /[0-9]/;
    if(!regExpTest(regExp1,userId,"아이디는 영소문자로 시작하는 4~12글자입니다."))
        return false;
    if(!regExpTest(regExp2,userId,"아이디는 숫자를 하나 이상 포함해야합니다."))
        return false;

    // 비밀번호
    const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&]/];
    for (let i = 0; i < regExpArr.length; i++) {
        if (!regExpTest(regExpArr[i],userPw,"비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다.")) {
            return false;
        }
    }

    // 비밀번호 일치여부 검사
    if(!isEqualPwd()) {
        return false;
    }

    // 전화번호 검사
    if(!regExpTest(/^010-\d{4}-\d{4}$/, phone, "전화번호는 010-XXXX-XXX 형식에 맞게 입력해주세요. (-포함)"))
        return false;

    // 이메일 검사
    if (!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다.")) {
        return false;
    }

    // 회원가입 정보 객체 생성
    const userInfo = {
        id: userId,
        password: userPw,
        phone: phone,
        email: email
    };

    // 회원가입 정보 배열에 보관
    const usersArray = getUsersArray();
    usersArray.push(userInfo);
    saveUsersArray(usersArray);

    alert("회원가입 성공!😊");
    return true;
};

function isEqualPwd() {
    const userPw = document.getElementById("userpw").value;
    const userPw2 = document.getElementById("userpw2").value;

    if (userPw === userPw2) {
        return true;
    } else {
        alert("비밀번호가 일치하지 않습니다.");
        document.getElementById("userpw").select();
        return false;
    }
}

function regExpTest(regExp, el, msg) {
    if (regExp.test(el)) {
        return true;
    }
    // 적합한 문자열이 아닌 경우
    alert(msg);
    el.value = "";
    el.focus();
    return false;
}

function getUsersArray() {
    const usersArrayString = localStorage.getItem("usersArray");
    if (usersArrayString) {
        return JSON.parse(usersArrayString);
    } else {
        return [];
    }
}

function saveUsersArray(usersArray) {
    localStorage.setItem("usersArray", JSON.stringify(usersArray));
}

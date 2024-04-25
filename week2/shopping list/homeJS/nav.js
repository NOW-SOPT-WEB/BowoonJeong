import { showShopItems } from "./mainItem.js";

//nav에서 클릭한 section 이미지들 불러오기!
const navBtnClickHandler = (e) => {
    //있던거 모든거 삭제하기...
    let delDiv = document.getElementsByClassName( 'itemContainer' );
    delDiv[0].innerHTML = '';
    //새로운 아이템들 불러오기
    showShopItems(e.target.innerText);
}
//각각 이벤트 추가
const navBtn = document.querySelectorAll('.navBtn');
navBtn.forEach((each) => { each.addEventListener( 'click', navBtnClickHandler ) })

import { shopList, ITEMS_KEY } from "../interface/shopList.js";
import { setPrice } from "../interface/setPrice.js";
var cartList = [];

//localStorage에서 가져오기
export let storedCartList = JSON.parse(localStorage.getItem( ITEMS_KEY ));
storedCartList.forEach((item) => {
    shopList.forEach((norm)=> {
        if( item === norm.title ){
            //title이 같은 item을 배열에 추가
            cartList.push(norm);
        }
    })
})

//list로 테이블 완성하기
const table = document.getElementsByClassName( "table" );


/* Uncaught TypeError: Cannot read properties of null (reading 'insertRow')
이런 에러는 넣는애가 아니라 객체가 문제가 있는거임!! 여기서도 table이 아이디 없었음ㅋㅋ*/
cartList.forEach(( item ) => {
    const new_row = table[0].insertRow();
    new_row.setAttribute( "id", `${item.title}`);

    
    const checkCell = new_row.insertCell(0);
    const input = document.createElement( "input" );
    input.type = "checkbox";
    input.className = "itemCheckbox";
    checkCell.appendChild(input);

    const imageCell = new_row.insertCell(1);
    const image = document.createElement( "img" );
    image.src = `${item.src}`;
    image.className = "cartImg";
    imageCell.appendChild(image);

    const titleCell = new_row.insertCell(2);
    const title = document.createTextNode( `${item.title}` );
    titleCell.appendChild(title);

    const priceCell = new_row.insertCell(3);
    const price = document.createTextNode( `${setPrice(item.price)}원` );
    priceCell.appendChild(price);

    const sortCell = new_row.insertCell(4);
    const sort = document.createTextNode( `${item.sort}`);
    sortCell.appendChild(sort);

    const delCell = new_row.insertCell(5);
    const del = document.createElement( "p" );
    del.innerHTML = "삭제";
    del.className = "deleteBtn";
    delCell.appendChild(del);

})

//삭제 버튼 구현
const delBtn = document.querySelectorAll( ".deleteBtn" );
delBtn.forEach((each) => {
    each.addEventListener( "click", (event) => {
        //이거 아이디로 로컬스트리지에있는거 삭제하기
        const delId = event.target.parentNode.parentNode.id;
        storedCartList = storedCartList.filter((each) => each !== delId );
        localStorage.setItem( ITEMS_KEY, JSON.stringify(storedCartList));
        window.location.reload();
    })
})





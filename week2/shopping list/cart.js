//shop items
const shopList = [
    { src: "img/items/a1.jpg", sort:'악세서리', title: "강아지 폰케이스", price: 5900},
    { src: "img/items/a2.jpg", sort:'악세서리', title: "쪼꼬미 미니 리본핀", price: 6900},
    { src: "img/items/a3.jpg", sort:'악세서리', title: "행운의 네잎 클로버 지비츠", price: 12900},
    { src: "img/items/s1.jpg", sort:'하의', title: "레거시 플리츠 스커트", price: 26040},
    { src: "img/items/s2.jpg", sort:'하의', title: "리본 다트 밴딩 미니스커트", price: 13850},
    { src: "img/items/s3.jpg", sort:'하의', title: "스위티 프릴 스커트", price: 16740},
    { src: "img/items/t1.jpg", sort:'상의', title: "프릴 슈 블라우스", price: 22620},
    { src: "img/items/t2.jpg", sort:'상의', title: "인디 잔꽃 원피스 세트", price: 37900},
    { src: "img/items/t3.jpg", sort:'상의', title: "레이어드 뷔스티에 미니원피스", price: 16020},
    { src: "img/items/t4.jpg", sort:'상의', title: "프린지 후크 트위드자켓", price: 38610},
    { src: "img/items/t5.jpg", sort:'상의', title: "리본 오프숄더", price: 37640},
];
const ITEMS_KEY = "storedItems";
var cartList = [];
var checkedList = [];

//localStorage에서 가져오기
let storedCartList = JSON.parse(localStorage.getItem( ITEMS_KEY ));
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

    //price , 조정
    let finPrice = '';
    const strPrice = item.price.toString();
    [...Array(strPrice.length).keys()].forEach((index) => {
        const oppIndex = strPrice.length - index - 1;
        //자리수 3개일때마다 , 넣기 but 인덱스로 자리 번호 확인! 주의
        if( index % 3 === 0 && index !== 0 ){
            finPrice = strPrice[oppIndex] + ',' + finPrice;
        }else{
            finPrice = strPrice[oppIndex] + finPrice;
        }
    })

    const priceCell = new_row.insertCell(3);
    const price = document.createTextNode( `${finPrice}원` );
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

//to buy button
const toBuyBtn = document.querySelector( ".toBuyBtn" );
toBuyBtn.addEventListener( "click", () => { 

    //구매창 modal 구현
    const modal = document.getElementsByClassName("cartItems");
    let totalPrice = 0;
    checkedList.forEach((each) => {
        totalPrice += each.price;

        const itemSpan = document.createElement( "span" );
        const itemImg = document.createElement( "img" );
        const itemTitle = document.createElement( "p" );
        const itemPrice = document.createElement( "p" );
        itemSpan.setAttribute( "class", "itemSpan" );

        itemImg.src = `${each.src}`;
        itemImg.className = "tobuyImg";
        itemTitle.innerHTML = `${each.title}`;

        //price , 조정
        let finPrice = '';
        const strPrice = each.price.toString();
        [...Array(strPrice.length).keys()].forEach((index) => {
            const oppIndex = strPrice.length - index - 1;
            //자리수 3개일때마다 , 넣기 but 인덱스로 자리 번호 확인! 주의
            if( index % 3 === 0 && index !== 0 ){
                finPrice = strPrice[oppIndex] + ',' + finPrice;
            }else{
                finPrice = strPrice[oppIndex] + finPrice;
            }
        })
        itemPrice.innerHTML = `${finPrice}원`;

        itemSpan.append(itemImg, itemTitle, itemPrice);
        modal[0].appendChild(itemSpan);
    })

    //전체 가격 - price , 조정
    let finPrice = '';
    const strPrice = totalPrice.toString();
    [...Array(strPrice.length).keys()].forEach((index) => {
        const oppIndex = strPrice.length - index - 1;
        //자리수 3개일때마다 , 넣기 but 인덱스로 자리 번호 확인! 주의
        if( index % 3 === 0 && index !== 0 ){
            finPrice = strPrice[oppIndex] + ',' + finPrice;
        }else{
            finPrice = strPrice[oppIndex] + finPrice;
        }
    })

    const priceArea = document.getElementsByClassName( "price" );
    priceArea[0].innerHTML = `총 가격: ${finPrice}원`;

    //모달창 보이게 하기!
    const cartListModal = document.getElementsByClassName( "cartListModal");
    cartListModal[0].style.visibility = "visible";
})

/////////////////////체크박스///////////////////
//check box
const itemCheckboxes = document.querySelectorAll( ".itemCheckbox" );

itemCheckboxes.forEach(( eachCheck ) => { 
    eachCheck.addEventListener( "click", (event) => {
        const checkBox = event.target;
        const checkTitle = checkBox.parentNode.parentNode.id;

        if(checkBox.checked){
            shopList.forEach((each) => {
                if( each.title === checkTitle ){
                    checkedList.push(each);
                }
            })
        }else{  //체크 취소한거라면
            //체크드리스트 배열에서 팝
            checkedList 
                = checkedList.filter((each) => each.title !== checkTitle);
        }
    } ) 
})

const titleCheckbox = document.getElementsByClassName( "listCheckbox" );
titleCheckbox[0].addEventListener( "click", (event) => {
    if( event.target.checked ){
        //모든 체크박스한테 체크하기
        itemCheckboxes.forEach((each) => {
            each.checked = true;
            checkedList = cartList;
        });
    }else{
        itemCheckboxes.forEach((each) => {
            each.checked = false;
            checkedList = [];
        });
    }


})

//////////////////////최종 구매하기 버튼 눌렀을때//////////////////////
const buyBtn = document.querySelector( ".buyBtn" );
buyBtn.addEventListener( "click", () => {


    //checkedList에 있는거 타이틀 비교해서삭제하기
    storedCartList = storedCartList.filter(( each ) => {
        let checkedFlag = true;
        checkedList.forEach(( checkItem ) => {
            if( each === checkItem.title ){
                //each(= Item ) must be deleted!!!
                checkedFlag = false; 
            }
        })
        return checkedFlag;
    })
    localStorage.setItem( ITEMS_KEY, JSON.stringify(storedCartList) );
    //localStorage.removeItem(ITEMS_KEY);
    const modal = document.getElementsByClassName( "cartListModal");
    modal[0].style.visibility = "hidden";
    
    alert("구매완료! 감사감사~~");
    window.location.reload();
    
})

//구매 모달창 닫기 버튼
const quitBtn = document.querySelector( ".material-symbols-outlined" );
quitBtn.addEventListener( "click", () => {
    const modal = document.getElementsByClassName( "cartListModal");
    modal[0].style.visibility = "hidden";

    //이미 있던 사진들삭제!!!
    const itemSection = document.getElementsByClassName( "cartItems" );
    while(itemSection[0].firstChild){
        itemSection[0].removeChild(itemSection[0].firstChild)
    }
})





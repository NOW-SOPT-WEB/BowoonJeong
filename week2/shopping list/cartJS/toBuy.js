import { checkedList } from "./checkItem.js";
import { storedCartList } from "./cartTable.js";

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

       
        itemPrice.innerHTML = `${setPrice(each.price)}원`;

        itemSpan.append(itemImg, itemTitle, itemPrice);
        modal[0].appendChild(itemSpan);
    })

    const priceArea = document.getElementsByClassName( "price" );
    priceArea[0].innerHTML = `총 가격: ${setPrice(totalPrice)}원`;

    //모달창 보이게 하기!
    const cartListModal = document.getElementsByClassName( "cartListModal");
    cartListModal[0].style.visibility = "visible";
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


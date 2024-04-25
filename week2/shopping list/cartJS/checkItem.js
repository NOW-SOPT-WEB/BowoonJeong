import { shopList } from "../interface/shopList.js";
//check box

export var checkedList = [];

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
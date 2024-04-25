import { setPrice } from "../interface/setPrice.js";
import { shopList, ITEMS_KEY } from "../interface/shopList.js";

//MAIN - 기본은 "전체" 나오게
showShopItems("전체");

//CART Items store into local Storage 
const storeItemsHandler = ( newItem ) => {
    
    if( localStorage.getItem( ITEMS_KEY ) ){    //있다면
        const oldItems = JSON.parse(localStorage.getItem( ITEMS_KEY ));
        
        if( oldItems.includes( newItem ) === false ){
            //기존 아이템 목록에 newItem이 존재하지 않는다면
            oldItems.push( newItem );
        }
        localStorage.setItem( ITEMS_KEY, JSON.stringify(oldItems) );
    }else{
        //없다면 배열 초기 생성해야함
        var itemArray = [ `${newItem}` ];
        localStorage.setItem( ITEMS_KEY, JSON.stringify(itemArray) );
    }
}


export function showShopItems ( givenSort ) {
    const itemContainer = document.getElementsByClassName("itemContainer");
    const mainTitle = document.getElementsByClassName( "itmeTitle" );
    mainTitle[0].innerHTML = givenSort;

    let selShopList = [];
    if( givenSort == '전체' ){
        selShopList = shopList; 
    }else{  //전체가 아니면 필터링
        selShopList = shopList.filter( each => each.sort == givenSort );
    }
    //각각 이미지가 들어갈 span 만들고 붙이기
    selShopList.forEach((each) => {
        const span = document.createElement( 'span' );
        span.setAttribute("id", `${each.title}Span`);
        itemContainer[0].appendChild(span);
    })

    selShopList.forEach((each)=> {
        //위에서 만든 span가져오기
        const span = document.getElementById(`${each.title}Span`);

        //각 아이템 내용 생성
        const img = document.createElement( "img" );
        const heart = document.createElement( "p" );
        const title = document.createElement( "p" );
        const price = document.createElement( "p" );

        //내용 넣기
        img.src = `${each.src}`;
        img.alt = `${each.sort}`;
        heart.innerHTML = "🤍";
        heart.setAttribute( "class", "heart" );
        title.innerHTML = each.title;

        
        price.innerHTML = setPrice(each.price);

        //붙이기
        span.append(img,heart,title,price );

        //item클릭시 이벤트 처리 - span 에다가
        span.addEventListener( "click", (e) => { 
            //아이디를 Span자르고 타이틀로 로컬스트리지에 저장 (배열로 저장..)
            let clickItem = e.currentTarget.id;
            clickItem = clickItem.slice(0, -4); //title 만 추출 성공!
            storeItemsHandler( clickItem );
            
            if(window.confirm(" 장바구니에 담았습니다! 장바구니로 이동할까요? ")){
                window.location = '/cart.html';
            }
        } );
        //헤헤 currentTarget이랑 target의 차이를 유심히 봐뒀찌!! 
        //currentTaget은 이벤트리스너가 부착돈 요소!! 타겟은 그냥 클릭된거!!
    })
    //forEach vs map ?? => map은 새로운 배열 반환
}

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

//modal
const modal = document.getElementsByClassName( "modal" );
const modalOpenBtn = document.getElementById( "modalOpen" );
modalOpenBtn.addEventListener( "click", 
    () => { modal[0].style.visibility = "visible" }
);

const closeArrow = document.getElementsByClassName( "material-symbols-outlined" );
closeArrow[0].addEventListener( "click", 
    () => { modal[0].style.visibility = "hidden" } 
);

//배너 이미지 채우기
var container = document.getElementsByClassName("banner");

shopList.forEach((eachImg) => {
    const img = document.createElement( "img" );
    img.src = `${eachImg.src}`;
    img.alt = `${eachImg.sort}`;
    container[0].appendChild(img);
    //container[1].appendChild(img);
    //span.appendChild(img);
})

shopList.forEach((eachImg) => {
    const img = document.createElement( "img" );
    img.src = `${eachImg.src}`;
    img.alt = `${eachImg.sort}`; 
    //container[0].appendChild(img);
    container[1].appendChild(img);
})
//오잉 왜 appendChild를 같이 하면 안되네... 뭐가 다른거지..

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


//MAIN - 기본은 "전체" 나오게
showShopItems("전체");

function showShopItems ( givenSort ) {
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

        //price 조정 = string으로 바꾸고 세자리마다 , 추가
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
        price.innerHTML = finPrice;

        //붙이기
        span.appendChild(img);
        span.appendChild(heart);
        span.appendChild(title);
        span.appendChild(price);

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

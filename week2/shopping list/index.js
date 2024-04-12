const shopList = [
    {src: "img/a1.jpg", sort:'악세서리', title: "강아지 폰케이스", price: 5900},
    {src: "img/a2.jpg", sort:'악세서리', title: "쪼꼬미 미니 리본핀", price: 6900},
    {src: "img/a3.jpg", sort:'악세서리', title: "행운의 네잎 클로버 지비츠", price: 12900},
    {src: "img/s1.jpg", sort:'하의', title: "레거시 플리츠 스커트", price: 26040},
    {src: "img/s2.jpg", sort:'하의', title: "리본 다트 밴딩 미니스커트", price: 13850},
    {src: "img/s3.jpg", sort:'하의', title: "스위티 프릴 스커트", price: 16740},
    {src: "img/t1.jpg", sort:'상의', title: "프릴 슈 블라우스", price: 22620},
    {src: "img/t2.jpg", sort:'상의', title: "인디 잔꽃 원피스 세트", price: 37900},
    {src: "img/t3.jpg", sort:'상의', title: "레이어드 뷔스티에 미니원피스", price: 16020},
    {src: "img/t4.jpg", sort:'상의', title: "프린지 후크 트위드자켓", price: 38610},
    {src: "img/t5.jpg", sort:'상의', title: "리본 오프숄더", price: 37640},
];

//header HomeIcon Event
const homeClickHandler = () => {
    
}

const home = document.getElementsByClassName( "HomeIcon" );
home[0].addEventListener( "click", homeClickHandler );


//배너 이미지 shopList array 바꾸기!
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

import { shopList } from "../interface/shopList.js";
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

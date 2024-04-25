//modal
const modal = document.getElementsByClassName( "modal" );
const modalOpenBtn = document.getElementsByClassName( "menubar" );

let modalAni = [
    {opacity: 0}, {opacity: 0.2}, {opacity: 1, transform: "translate(100px,0"}
]

modalOpenBtn[0].addEventListener( "click", 
    () => { 
        modal[0].style.right = '0';
        modal[0].style.visibility = "visible";
        modal[0].style.transform = "translateX(0)";
 }
);

const closeArrow = document.getElementsByClassName( "material-symbols-outlined" );
closeArrow[0].addEventListener( "click", 
    () => { 
    modal[0].style.transform = "translateX(100%)";
 } 
);

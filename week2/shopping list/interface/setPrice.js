export function setPrice( itemPrice ){
    //price , 조정
    let finPrice = '';
    const strPrice = itemPrice.toString();

    //console.log([...Array(strPrice.length).keys()]);
    //strPrice 길이와 같은 배열 -> 길이 만큼 반복하기 위함
    //아아 forEach는 각각의 요소들을 가져온다!! index가 아니라!!
    (strPrice.split('')).forEach((item,index) => {

        const oppIndex = strPrice.length - index - 1;

        //자리수 3개일때마다 , 넣기 but 인덱스로 자리 번호 확인! 주의
        if( index % 3 === 0 && index !== 0 ){
            finPrice = strPrice[oppIndex] + ',' + finPrice;
        }else{
            finPrice = strPrice[oppIndex] + finPrice;
        }
    })
    return finPrice;
}
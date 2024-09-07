const input=document.getElementById("input");

function reverseString(str){
    return str.split("").reverse().join("");

}



function check(){
    const value=input.value;
    const reverse= reverseString(value);
    if (reverse === value){
        alert("It's a palindrome!")
    }else{
        alert("Not a palindrome!!!");
    }
}

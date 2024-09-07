const body=document.getElementsByTagName("body")[0]
body.style.backgroundColor="beige";
function setColor(name){
    body.style.backgroundColor=name;
}


function randomColor(){
    const red=(Math.random()*255);
    const green=(Math.random()*255);
    const blue=(Math.random()*255);
    const color=`rgb(${red},${green},${blue})`;
    body.style.backgroundColor=color;
}

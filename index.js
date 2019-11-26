
var result = [];
var lucky_guy = null;
window.onload = function(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            result = JSON.parse(xmlhttp.responseText)
            console.log(result)
        }

    };
    xmlhttp.open("GET","https://choujiang111.herokuapp.com/",true);
    xmlhttp.send();
};


t=null;
function StartClick() {
    t = setInterval(function () {
        lucky_guy = result[Math.floor(Math.random()*result.length)];
        document.getElementById("result").innerHTML =
            "<div>"+lucky_guy.Name+"</div>"
        +   "<div class='phone'>"+ GetLastFourDigits(lucky_guy.Phone.toString())+"</div>"
    },30)
}


function StopClick(){
    if (t !== null){
        clearInterval(t);
        t = null;
        localStorage.setItem("lucky_guy",JSON.stringify(lucky_guy))
    }
}



function GetLastFourDigits(str){
    if (str.length >=4){
        let x_num = str.length - 4
        let lastFourDigits = str.substring(x_num)
        return "x".repeat(x_num) + lastFourDigits
    }
}

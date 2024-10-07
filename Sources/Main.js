function showabout(){
    $("#about_container").css("display","inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideInLeft");
    },800);
}
function closeabout(){
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display","none");
    },800);
}
function showwork(){
    $("#work_container").css("display","inherit");
    $("#work_container").addClass("animated slideInRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideInRight");
    },800);
}
function closework(){
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display","none");
    },800);
}
function showcontact(){
    $("#contact_container").css("display","inherit");
    $("#contact_container").addClass("animated slideInUp");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideInUp");
    },800);
}
function closecontact(){
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function(){
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display","none");
    },800);
}
setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
      $("#box").css("display","none");
      $("#about").removeClass("animated fadeIn");
      $("#contact").removeClass("animated fadeIn");
      $("#work").removeClass("animated fadeIn");
    },1000);
},1500);

const signup = document.getElementById("signupbutt");
const signin = document.getElementById("singinbutt");
const pipbetweeninup = document.getElementById("pip");

signup.addEventListener("mouseover" , ()=>{
    signin.style.opacity = 0;
    pipbetweeninup.style.opacity = 0;
    signin.style.fontSize = 0;
    pipbetweeninup.style.fontSize = 0;
});

signup.addEventListener("mouseout" , ()=>{
    signin.style.opacity = 100;
    pipbetweeninup.style.opacity = 100;
    signin.style.fontSize = '1em';
    pipbetweeninup.style.fontSize = '1em';  

});

signin.addEventListener("mouseover" , ()=>{
    signup.style.opacity = 0;
    pipbetweeninup.style.opacity = 0;
    signup.style.fontSize = 0;
    pipbetweeninup.style.fontSize = 0;
});

signin.addEventListener("mouseout" , ()=>{
    signup.style.opacity = 100;
    pipbetweeninup.style.opacity = 100;
    signup.style.fontSize = '1em';
    pipbetweeninup.style.fontSize = '1em';  

});

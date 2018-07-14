window.addEventListener("load",init);

isLoginshow=false;
isRegistershow=false;

function init(){
    // doAjax();
    showhide();
    bindEvents();
    clearLocal();
}

const clearLocal=()=>localStorage.clear();

function bindEvents(){
    document.querySelector("#login").addEventListener("click",login_Showhide);
    document.querySelector("#register").addEventListener("click",register_Showhide);
    document.querySelector("#register_btn").addEventListener("click",addUser);
    document.querySelector("#login_btn").addEventListener("click",doLogin);
}

// function doAjax(){
//     fetch(urls.userurl).then(response=>response.json()
//     .then(json=>{userOperations.convert(json);}).catch(err=>console.log("Invalid json",json)))
//     .catch(err=>console.log("server error is",err));
// }

function addUser(){
    var type;
    var userid_reg = document.querySelector("#userid_reg").value;
    var password_reg = document.querySelector("#password_reg").value;
    var phone_no = document.querySelector("#phone_no").value;
    if(document.querySelector("#teacher").checked){
        type = "teacher";
        var userObject = new UserRegister(userid_reg,password_reg,phone_no,type);
        dbOperations.addUsers(userObject);
        location.href = "question.html" ;
    }
    else{
        type = "student";
        var userObject = new UserRegister(userid_reg,password_reg,phone_no,type);
        dbOperations.addUsers(userObject);
        location.href  = "welcome.html";
    }
    // console.log("type is",type);
    // var userObject = new UserRegister(userid_reg,password_reg,phone_no,type);
    // dbOperations.addUsers(userObject);
    
}

function typecheck(data){
    if(data.type == "teacher"){
        localStorage.userid = data.userid;
        console.log("redirecting to question.html")
        location.href  ="question.html";
    }
    else{
        localStorage.userid = data.userid;
        console.log("redirecting to question.html")
        location.href = "welcome.html";
    }
}

function doLogin(){
    var userid = document.querySelector("#userid_txt").value;
    var password = document.querySelector("#password_txt").value;
   var pr =  dbOperations.getAlluser(userid);
   
    pr.then((data)=>{
        // alert("user id is "+data.userid);
        if(data == null){
            document.querySelector("#message").innerHTML = "Invalid Userid";
        }
        else if(data.userid == userid && data.password == password){
                typecheck(data);
        }
        else{
            document.querySelector("#message").innerHTML = "Invalid Password";
        }
    });
    pr.catch(err=>{
        alert("error found....", err);
    });
    // if(userOperations.search(userid, password)==true){
    //     localStorage.userid = userid;
    //     location.href  ="welcome.html";
    // }
    // else{
    //     document.querySelector("#message").innerHTML = "Invalid Userid or Password";
    // }
    
}

function login_Showhide(){
    isLoginshow=isLoginshow?'false':'true';
    isRegistershow=false;
    showhide();
}
function register_Showhide(){
    isRegistershow=isRegistershow?'false':'true';
    isLoginshow=false;
    showhide();
}

function showhide(){
    document.querySelector("#login_div").className=isLoginshow?'show':'hide';
    document.querySelector("#register_div").className=isRegistershow?'show':'hide';
}

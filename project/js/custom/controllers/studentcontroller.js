window.addEventListener("load",init);

var index = 0;
var studentQuestions = []

function init(){
    printQuestion();
    document.querySelector('#next').addEventListener('click',nextBtnEvent);
    document.querySelector('#prev').addEventListener('click',prevBtnEvent);
}

function printQuestion(){
    var pr = dbOperations.getTestQuestion();
    pr.then((data)=>{
        console.log("data is",data);
        // document.querySelector("#question").innerHTML = data.qname;
        var tempindex = 1;
        for(key in data){
            covert2Question(data[key]);
            document.querySelector('#status').appendChild(createDiv(tempindex));
            tempindex++;
        }
        console.log('Stduent QUestions is',studentQuestions);
        print(index);
    });
    pr.catch(err=> console.log("error is", err));

}

function print(){
    console.log('Index is',index);

    if(index == 0){
        // index=studentQuestions.length-1;
        document.querySelector('#prev').disabled = true;
    }
    else if(index == studentQuestions.length-1){
        document.querySelector('#next').disabled = true;
    }
    else{
        document.querySelector('#next').disabled = false;
        document.querySelector('#prev').disabled = false;
    }

    console.log('Inside Print..');
    document.querySelector("#question").innerHTML = studentQuestions[index].name;
    document.querySelector("#option0").innerHTML = studentQuestions[index].ans[0];
    document.querySelector("#option1").innerHTML = studentQuestions[index].ans[1];
    document.querySelector("#option2").innerHTML = studentQuestions[index].ans[2];
    document.querySelector("#option3").innerHTML = studentQuestions[index].ans[3];
}

function nextBtnEvent(){
    // console.log('Index is',index);
    index++;
    print();
}

function prevBtnEvent(){
    index--;
    print();
}

function createDiv(value){
    var div = document.createElement('div');
    div.className = 'numChange';
    div.innerHTML = value;
    div.addEventListener('click',()=>{
        index = value-1;
        print();
    });
    return div;
}

function covert2Question(ques){
    var questionObj = new Studentquestion(ques.id,ques.qname,ques.ans,ques.correct_ans,5);
    studentQuestions.push(questionObj);
}
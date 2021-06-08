const taskinput = document.querySelector("#task");
console.log(task);
const button = document.querySelector(".btn");
console.log(button);
const filter = document.querySelector("#filter");
console.log(filter);
const cleartask = document.querySelector(".clear-tasks");
console.log(cleartask);
const form = document.querySelector("#task-form");
console.log(form);
const tasklist = document.querySelector(".collection");
console.log(tasklist);
console.log(taskinput.value);

// load all eventlistners
loadeventlistners();
// creating a function for event listeners
function loadeventlistners() {
    // document.addEventListener("DomContentLoaded",gettask);
    form.addEventListener("submit", addevent);
    //  removing the element
    tasklist.addEventListener("click", removetask);
    // clearing the task
    cleartask.addEventListener("click", clearall);
    // filtering the task
    filter.addEventListener("keyup", filtering);
}
// creating a function add event
var e, f, g, h, j, k, list1, items;
function addevent(e) {
    if (taskinput.value === "undefined") {
        alert("add any task");
    }
    //  creating a li element
    const li = document.createElement("li");
    li.className = "collection-item"
    li.appendChild(document.createTextNode(taskinput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // console.log(link);
    // console.log(li);
    f = li.appendChild(link);
    // console.log(f);
    g = tasklist.appendChild(li);
    // var den = storelocalstorage(taskinput.value);
    // console.log(den);
    console.log(g);
    taskinput.value = "";
    e.preventDefault();
}
// getting the task items in the dom
// function gettask(){
//     let task1;
// if(localStorage.getItem("task1")===null){
//     task1=[];
//     console.log(task1);
// }
// else{
// task1=JSON.parse(localStorage.getItem("task1"));
// console.log(task1);
// }
// var k;
// task1.forEach(function(k){
//     const li = document.createElement("li");
//     li.className = "collection-item"
//     li.appendChild(document.createTextNode(k));
//     const link = document.createElement("a");
//     link.className = "delete-item secondary-content";
//     link.innerHTML = '<i class="fa fa-remove"></i>';
//     // console.log(link);
//     // console.log(li);
//     f = li.appendChild(link);
//     // console.log(f);
//     g = tasklist.appendChild(li)
//     k.preventDefault();});
// }
// adding to the local storag
var y;
function storelocalstorage(y) {
   console.log(localStorage.getItem("task1"));
    console.log(y);
    let task1;
    if (localStorage.getItem("task1") === null){
        task1 = [];
        console.log(task1);
    }
    else {
        task1 = JSON.parse(localStorage.getItem("task1"));
        console.log(task1);
    }
    task1.push(y);
    localStorage.setItem("task1", JSON.stringify(y));
}
// deleting the task
function removetask(h) {
    console.log(h.target);
    if (h.target.parentElement.classList.contains("delete-item")) {
        if (confirm('are you sure?')) {
            h.target.parentElement.parentElement.remove();
        }
    }
}
function clearall(j) {
    console.log(tasklist.innerHTML);
    tasklist.innerHTML = " ";
    j.preventDefault();
}
var text, text3, text1, text2, text4, z;
// filtering the task
function filtering(k) {
    text = k.target.value;
    console.log(text);
    text1 = document.querySelectorAll(".collection-item");
    text1.forEach(function (text2) {
        text3 = console.log(text2.textContent);
        text4 = (String(text3));
        if (text4.indexOf(text) != 0) {
            text2.style.display = "block";
        }
        else {
            text2.style.display = "none";
        }
    });
}
//

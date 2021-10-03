// we the shoe the notes after reloading if we call the function here
console.log('notes app');
const addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', (e) => {
    let addtxt = document.getElementById('addtxt');
    // to get the items from the local storage
    let getitems = localStorage.getItem("notes");
    // checking for the zero items in the local storage
    if (getitems == null) {
        // no items create an empty array
        notesobj = [];
        // console.log(notesobj);
    }
    // checking for whether the items are included in it
    else {
        // if the items are found turn them into a array
        notesobj = JSON.parse(getitems);
        // console.log(notesobj);
    }
    // pushing the entered values and setting the value into the local storage
    
    notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = '';
    shownotes();
    e.preventDefault();
})
// function to show elements from the notesobj
const shownotes = () => {
    let getitems = localStorage.getItem("notes");
    // checking for the zero items in the local storage
    if (getitems == null) {
        // no items create an empty array
        notesobj = [];
        // console.log(notesobj);
    }
    // checking for whether the items are included in it
    else {
        // if the items are found turn them into a array
        notesobj = JSON.parse(getitems);
    }
    // we receive an array of notes.obj it contains element and index values in it.
    let html = "";
    // we have to loop through the array and add the your notes dynamically'
    notesobj.forEach((element, index) => {
        html += `<div class=" notecard card my-2 mx-2" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">Note ${index + 1}</h5>
  <p class="card-text">${element}</p>
  <button id='${index}' onclick='deletenote(this.id)' class="btn btn-primary">Delete</button>
</div>
</div>`;
    });
    let noteelm = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteelm.innerHTML = html;
    } else {
        noteelm.innerHTML = `nothing to show! "add a note" section above to add notes,`
    }
}
function deletenote(index) {
    console.log(index);
    let getitems = localStorage.getItem("notes");
    // checking for the zero items in the local storage
    if (getitems == null) {
        // no items create an empty array
        notesobj = [];
        // console.log(notesobj);
    }
    // checking for whether the items are included in it
    else {
        // if the items are found turn them into a array
        notesobj = JSON.parse(getitems);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}
let searchform=document.getElementById('searchform');
searchform.addEventListener('submit', (e) => {
    // console.log(search.value);
    e.preventDefault();
    let search = document.getElementById('searchtxt');
    let inputval = search.value;
    let notecard = document.getElementsByClassName('notecard');
    console.log(notecard);
    Array.from(notecard).forEach((element) => {
        console.log(element);
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        console.log(cardtxt);
        if (cardtxt.includes(inputval)) {
            console.log("hello");
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


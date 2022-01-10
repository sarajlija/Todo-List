//Global variables
const itemLeft = document.getElementById('item-left')
const active = document.getElementById('active')
const all = document.getElementById('all')
const clear = document.getElementById('clear-complited')
const inputTask= document.getElementById('input-task')
const myInput = document.getElementById('my-input')
const imgCross = document.getElementsByClassName('img-cross')
let list = document.querySelector('#collection-id')
const complited = document.getElementById('complited')


//LOAD EVENT
document.addEventListener('DOMContentLoaded', getTasks)
inputTask.addEventListener('change', newElement)
list.addEventListener('click', checkTask)


//Get task from Localstorage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task) {
        let status = list.childElementCount;
        status = status + 1
        itemLeft.innerText = `${status} item left`
        //Create LI element
        let li = document.createElement("li")
        li.className = 'collection-item'
         //Create circle icon and appending to LI element
        let circleIcon= document.createElement('i')
         circleIcon.className = 'fa fa-circle-thin'
        li.appendChild(circleIcon);     
        let inputText = document.createTextNode(task)
        li.appendChild(inputText);
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.setAttribute('href', '#')
        link.innerHTML = '<img  class="img-cross" src="/assets/img/icon-cross.svg">'
        li.appendChild(link)
        list.appendChild(li)       
    })
}
 
//ADD TASK (CREATE NEW LIST)
function newElement(e) {

    if (myInput.value ==='') {
        alert("You must write something!");
        
    } else {
        //Couting new creating elements
        let status = list.childElementCount;       
        status = status + 1;      
        itemLeft.innerText = `${status} item left`;
        //Create LI element and add class
         let li = document.createElement("li");
        li.className = 'collection-item'
        //Create circle icon and appending to LI element
        let circleIcon= document.createElement('i');
        circleIcon.className = 'fa fa-circle-thin';
		//circleIcon.setAttribute('style', 'color: var(--bs-gray);font-size: 27px;margin: 0;')
        li.appendChild(circleIcon);
        //Assigning and adding text to LI element
        let inputText = document.createTextNode(myInput.value);
        li.appendChild(inputText);
        //Create link A
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //add atributs
        link.setAttribute('href', '#')
        //Add icon html
        link.innerHTML = '<img  class="img-cross" src="/assets/img/icon-cross.svg">';
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        list.appendChild(li);
         //Store in local storage
        storeTaskInLocalStorage(myInput.value);
       // console.log(list)
        //Clear input
        myInput.value = '';         
    }

e.preventDefault()
} 

//Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks =[];
     } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Add a "checked" symbol when clicking on a list item
function checkTask(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
}


//CHECK ACTIVE TASK

active.addEventListener('click', function () {
   
   let lis = document.querySelectorAll('#collection-id .collection-item')

    //clearTasksFromLocalStorage();
    let i;
    let count =0 ;

    for (i = 0; i < lis.length; i++) {
        
       if (!lis[i].classList.contains("checked")) {
           
                    lis[i].style.display = "flex";
                
                   count++
           
            itemLeft.innerText = `${count} item left`
           //clearTasksFromLocalStorage();
                } else {
                    lis[i].style.display = "none";
              }
      
        } 

})

//CHECK COMPLITED TASK

complited.addEventListener('click', function () {
    let lis = document.querySelectorAll('#collection-id .collection-item')
    let count = 0
    let i = 0;
    for (i = 0; i < lis.length; i++) {
 if (lis[i].classList.contains("checked")) {
                  
                    lis[i].style.display = "flex";
      count++ 
            itemLeft.innerText = `${count} item left`  
                 
               } else {
                    lis[i].style.display = "none";
           }
        }
})

//ALL TASK

all.addEventListener('click', function () {
    let lis = document.querySelectorAll('#collection-id .collection-item')

    let i = 0;
    for (i = 0; i < lis.length; i++) {

         lis[i].style.display = "flex";
       //*  storeTaskInLocalStorage(lis[i])
        let status = list.childElementCount; 
            itemLeft.innerText = `${status} item left`
   }
})

//CLEAR COMPLITED

clear.addEventListener('click', function () {
    let lis = document.querySelectorAll('#collection-id .collection-item')
    let i = 0;
    for (i = 0; i < lis.length; i++) {
if(lis[i].classList.contains('checked')){
    lis[i].remove()
}
let status = 0;
            itemLeft.innerText = `${status} item left`                 
    } 

// CLEAR FROM LS
  clearTasksFromLocalStorage();
})


// CLEAR TASK FROM  LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//REMOVE TASK
list.addEventListener('click', removeTask)
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
           
            e.target.parentElement.parentElement.remove() 

            removeTaskFromLocalStorage(e.target.parentElement.parentElement) 
           let status = list.childElementCount;
            //status = status -1
            itemLeft.innerText = `${status} item left` 
                 
            }
        }
     
 }

// Remove task from localStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//DARK MODE*///////////////////////////////////////////////////
    let toggleButton = document.getElementById('toggle-button')
toggleButton.addEventListener('click', toggleDarkMode)
    function toggleDarkMode() {
        
    let bodyId = document.getElementById('body-id')
    let inputField = document.querySelector('.input-field')
    let imgSun = document.querySelector('.img-sun')
    let imgMoon = document.querySelector('.img-moon')
    let wrapper = document.querySelector('.wrapper')
    let filter = document.querySelector('.filter')
    bodyId.classList.toggle("dark-mode");  
 
    if(bodyId.classList.contains('dark-mode')){
        list.classList.remove('collection-light')
        list.classList.add('collection')
        imgSun.style.display = 'block'
        imgMoon.style.display = 'none'
        myInput.style.backgroundColor = 'hsl(235, 24%, 19%)' 
        bodyId.classList.add('dark-mode-mobile')
        bodyId.classList.remove('light-mode-mobile')
       inputField.style.backgroundColor = 'hsl(235, 24%, 19%)' 
        wrapper.style.backgroundColor = 'hsl(235, 24%, 19%)' 
        filter.style.backgroundColor = 'hsl(235, 24%, 19%)'    
              
    } else {
       
        list.classList.remove('collection')
        list.classList.add('collection-light')
        bodyId.classList.remove('dark-mode-mobile')
        bodyId.classList.add('light-mode-mobile')
        imgSun.style.display = 'none'
        imgMoon.style.display = 'block'        
        inputField.style.backgroundColor = 'white' 
        myInput.style.backgroundColor = 'white'  
        wrapper.style.backgroundColor = 'white'
        filter.style.backgroundColor = 'white'      
      
    }
 
}
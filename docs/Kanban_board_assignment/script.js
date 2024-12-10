const boards = document.querySelectorAll('.board')
const items = document.querySelectorAll('.card')
const container = document.querySelector('.container');
const dltIcon = document.querySelectorAll('.dlt-icon')

//function to add new class on dragging card
function attachEventListenerToCard(card){
  card.addEventListener('dragstart',()=>{
    card.classList.add('is-dragging')
  })

  card.addEventListener('dragend',()=>{
    card.classList.remove('is-dragging')
  })
}


//completedIcon
function createCompleteIcon(color="#fff",size=18){
  const svgString=`<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" width="${size}" height="${size}">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>`

    const CompleteIcon = document.createElement('div');
    CompleteIcon.classList.add('complete-icon');
    CompleteIcon.innerHTML = svgString;

    return CompleteIcon

}

//deleteIcon
function createDeleteIcon(color="#fff",size=18){
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" width="${size}" height="${size}">  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>`;

  const deleteIcon = document.createElement('div');
  deleteIcon.classList.add('dlt-icon');
  deleteIcon.innerHTML = svgString;

  return deleteIcon;
}

//delete event listener
function deleteEvent(card){
  const deleteTarget = card.querySelector('.dlt-icon')
  deleteTarget.addEventListener('click',()=>{
    card.remove()
  })
}


//delete board event
function deleteBoardEvent(board){
  const boardTarget = board.querySelector('.heading .dlt-icon');

  boardTarget.addEventListener('click',()=>{
    board.remove()
  })
}

//complete event listener
function onComplete(card){
  const completeTarget = card.querySelector('.complete-icon')
  completeTarget.addEventListener('click',()=>{
    card.style.backgroundColor='lightgreen';
  })
}


//add new board on click (+) button
const addButton = document.querySelector('.add-board');


addButton.addEventListener('click',()=>{
  const boardDiv = document.createElement('div');
  boardDiv.classList.add('board');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('heading');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title-section');
  
  const header = document.createElement('h3');
  header.setAttribute("contenteditable",true);
  header.innerHTML='Hello'
  titleDiv.appendChild(header);
  
  titleDiv.appendChild(createDeleteIcon());
  headerDiv.appendChild(titleDiv)
  const btn = document.createElement('button');
  btn.innerHTML='Add';
  btn.classList.add('add-task');
  headerDiv.appendChild(btn);
  boardDiv.appendChild(headerDiv)
  deleteBoardEvent(boardDiv);
  boardDiv.addEventListener('dragover',()=>{
    const card = document.querySelector('.is-dragging')
    const target = e.target;
    boardDiv.insertBefore(card,target)
  })
  container.insertBefore(boardDiv,addButton);
})


//event listener for adding tasks 
container.addEventListener('click',(e)=>{
  const target = e.target;

  if(target.classList.contains('add-task')){
    const board = target.closest('.board');

    const task = prompt('Enter Task');

    if(!task){
      return;
    }

    const div = document.createElement('div');
    div.appendChild(createCompleteIcon())
    const p = document.createElement('p');
    p.innerText = task;
    div.classList.add('card');
    div.appendChild(p);
    div.appendChild(createDeleteIcon());
    div.setAttribute('draggable',true);
    attachEventListenerToCard(div)
    deleteEvent(div);
    onComplete(div);
    saveTasks(div,board)
    board.appendChild(div);

  }
})



//save the task to local storage
function saveTasks(card,board){
  const keys = Object.keys(localStorage);
  console.log(keys.length)

  localStorage.setItem(board.id+`-${keys.length+1}`,card.innerHTML);
}

items.forEach((card)=>{
  attachEventListenerToCard(card)
})




boards.forEach((board) => {
  board.addEventListener('dragover',(e)=>{
    const card = document.querySelector('.is-dragging')
    const target = e.target;
    board.insertBefore(card,target)
  })
})
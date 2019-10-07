const slots = ['first', 'second', 'third'];
const users = [
  { id: 1, name: 'moe', slot: 'first', selected: false },
  { id: 2, name: 'larry', slot: 'first', selected: false },
  { id: 3, name: 'curly', slot: 'third', selected: false },
  { id: 4, name: 'lucy', slot: 'third', selected: false },
];

//helper functions
const render = (template, node) => {
  node.innerHTML += template;
};

const sortElements = parentContainer => {
  let parentContainerChildren = [...parentContainer.children];
  let childInnerText = [];
  parentContainer.innerHTML = '';
  
  parentContainerChildren.forEach(ele => {
    childInnerText.push(ele.innerText);
  });
  users.forEach(user => {
    if (childInnerText.includes(user.name)) {
      const template = `<div class="box-theme ${ (user.selected) ? 'selected' : ''}">${user.name}</div>`;
      const node = parentContainer;
      render(template, node);
    }
  });
};

const shiftElements = ev => {
  let childElementsList = [...ev.target.parentElement.lastElementChild.children];
  let parentContainer;
  childElementsList.forEach(ele => {
    if (ele.classList.contains('selected')) {
      let child = ev.target.parentElement.lastElementChild.removeChild(ele);
      if (ev.target.classList.contains('shift-right')) {
        ev.target.parentElement.nextElementSibling.lastElementChild.appendChild(
          child);
        parentContainer =
          ev.target.parentElement.nextElementSibling.lastElementChild;
      } else {
        ev.target.parentElement.previousElementSibling.lastElementChild.appendChild(
          child);
        parentContainer =
          ev.target.parentElement.previousElementSibling.lastElementChild;
      }
    }
  });
  sortElements(parentContainer);
};
//render elements
users.forEach(user => {
  const template = `<div class="box-theme">${user.name}</div>`;
  const node = document.querySelector(`#${user.slot}`).lastElementChild;
  render(template, node);
});

const userDivs = document.querySelectorAll('#container > div > div');
userDivs.forEach(ele => {
  ele.addEventListener('click', ev => {
    ev.target.classList.toggle('selected');
    users.forEach( user => {
        if(user.name === ev.target.innerText){
            (user.selected) ? user.selected = false : user.selected = true;  
        }
    })
    ev.stopPropagation();
  });
});

//button functionality
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.addEventListener('click', shiftElements);
});

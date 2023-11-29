let todolist = [
    // { item: 'buy milk', dueDate: '24/11/23' },
    // { item: 'drink milk', dueDate: '24/11/23' },
];
displayitems();




function addtodo() {
    let inputele = document.querySelector('#todo-input');
    let dateele = document.querySelector('#todo-date');
    let todoitem = inputele.value;
    let tododate = dateele.value;
    todolist.push({
        item: todoitem,
        dueDate: tododate
    });
    inputele.value = '';
    dateele.value ='';
    displayitems();
}
function displayitems() {
    let containerele = document.querySelector('.todo-container');
    let newhtml = '';

    for (let i = 0; i < todolist.length; i++) {
        // let item = todolist[i].item;        
        // let dueDate = todolist[i].dueDate;   
        let {item, dueDate} = todolist[i];     
        newhtml += `
            <p>${item}</p>
            <span>${dueDate}</span>
            <button onclick = "todolist.splice(${i},1); 
            displayitems();">Delete</button>
        `;
    }
    containerele.innerHTML = newhtml;

}
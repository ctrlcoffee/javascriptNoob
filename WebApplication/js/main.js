import ToDoItem from "./todoitem";
import ToDoList from "./todolist";


const toDoList=new ToDoList();




document.addEventListener("readyStatechange", (event)=>{
    if(event.target.readyState==="complete"){
        initApp();
    }

});


const initApp=()=>{
    //Add listeners
    const itemEntryForm=document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        processSubmission();
    });

    const clearItems=document.getElementById("clearItems");
    clearItems.addEventListener("click",(event)=>{
        const list=toDoList.getList();
        if(list.length){
            const confirmed=confirm("Are you sure you want to clear the entire list?");
            if(confirmed){
                toDoList.clearList();
                updatePersistentData(toDoList.getList());
                refreshThePage();
            }
        }
    });

    //Procedural
    //load list object
    loadListObject();
    refreshThePage();

};

const loadListObject=()=>{
    const storedList=localStorage.getItem("myToDoList");
    if(typeof storedList !== "string") return;
    const parsedList =JSON.parse(storedList);
    parsedList.forEach(itemObj=>{
        const newToDoItem=createNewItem(itemObj._id, itemObj._item);
        toDoList.addItemToList(newToDoItem);
    });
};

const refreshThePage=()=>{
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItementry();
};

const clearListDisplay=()=>{
    const parentElement=document.getElementById("listItems");
    deleteContents(parentElement);

};
//this
const deleteContents=(parentElement)=>{
    let child=parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child=parentElement.lastElementChild;
    }
};


const renderList=()=>{
    const list =toDoList.getList();
    list.array.forEach((item) => {
        buildListItem(item);
        
    });
};


const buildListItem=(item)=>{
    const div=document.createElement("div");
    div.className="item";
    const check=document.createElement("input");
    check.type="checkbox";
    check.id=item.getId();
    check.tabIndex=0;
    addClickListenerToCheckbox(check);
    const label=document.createElement("label");
    label.htmlfor=item.getId();
    label.textContent=item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container=document.getElementById("listItems");
    container.appendChild(div);
};

const addClickListenerToCheckbox=(checkbox)=>{
    checkbox.addEventListener("click", (event)=>{
        toDoList.removeItemFromList(checkbox.id);
        updatePersistentData(toDoList.getList());
        setTimeout(()=>{
            refreshThePage();
        },1000);

    });
};

const updatePersistentData=(listArray)=>{
    localStorage.setItem("myToDoList", JSON.stringify(listArray));
};



const clearItemEntryField=()=>{
    document.getElementById("newItem").value="";

};

const setFocusOnItementry=()=>{
    document.getElementById("newItem").focus();
};


const processSubmission=()=>{
    const newEntryText=getNewEntry();
    if(!newEntryText.length) return;
    const nextItemId=calcNextItemId();
    const toDoItem=createNewItem(nextItemId,newEntryText);
    toDoList.addItemToList(toDoItem);
    updatePersistentData(toDoList.getList());
    refreshThePage()
};

const getNewEntry=()=>{
    return document.getElementById("newItem").value.trim();
};

const calcNextItemId=()=>{
    let nextItemId=1;
    const list=toDoList.getList();
    if(list.length>0){
        nextItemId=list[list.length-1].getId()+1;
    }
    return nextItemId;
};

const createNewItem=(itemId,itemText)=>{
    const toDo=new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};
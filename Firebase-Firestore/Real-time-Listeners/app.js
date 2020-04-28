const list = document.querySelector('ul');
const form = document.querySelector('form');


// add recipe to html template 
const addRecipe = (recipe , id) =>{
    let time = recipe.created_at.toDate();
    let html = `
    <li data-id="${id}">   
        <div>${recipe.title}</div>
        <div>${time}</div>
        <button class = "btn btn-danger btn-sm my-2">delete</button>
    </li>
    `;

  list.innerHTML += html;
}

// delete recipe from html template
const deleteRecipe = (id) =>{
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe =>{
        if(recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    })
}
//getting recipes from database
db.collection('recipes').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === 'added'){
            addRecipe(doc.data() , doc.id);
        } else {
            deleteRecipe(doc.id);
        }
    })
});

// add documents to database
form.addEventListener('submit' , event =>{
    event.preventDefault();

    const now = new Date();
    const recipe = {
        title :form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }
    form.reset();
    db.collection('recipes').add(recipe)
        .then(()=>{
            console.log("Recipe added.");
        }).catch((err =>{
            console.log(err);
        }));
});

// delete from database
list.addEventListener('click' , event =>{
    console.log(event);
    if(event.target.tagName === 'BUTTON'){
        const id = event.target.parentElement.getAttribute('data-id');
       db.collection('recipes').doc(id).delete()    // .doc() method is used to get reference to document we want to delete
       // we have passed 'id' as argument id doc() to get reference to document with this id
        .then(()=>{
            console.log("recipe deleted");
        }).catch((err)=>{
            console.log(err);
        });
    }
});
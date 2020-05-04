const list = document.querySelector('ul');
const form = document.querySelector('form');


// function to add recipe 
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

//getting collection from database
db.collection('recipes').get()           // our database name in firestore setup
    .then(snapshot =>{
        // when we have data
        snapshot.docs.forEach(doc => {
            console.log(doc.id);
            addRecipe(doc.data() , doc.id);
        });

    }).catch(err=>{
        // when we have error
        console.log(err);
    });

// add documents
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

// delete button eventListener
list.addEventListener('click' , event =>{
    console.log(event);
    if(event.target.tagName === 'BUTTON'){
        const id = event.target.parentElement.getAttribute('data-id');
       db.collection('recipes').doc(id).delete()    // .doc() method is used to get reference to document we want to delete
       // we have passed 'id' as argument in doc() to get reference to document with this id
        .then(()=>{
            console.log("recipe deleted");
        }).catch((err)=>{
            console.log(err);
        });
    }
});

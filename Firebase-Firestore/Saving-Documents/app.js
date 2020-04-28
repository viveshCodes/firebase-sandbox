const list = document.querySelector('ul');
const form = document.querySelector('form');


// function to add recipe 
const addRecipe = (recipe) =>{
    let time = recipe.created_at.toDate();
    let html = `
    <li>
        <div>${recipe.title}</div>
        <div>${time}<>
    </li>
    `;

  list.innerHTML += html;
}

//getting collection from database
db.collection('recipes').get()           // our database name in firestore setup
    .then(snapshot =>{
        // when we have data
        snapshot.docs.forEach(doc => {
            addRecipe(doc.data());
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
const list = document.querySelector('ul');

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
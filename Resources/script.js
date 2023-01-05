
// Nedan hämtar jag data för att logga ut alla användare från min JSON-server
const userListUl = document.querySelector('#userlist ');
const specificUser = document.querySelector('#specificuser');

const myFetchFunction = async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const theResponseData = await response.json();

    // console.log(JSON.stringify(theResponseData));
    console.log(theResponseData);

   for (user of theResponseData) {
    let li = document.createElement('li');
    li.innerHTML = user.firstname + " " + user.lastname;
    userListUl.append(li);
    console.log(user.firstname);
   }

    return theResponseData;
}

myFetchFunction()



// -------- Nedan skickar jag in data för att skapa en ny användare ------ //

const postForm = document.querySelector('#postForm');

function postsubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(postForm);

    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    


   

    fetch('http://localhost:3000/api/formpost', {
        method: "POST",
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    
}


// Här gör jag en PUT request för att ändra namn på en användare

const deleteForm = document.querySelector('#deleteForm');

function postsubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(deleteForm);

    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    


    fetch('http://localhost:3000/api/users/deleteuser', {
        method: "DELETE",
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    
}

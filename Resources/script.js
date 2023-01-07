
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
    li.innerHTML = user.firstname + " " + user.lastname + ". Här är användarens Id: " + user.id;
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
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(res => console.log(res))
    
}


// Här gör jag en PUT request för att ändra namn på en användare

const putForm = document.querySelector('#putForm');

function putsubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(putForm);

    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    


    fetch('http://localhost:3000/api/change', {
        method: "PUT",
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(res => console.log(res))
    
}


// Här nedan skickar jag ett Delete anrop för att ta bort en användare

const deleteForm = document.querySelector('#deleteForm');

function deletesubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(deleteForm);

    
    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    


    fetch('http://localhost:3000/api/delete', {
        method: "DELETE",
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(res => console.log(res))
    
}

// Här nedan förfrågar jag efter en specifik användare utifrån ID : Vilka IDs mina användare har hittar du i users.json : Kolla där efter det nummer du vill logga fram

const getSpecificUserForm = document.querySelector('#getSpecificUserForm');

function specificgetsubmit(event) {
    event.preventDefault();

  
   
  
   const formData = new FormData(getSpecificUserForm);
   const res = Object.fromEntries(formData);
   const id = res.id;



  
   

    fetch('http://localhost:3000/api/' + id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(res => console.log(res));
    
}



function getByID () {

   const  param = {
    param1: value1
   };


    
}



specificgetsubmit();
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


// fetch('http://localhost:3000/api/users')
// .then((data) => {
//     return data.json();
// })
// .then((objectdata) => {
//     console.log(objectdata);
//     let ulItems ="";
//     objectdata.map((users) =>{
//         ulItems += `<li>${users.firstname}</li>`;
//     });
//     document.querySelector("#userlist").innerHTML=ulItems;
// })






// --------------- Nedanför hämtar jag hem ett specifikt ID och lägger -------------------- //

// const myFetchIDFunction = async () => {
//     const response = await fetch('http://localhost:3000/api/users/10');
//     const data = await response.json();

//     console.log(data);

    
//          let li = document.createElement('li');
//          li.innerHTML = "Den här användaren heter " + user.firstname + " " + user.lastname + ". Hen jobbar som " + user.occupation + " och hens ID är: " + user.id;
//          specificuser.append(li);
        



// fetch('http://localhost:3000/api/users/242')
// .then((data) => {
//     return data.json();
// })
// .then((data) => {
//     console.log(data);

//         let li = document.createElement('li');
//          li.innerHTML = "Den här användaren heter " + data.firstname + " " + data.lastname + ". Hen jobbar som " + data.occupation + " och hens ID är: " + data.id;
//          specificUser.append(li);
         
// })

let formBtnEl = document.querySelector('#sendInfo');
formBtnEl.addEventListener("click", obtainBackendInfo);

function obtainBackendInfo() {
    fetch('http://localhost:3000/api/saveformid')
    .then((data) => {
        return data.json();
    })
    .then((data) => {
            console.log(data);

        // let li = document.createElement('li');
        //  li.innerHTML = "Den här användaren heter " + data.firstname + " " + data.lastname + ". Hen jobbar som " + data.occupation + " och hens ID är: " + data.id;
        //  specificUser.append(li);
    })
}


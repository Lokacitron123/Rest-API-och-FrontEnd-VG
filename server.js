const express = require('express');
const app = express();
const fs = require('fs');
const { send } = require('process');
const cors = require('cors');
app.use(cors());



app.use(express.json()); // Det här använder vi för att acceptera inkommande data i json format

app.use(
    express.urlencoded({
      extended: true,
    })
  ) // Det här använder vi för att avkoda datan som skickas från html formulär

app.get('/api/users', (req, res) => {
    console.log("Here I read my JSON file...")

    // Reading my JSON
    fs.readFile('users.json', (err, jsonString) => {
        
        if (err) {
            console.log(err);
            res.status(404).send("Något gick fel");
        } else {
                const data = JSON.parse(jsonString);
                console.log(data);
                res.status(200).send(data);
                
        }
    });
    
});





app.post('/api/users', (req, res) => {



    fs.readFile("users.json", (err, data) => {
        let parsedUsers = JSON.parse(data)

        if (err) {
            send.status(404).send("Det blev fel när vi försökte läsa in users.json")
        } else {
            let requestedDataFromRestClient = req.body;
            // Genom att skriva .id på min array-varbiabel lägger till ett ID på den inkomna datan
            // Math.random(); är en inbyggd funktion som slumpar fram ett nummer mellan 0 och 1
            // Math.floor(); är en funktion som avrundar nedåt till heltal
            // Det här skriver vi för att generera ett slumpmässigt ID - försöker efterlikna en dynamisk webbplats
            requestedDataFromRestClient.id = Math.floor(Math.random() * 10000).toString();

            let newUser = requestedDataFromRestClient;
            
            parsedUsers.push(newUser);

            fs.writeFile("users.json", JSON.stringify(parsedUsers, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(requestedDataFromRestClient);
                }
            });

        };

    });


});



app.put('/api/users/:id', (req, res) => {

    

    fs.readFile("users.json", (err, data) => {
        let users = JSON.parse(data);

        let array = users.find(arrayItem => arrayItem.id == req.params.id);

        if (err) {
            res.status(404).send("Vi kunde inte läsa in json-datan")
        } else {

            
            
            array.firstname = req.body.firstname;
            array.lastname = req.body.lastname;
           


            fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(array);
                }    
            });
            
        }

      
    });

});



app.delete('/api/users/:id', (req, res) => {
    
    fs.readFile("users.json", (err, data) => {
        const users = JSON.parse(data);
        // (1). Först letar vi upp IDet som skickas med i url-anropet med en .find-funktion
        let array = users.find(arrayItem => arrayItem.id == req.params.id);

        if (!array) {
            res.status(404).send("Vi kunde inte läsa in json-datan")
        } else {
            
            // (2). Sen kollar vi efter det index som är kopplat till det arrayItem ifrån vår json-filen. Den känner av vilket index vi letar efter utifrån det key-value vi valt att leta upp
            let index = users.indexOf(array);
            // (3) Vi tar nu bort det arrayItem med det ID vi valt att söka efter utifrån vad vi fått fram via indexOf
            users.splice(index, 1);


            fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(array);
                }    

            });
        }
    
    });

});    




// ------------- Kod för VG nedan ------------------- //

// Här hämtar jag hem datan som skickas via mitt formulär i frontended och skapar en ny användare som får ett ID automatiskt tillagt med POST
app.post('/api/formpost', (req, res) => {
    console.log(req.body); // Datan vi får genom body-anropet

    fs.readFile("users.json", (err, data) => {
        let users = JSON.parse(data)

        if (err) {
            send.status(404).send("Det blev fel när vi försökte läsa in users.json")
        } else {
            let formData = req.body;
            // Genom att skriva .id på min array-varbiabel lägger till ett ID på den inkomna datan
            // Math.random(); är en inbyggd funktion som slumpar fram ett nummer mellan 0 och 1
            // Math.floor(); är en funktion som avrundar nedåt till heltal
            // Det här skriver vi för att generera ett slumpmässigt ID - försöker efterlikna en dynamisk webbplats
            
            
            let filteredUsers = users;

            do {
                formData.id = Math.floor(Math.random() * 10000).toString();

                filteredUsers = users.filter(arrayItem => arrayItem.id == formData.id);
            } while (filteredUsers.length > 0);





            let newUser = formData;
            
            users.push(newUser);


            fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(users);
                }
            });

        };

    });

})

// Här ändrar jag namn på en användare som 

app.put('/api/change', (req, res) => {
    console.log(req.body)
    
    fs.readFile("users.json", (err, data) => {
        let users = JSON.parse(data);

        let array = users.find(arrayItem => arrayItem.firstname == req.body.firstname, arrayItem => arrayItem.lastname == req.body.lastname);

        if (err) {
            res.status(404).send("Vi kunde inte läsa in json-datan")
        } else {

            
            
            array.firstname = req.body.newfirstname;
            array.lastname = req.body.newlastname;
           


            fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(array);
                }    
            });
            
        }

    });
})


// Här tar jag bort en användare

app.delete('/api/delete', (req, res) => {
    
    console.log(req.body)

    fs.readFile("users.json", (err, data) => {
        const users = JSON.parse(data);
        // (1). Först letar vi upp det som skickas med i url-anropet med en .find-funktion
        let array = users.find(arrayItem => arrayItem.firstname == req.body.firstname);

        if (err) {
            res.status(404)
        } else {
            
            // (2). Sen kollar vi efter det index som är kopplat till det arrayItem ifrån vår json-filen. Den känner av vilket index vi letar efter utifrån det key-value vi valt att leta upp
            let index = users.indexOf(array);
            // (3) Vi tar nu bort det arrayItem med det ID vi valt att söka efter utifrån vad vi fått fram via indexOf
            users.splice(index, 1);


            fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.status(404).send("Något gick fel när vi försökte strängifiera datan")
                } else {
                    res.status(200).send(array);
                }    

            });
        }
    
    });

});    

// Här tar jag fram en specifik användare och loggar ut i min frontend

app.get('/api/:id', (req, res) => {
    


    // Reading my JSON
    fs.readFile('users.json', (err, data) => {
        
        
        let users = JSON.parse(data);

        let array = users.find(arrayItem => arrayItem.id == req.params.id);

        



        if (err) {
            console.log(err);
            res.status(404).send("Något gick fel");
        } else {
                // console.log(data);
                res.status(200).send(array);
                
        }
    });
    
});





app.listen(3000, () => console.log("Server is up"));
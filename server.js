const express = require('express');
const app = express();
const fs = require('fs');
const { send } = require('process');
const cors = require('cors');
app.use(cors());


app.use(express.json());

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


// Här skapar jag ett formulär jag kan använda för att skicka information


// Här hämtar jag hem datan som skickas via mitt formulär i frontended

app.get("/api/saveformid", (req, res) => {

    let urlID = req.body.id;

    fs.readFile('users.json', (err, jsondata) => {
        const data = JSON.parse(jsondata);

        let array = data.find(arrayItem => arrayItem.id == urlID);

        if (err) {
            console.log(err);
            res.status(404).send("Något blev fel");
        } else {
            console.log(array);
            res.status(200).send(array);
        }


    })
})




// Min get funktion med frontend - Hämta hem ett specifikt ID och visa i DOMen
app.get('/api/users/:id', (req, res) => {

    // Reading my JSON
    fs.readFile('users.json', (err, jsonString) => {
        const data = JSON.parse(jsonString);

        let array = data.find(arrayItem => arrayItem.id == req.params.id);

        if (err) {
            console.log(err);
            res.status(404).send("Något gick fel");
        } else {
                console.log(array);
                res.status(200).send(array);
                
        }
    });

}); 


app.listen(3000, () => console.log("Server is up"));
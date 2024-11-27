const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
// token moved to .env

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
// app.get("/")
app.get('/', function(req, res) {
    res.render('index', { title: 'Homepage' });
  });
app.get('/pets', async (req, res) => {
    const pets = 'https://api.hubapi.com/crm/v3/objects/pets?properties=Type,Color,Size,Name';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,  
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pets, { headers });
        const data = resp.data.results;
         res.render('updates', { title: 'Pets | HubSpot APIs', data });
         console.log(data);      
    } catch (error) {
        console.error("Error fetching: ", error.message);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.post('/update-pets', async (req, res) => {
    const update = {
        properties: {
            "type": req.body[`type-${petId}`],  // Use the dynamic name for each pet
            "color": req.body[`color-${petId}`],
            "size": req.body[`size-${petId}`],  
            "name": req.body[`name-${petId}`]
        }
    }

    // const email = req.query.email;
    const updatePets = 'https://api.hubapi.com/crm/v3/objects/pets/${hs_object_id}?idProperty=hs_object_id';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try { 
        await axios.patch(updatePets, update, { headers } );
        res.send(`
            <html>
                <body>
                    <h1>Pets updated successfully!</h1>
                    <p>You will be redirected back to the Pets page in 3 seconds</p>
                    <script>
                        setTimeout(() => {
                            window.location.href = '/pets';
                        }, 3000); // 3 seconds delay
                    </script>
                </body>
            </html>
        `);
    } catch(err) {
        console.error(err);
        res.send(`
            <html>
                <body>
                    <h1>Pets not updated</h1>
                    <p>You will be redirected back to the Pets page in 3 seconds</p>
                    <script>
                        setTimeout(() => {
                            window.location.href = '/pets';
                        }, 3000); // 3 seconds delay
                    </script>
                </body>
            </html>
        `);
    }

});

// Handle adding a new pet
app.post('/add-new-pet', async (req, res) => {
    const newPet = {
        type: req.body.newType,
        color: req.body.newColor,
        size: req.body.newSize,
        size: req.body.newName
    };
    console.log('New Pet:', newPet);
    // Send new pet data to API or database
    res.send(`
        <html>
            <body>
                <h1>Pet added successfully!</h1>
                <p>You will be redirected back to the Pets page in 3 seconds</p>
                <script>
                    setTimeout(() => {
                        window.location.href = '/pets';
                    }, 3000); // 3 seconds delay
                </script>
            </body>
        </html>
    `);
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
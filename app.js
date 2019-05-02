const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
const Commission = require('./models/commission');
const Artist = require('./models/user');

const sequelize = new Sequelize('sqlite:database.sqlite');

app.use(bodyParser.json());

Artist.hasMany(Commission, {
  foreignKey: 'artist_id'
});

Commission.belongsTo(Artist, {
  foreignKey: 'artist_id'
});

//2 GET ENDPOINTS
//get all commissions
app.get('/api/commissions', function (request, response){
  Commission.findAll().then((commissions) =>{
    response.json(commissions);
  });
});

//get single commission
app.get('/api/commissions/:id', function(request, response){
  let { id } = request.params;

  Commission.findByPk(id,{
    include: [Artist]
  }).then((commission)=>{
    if(commission){
      response.json(commission);
    } else{
      response.status(404).send();
    }
  });
});

//try getting "artist"
app.get('/api/artists', function (request, response){
  Artist.findAll().then((artists) =>{
    response.json(artists);
  });
});

//POST ENDPOINT --> trying to pick up a Blind Parameter
app.post('/api/commissions', function(request, response){
  Commission.create({
    title: request.body.title,
    description: request.body.description,
    price: request.body.price
  }).then((commission) => {
    response.json(commission);
  }, (validation) =>{
    response.status(422).json({
      errors: validation.errors.map((error) =>{
        return {
          attribute: error.path,
          message: error.message
        }
      })
    });
  });
});

app.patch('/api/commissions/:id', function(request, response){
 let { id } = request.params;

 //three outcomes
 //1) successful update - show json and 200 code
 //2) fail validation - show errors and 204 code
 //3) track not found - empty and 404 code

  Commission.findByPk(id)
    .then((commission) =>{
      if (commission){
        return commission.update({
          title: request.body.title,
          description: request.body.description,
          price: request.body.price
        });
      } else if (!commission) {
        response.status(404).send();
        return Promise.reject();
      }
    })
    .then((commission) => {
      //successful update
      response.status(200).json(commission);
    },(validation) => {
      response.status(422).json({
      errors: validation.errors.map((error) => {
        return{
          attribute: error.path,
          message: error.message
        }
      })
    });
  });
});

//DELETE
app.delete('/api/commissions/:id', function (request, response){
  //find playlist we want to delete
  let { id } = request.params;

  //destroy playlist (make orphaned records)
  Commission
    .findByPk(id)
    .then((commission) =>{
      if (commission){
        return commission.destroy();
      } else{
        return Promise.reject();
      }
    })
    .then(() =>{
      //successful status
      response.status(204).send();
    }, () => {
      response.status(404).send();
    });
});



app.listen({port: process.env.PORT || 8000});

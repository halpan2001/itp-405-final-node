const frisby = require('frisby');

const { Joi } = frisby;

//Endpoint 1 (get)
//Commission Does Not Exist
//Assert that a 404 status code when commission isn't found.
it("should return a status of 404 when the commission isn't found", () =>{
  return frisby
    .patch('http://localhost:8000/api/commissions/-1')
    .expect('status', 404);
});

//Commission Does Exist
//Assert that a 200 status code when commission is found.
it("should return a status of 200 when the commission is found", () =>{
  return frisby
    .patch('http://localhost:8000/api/commissions/14')
    .expect('status', 200);
});

//Endpoint 2 (patch)
//Updating Commission Successfully
//When updating a commission succeeds  assert that a 200 status code is returned
it('should return a status of 200 when it successfully updates a commission', ()=>{
  return frisby
    .patch('http://localhost:8000/api/commissions/14',{
      name: 'Updated commission',
      description: 'updated description yay yay',
      price: '2.0'

    })
    .expect('status', 200);
});

//Commission not found
//When updating and a commission is not found assert that a 404 status code is returned
it('should return a status of 404 when it successfully updates a commission', ()=>{
  return frisby
    .patch('http://localhost:8000/api/commissions/-11',{
      name: 'Updated commission',
      description: 'updated description yay yay',
      price: '2.0'

    })
    .expect('status', 404);
});

//Test 4: Deleting Commission Successfully
//When deleting a commission succeeds  assert that a 204 status code is returned
it('should return a status of 204 when it successfully deletes a commission', ()=>{
  return frisby
    .delete('http://localhost:8000/api/commissions/8')
    .expect('status', 204);
});

//Test 5: Deleting Commission Successfully
//When deleting a commission succeeds  assert that a 204 status code is returned
it('should return a status of 404 when it cannot find commission to delete', ()=>{
  return frisby
    .delete('http://localhost:8000/api/commissions/8')
    .expect('status', 404);
});

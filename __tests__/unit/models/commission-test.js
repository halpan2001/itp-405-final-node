const { expect } = require('chai');
const Commission = require('./../../../models/commission');

describe('commission', ()=>{
  //TITLE
  describe('title', ()=>{
    it ('should fail validation when there is no title', async ()=>{
      try{
        let commission = new Commission({
          title: '',
          description: 'This is a new commission',
          price: '3',
          workTime: '4',
          slots: '2'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('Title is required');
      }
    });

    it ('should pass validation when there is a title', async ()=>{
      try{
        let commission = new Commission({
          title: 'Title',
          description: 'This is a new commission',
          price: '3',
          workTime: '4',
          slots: '2'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('Title is required');
      }
    });
  });

  //DESCRIPTION
  describe('description', ()=>{
    it ('should fail validation when there is no description', async ()=>{
      try{
        let commission = new Commission({
          title: 'Title',
          description: '',
          price: '3',
          workTime: '4',
          slots: '2'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('Description is required');
      }
    });

    it ('should pass validation when there is a description', async ()=>{
      try{
        let commission = new Commission({
          title: 'Title',
          description: 'This is a new commission',
          price: '3',
          workTime: '4',
          slots: '2'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('Description is required');
      }
    });
  });

  //INTEGERS
  describe('price, workTime and slots', ()=>{
    it ('should fail validation when price is not numeric', async ()=>{
      try{
        let commission = new Commission({
          title: 'Title',
          description: 'This is a new commission',
          price: 'a',
          workTime: '4',
          slots: '2'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('Price must be numeric');
      }
    });

    it ('should fail validation when workTime is not numeric', async ()=>{
      try{
        let commission = new Commission({
          title: 'Title',
          description: 'This is a new commission',
          price: '3',
          workTime: 'a',
          slots: '2'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('workTime must be numeric');
      }
    });

    it ('should fail validation when slots is not numeric', async ()=>{
      try{
        let commission = new Commission({
          title: 'Title',
          description: 'This is a new commission',
          price: '3',
          workTime: '4',
          slots: 'a'
        });
        await commission.validate();
      } catch (error){
        expect(error.errors[0].message).to.equal('slots must be numeric');
      }
    });



  });


});

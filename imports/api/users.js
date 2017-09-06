import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


//server method to prevent to create a user if is not valid for some reason.
Accounts.validateNewUser((user) =>{

  const email = user.emails[0].address;


  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });




  console.log('this is the user', user);
  return true;
});

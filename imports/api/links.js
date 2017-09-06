import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

//necesitamos meternos en entorno server para ejecutar el metodo publish.
if(Meteor.isServer){

  // el string links puede ser cualquiera no hace ref. a la Mongo.Collection links
  Meteor.publish('links', function () {
    return Links.find({ userId : this.userId });
  });
}

// METHODS CONVENTION NAMING

// resource.action
// emails.archive
// links.insert

Meteor.methods({
 'links.insert'(url){

   if(!this.userId){
     throw new Meteor.Error('not-authorized');
   }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({url});

    //hacemos un override del _id de mongo con el de shortid.generate()
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

 'links.setVisibility'(_id, visible){
   if(!this.userId){
     throw new Meteor.Error('not-authorized');
   }

   new SimpleSchema({
     _id: {
       type: String,
       min: 1
     },
     visible: {
       type: Boolean,
     }
   }).validate({_id, visible});

   Links.update({
     _id ,
     userId: this.userId
   },{
     $set:{ visible }
   });
 },

 'links.trackVisit'(_id){

   new SimpleSchema({
     _id: {
       type: String,
       min: 1
     }
   }).validate({_id});

   Links.update({_id},{
     $set: {
       lastVisitedAt : new Date().getTime()
     },
     $inc: {
       visitedCount : 1
     }
   })
 }

});

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

  //middleware function como las de express
  WebApp.connectHandlers.use((req, res, next) => {

    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if(link){

      res.statusCode = 302;//the content lives temporarely in another location
      res.setHeader('Location',link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);


    }else{
      next();
    }

  });

});

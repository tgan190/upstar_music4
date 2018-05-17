// const _ = require('lodash');
// const Path = require('path-parser');
// const { URL } = require('url');
const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');
// const requireCredits = require('../middlewares/requireCredits');
// const Mailer = require('../services/Mailer');
// const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
require ('../models/Artist');

const Artist = mongoose.model('artist');

module.exports = app => {
  
  app.get('/api/artist', async (req, res) => {
    console.log('in artist route');
    const count = await Artist.count();
        console.log('count = ', count);
   const artist1 = await new Artist({name: 'Howard'});
   artist1.save()
   .then (newArtist => console.log(newArtist));
  });

  app.get('/api/artist-all', async (request, response) => {
    console.log('in artist-all route');
    const count = await Artist.count();
        console.log('count = ', count);

    Artist.find({}, (err, res) => {
      if (err) return next(err);
      // console.log('res from find = ',res);
      response.json(res);
    });
   
  });

  // post, not get
  app.post('/api/artist/new', async (request, response) => {
    console.log('api/new');
    // console.log('api request: ',request);
    console.log('api request body: ',request.body);
    const {name, age, yearsActive, genre} = request.body;
    const artist_req = {
      name: name,
      age: parseInt(age,10),
      yearsActive: parseInt(yearsActive,10),
      genre: genre
    }
    // response.json({name: "Jenny"});
    const artist2 = await new Artist(artist_req);
    artist2.save().then(res => {
      console.log('IN api, after save',res);
      response.json(res);
    })
    
    // const count = await Artist.count();
    //     console.log('count = ', count);

    // Artist.find({}, (err, res) => {
    //   if (err) return next(err);
    //   console.log('res from find = ',res);
    //   response.json(res);
    // });
   
  });

  app.delete('/api/artist/delete', async (request, response, next) => {
    const { _id } = request.query;
    console.log('_id =',_id);
    
    await Artist.remove({_id: _id}, (err, res) => {
      if (err) return next(err);
      console.log('In api, res from Artist.remove = ',res);
      response.json(res);
    });
  });

  app.put('/api/artist/update', async (request, response, next) => {
    const { _id } = request.query;
    console.log('In server api, _id =',_id);
    console.log('In server api update, request.body = ',request.body);
    // const { _id } = request.body;
    // console.log('_id =',_id);
    
    await Artist.update({_id: _id}, request.body, (err, res) => {
      if (err) return next(err);
      console.log('In server api update, res = ',res);
      response.json(res);
    });
  });

  app.put('/api/artist/set-retired', async (request, response, next) => {
    // const { _id } = request.query;
   
    // const { _ids } = request.body;
    // console.log('_id =',_id);
    // console.log('In server api set-retired, _ids =',_ids);
    // _ids is undefined, since the array is sent directly as an array 
    // and not within an object.
   // console.log('In server api set-retired, request.body = ',request.body);
   // console.log('In server api set-retired, request.body[0] = ',request.body[0]);
   //  const _ids_ary = JSON.parse(request.body);
    await Artist.updateMany({_id: {$in: request.body}}, {$set: {retired: true}}, 
      (err, res) => {
      if (err) return next(err);
      console.log('In server api set-retired, res = ',res);
      response.json(res);
    });
  });

  app.put('/api/artist/set-unretired', async (request, response, next) => {
    // const { _id } = request.query;
   
    // const { _ids } = request.body;
    // console.log('_id =',_id);
    // console.log('In server api set-retired, _ids =',_ids);
    // _ids is undefined, since the array is sent directly as an array 
    // and not within an object.
   // console.log('In server api set-unretired, request.body = ',request.body);
   // console.log('In server api set-unretired, request.body[0] = ',request.body[0]);
   //  const _ids_ary = JSON.parse(request.body);
    await Artist.updateMany({_id: {$in: request.body}}, {$set: {retired: false}}, 
      (err, res) => {
      if (err) return next(err);
      console.log('In server api set-unretired, res = ',res);
      response.json(res);
    });
  })

  app.get('/api/artist/age-range', (request, response, next) => {
    
    // console.log('In server api age-range, request.body = ',request.body);

    // Artist.find({}, (err, res) => {
      // if (err) return next(err);
      // console.log('res from find = ',res);
      // console.log('before sending back response for age range');
      // response.json(res);
      minAgeP = Artist.find({}, 'age', {sort: {age:1}, limit:1},
      (err, res ) => res[0].age);
      maxAgeP = Artist.find({}, 'age', {sort: {age:-1}, limit:1},
      (err, res ) => res[0].age);
      Promise.all ([minAgeP, maxAgeP])
      .then ( values => {
        console.log('values for age: ',values);
        minAge = values[0][0].age;
        maxAge = values[1][0].age;
        console.log('minAge =',minAge);
        console.log('maxAge =',maxAge);
        response.json({min: minAge, max: maxAge});
         // response.json({min: 20, max:70});
      });
     
    // });
       
  });

  app.get('/api/artist/years-active-range', (request, response, next) => {
    
      minYearsActiveP = Artist.find({}).sort({yearsActive:1}).limit(1)
      .then(artists => {
        console.log('artist 0 min yearsActive',artists[0].yearsActive);
        return artists[0].yearsActive;
      });
      maxYearsActiveP = Artist.find({}).sort({yearsActive:-1}).limit(1)
       .then(artists => {
         console.log('artist 0 max yearsActive',artists[0].yearsActive);
         return artists[0].yearsActive;
         });

      Promise.all ([minYearsActiveP, maxYearsActiveP])
      .then ( values => 
        {console.log('values: in YearsActive ',values);
        minYearsActive = values[0];
        maxYearsActive = values[1];
        console.log('minYearsActive =',minYearsActive);
        console.log('maxYearsActive =',maxYearsActive);
        response.json({min: minYearsActive, max: maxYearsActive});
      //    // response.json({min: 20, max:70});
     });     
  });

  app.get('/api/artist/search', (request, response, next) => {
    
    const {sortProperty, xlimit, criteria, offset} = request.query;
    // console.log('criteria = ',criteria);
    // console.log('criteria.name = ', criteria.name);
    const criteriaJS = JSON.parse(criteria);
    console.log('criteriaJS ', criteriaJS);
    // console.log('criteriaJS.name = ',criteriaJS.name);
    // console.log('criteriaJS.age = ',criteriaJS.age);
    // console.log('criteriaJS.age.max = ',criteriaJS.age.max);
    // console.log('criteriaJS.age.min = ',criteriaJS.age.min);

    let criteria_x = {};
    if (criteriaJS.name) {
      // criteria_x.name = criteriaJS.name;
      criteria_x.$text = {$search: criteriaJS.name};
      console.log('In name, criteria_x',criteria_x);
    };
    if (criteriaJS.age) {
        criteria_x.age = {$lte: criteriaJS.age.max, $gte: criteriaJS.age.min };
        console.log('In age, criteria_x.age', criteria_x.age);
        // criteria_x.age = Object.assign({}, criteriaJS.age);
    };
    if (criteriaJS.yearsActive) {
        criteria_x.yearsActive = {$lte: criteriaJS.yearsActive.max, $gte: criteriaJS.yearsActive.min };
        console.log('In yearsActive, criteria_x.yearsActive', criteria_x.yearsActive);
      // criteria_x.yearsActive = Object.assign({}, criteriaJS.yearsActive);
    }
    console.log('criteria_x',criteria_x);
    artistsP = Artist.find(criteria_x).sort({[sortProperty]:1}).limit(parseInt(xlimit,10))
    .skip(parseInt(offset));
    //   console.log('artists - search api',artists);
    //   return artists;
    // });
    artists_totalP = Artist.find(criteria_x).count();
    Promise.all ([artistsP, artists_totalP])
    // Promise.all ([artistsP, artists_totalP])
    .then ( values => {
      console.log('values: in search api ',values);
      response.json({artists: values[0], count: values[1]});
      // response.json({min: 20, max:70});
    });     
  });


  app.get('/api/artist/:_id', (request, response, next) => {
    const { _id } = request.params;
    console.log('_id =',_id);
    
    Artist.findOne({_id: _id}, (err, res) => {
      if (err) return next(err);
      // console.log('res from Artist.findOne = ',res);
      response.json(res);
    });
  });

  // app.get('/api/artist/agerange',  (request, response) => {
  //    // response.json({min:10, max:60});
  //    response.json({name: "Howard2"});
  // });

};
//     res.send(surveys);
//   });

//   app.get('/api/surveys/:surveyId/:choice', (req, res) => {
//     res.send('Thanks for voting!');
//   });

//   app.post('/api/surveys/webhooks', (req, res) => {
//     const p = new Path('/api/surveys/:surveyId/:choice');

//     _.chain(req.body)
//       .map(({ email, url }) => {
//         const match = p.test(new URL(url).pathname);
//         if (match) {
//           return { email, surveyId: match.surveyId, choice: match.choice };
//         }
//       })
//       .compact()
//       .uniqBy('email', 'surveyId')
//       .each(({ surveyId, email, choice }) => {
//         Survey.updateOne(
//           {
//             _id: surveyId,
//             recipients: {
//               $elemMatch: { email: email, responded: false }
//             }
//           },
//           {
//             $inc: { [choice]: 1 },
//             $set: { 'recipients.$.responded': true },
//             lastResponded: new Date()
//           }
//         ).exec();
//       })
//       .value();

//     res.send({});
//   });

//   app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
//     const { title, subject, body, recipients } = req.body;

//     const survey = new Survey({
//       title,
//       subject,
//       body,
//       recipients: recipients.split(',').map(email => ({ email: email.trim() })),
//       _user: req.user.id,
//       dateSent: Date.now()
//     });

//     // Great place to send an email!
//     const mailer = new Mailer(survey, surveyTemplate(survey));

//     try {
//       await mailer.send();
//       await survey.save();
//       req.user.credits -= 1;
//       const user = await req.user.save();

//       res.send(user);
//     } catch (err) {
//       res.status(422).send(err);
//     }
//   });
// };

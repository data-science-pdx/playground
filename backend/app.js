var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var express = require('express');
var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

var app = express(); 
const hostname = '0.0.0.0';
const port = process.env.PORT;

app.use(cors());

const connectionString = "mongodb+srv://admin:admin@cluster0.k7yg4.mongodb.net/freeway?retryWrites=true&w=majority";
mongoose.connect(connectionString, {useNewUrlParser: true});
var uniondataSchema = new mongoose.Schema({
    detectorid:Number,
    starttime:Date,
    volume:Number,
    speed:Number,
    occupancy:Number,
    status:Number,
    dqflags:String,
    highwayid:Number,
    milepost:Number,
    locationtext:String,
    detectorclass:Number,
    lanenumber:Number,
    stationid:Number,
    upstream:Number,
    downstream:Number,
    stationclass:Number,
    numberlanes:Number,
    latlon:String,
    length:Number,
    shortdirection:String,
    direction:String,
    highwayname:String
})
var uniondata = mongoose.model('uniondata',uniondataSchema,'uniondata');

async function traveltime(pipline2) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var travelresult = await uniondata.aggregate(pipline2);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(travelresult);
    return travelresult
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

mongoose.connect(connectionString, {useNewUrlParser: true});
var detectorsSchema = new mongoose.Schema({
    detectorid:Number,
    highwayid:Number,
    milepost:Number,
    locationtext:String,
    detectorclass:Number,
    lanenumber:Number,
    stationid:Number,
    upstream:Number,
    downstream:Number,
    stationclass:Number,
    numberlanes:Number,
    latlon:String,
    length:Number,
    shortdirection:String,
    direction:String,
    highwayname:String
})
var detectors = mongoose.model('detectors',detectorsSchema,'detectors');

mongoose.connect(connectionString, {useNewUrlParser: true});
var stationsummarySchema = new mongoose.Schema({
    detectorid:Number,
    milepost:Number,
    locationtext:String,
    numberlanes:Number,
    latlon:String,
    length:Number,
    shortdirection:String,
    direction:String,
    highwayname:String
})
var stationsummary = mongoose.model('stationsummary',stationsummarySchema,'stationsummary');


mongoose.connect(connectionString, {useNewUrlParser: true});
var loopdataSchema = new mongoose.Schema({
    detectorid:Number,
    starttime:Date,
    volume:Number,
    speed:Number,
    occupancy:Number,
    status:Number,
    dqflags:String
})
var loopdata = mongoose.model('loopdata',loopdataSchema,'loopdata');


mongoose.connect(connectionString, {useNewUrlParser: true});
var stationsSchema = new mongoose.Schema({
    milepost:Number,
    locationtext:String,
    stationid:Array,
    upstream:Number,
    downstream:Number,
    numberlanes:Number,
    latlon:String,
    length:Number,
})
var stations = mongoose.model('stations',stationsSchema,'stations');

mongoose.connect(connectionString, {useNewUrlParser: true});
var highwaydataSchema = new mongoose.Schema({
    detector_id:Number,
    starttime:Date,
    volume:Number,
    speed:Number,
    traveltime:Number
})
var highwaydata = mongoose.model('highwaydata',highwaydataSchema,'highwaydata');


mongoose.connect(connectionString, {useNewUrlParser: true});
var highwaystationsSchema = new mongoose.Schema({
    milepost:Number,
    locationtext:String,
    stationid:Number,
    length:Number,
    detectors:[{
      detectorid:Number,
      lanenumber:Number,
    }]
})
var highwaystations = mongoose.model('highwaystations',highwaystationsSchema,'highwaystations');

async function traveltime(pipline2) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var travelresult = await uniondata.aggregate(pipline2);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(travelresult);
    return travelresult
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}
  
async function lationInfo(pipline) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var lation = await uniondata.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(lation);
    return lation
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function getStationInformation(pipline) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var station = await detectors.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(station);
    return station
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function calculateVolume(pipline) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var volumeresult = await uniondata.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(volumeresult);
    return volumeresult
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function calculateOverSpeed(pipline) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var speedresult = await uniondata.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(speedresult);
    return speedresult
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function stationTable(pipline) {
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await stationsummary.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}


async function getTravelTime(req,res){
  var pipline1;
  var pipline2;
  var location = req.params.location;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${starttime}`)
  console.log(`location :${location}`)

  pipline1= [
    {'$match':{"detectorInfor.locationtext":"Foster NB"}},
        {'$group': {
            "_id":{"detectorid":"$detectorid"},
            'uniqueIds': {'$addToSet': "$_id"},
            'count': {'$sum': 1}
            }
        },
        {'$match': { 
            'count': {"$gt": 1}
            }
        },
        {'$sort': {
            'count': -1
            }
        },
        {'$project':{"_id":"$_id"}}
  ]

  
  pipline2= [
      {'$match':{"detectorInfor.locationtext":location}},
      {'$match':{"starttime":{'$gt':starttime,'$lt':endtime}}},
      {'$group':{
          "_id":{"detectorid":"$detectorid"},
          "totalvolume":{'$sum':"$volume"},
          "totalspeed":{'$sum':"$speed"},
          "length":{'$max':"$detectorInfor.length"}
      }},
        {'$project':{"traveltime": {"$multiply":[{ "$divide": [ { "$multiply": ["$length","$totalvolume"] }, "$totalspeed" ] },3600]}}}
  ]
  //detectorId(pipline1);
  let result = traveltime(pipline2)
  return result;
}


async function getStationLocation(req,res){
  var pipline;
  var location = req.params.location;

  pipline= [
    {'$match':{"detectorInfor.locationtext":location}}, 
    {'$group': {
        "_id":{"latlon":"$detectorInfor.latlon"},
        'uniqueIds': {'$addToSet': "$_id"},
        'count': {'$sum': 1}
        }
    },
    {'$match': { 
        'count': {"$gt": 1}
        }
    },
    {'$sort': {
        'count': -1
        }
    },   
    {'$project':{"latlon":"$detectorInfor.latlon"}}
  ]
  let lationresult = lationInfo(pipline)
  return lationresult
}


async function getStationGeneralInfor(req,res){
  var piplineStation;

  piplineStation= [
    {'$group': {
        "_id":{
          "latlon":"$latlon",
          "length":"$length",
          "milepost":"$milepost",
          "locationtext":"$locationtext",
          "numberlanes":"$numberlanes",
          "shortdirection":"$shortdirection",
          "direction":"$direction",
          "highwayname":"$highwayname",
      },
        'uniqueIds': {'$addToSet': "$_id"},
        'count': {'$sum': 1}
        }
    },
    {'$match': { 
        'count': {"$gt": 1}
        }
    },
    {'$sort': {
        'count': -1
        }
    },   
    {'$project':{
        "latlon":"$latlon",
        "length":"$length",
        "milepost":"$milepost",
        "locationtext":"$locationtext",
        "numberlanes":"$numberlanes",
        "shortdirection":"$shortdirection",
        "direction":"$direction",
        "highwayname":"$highwayname",
      }
    }
  ]
  let sationInfor = getStationInformation(piplineStation)
  return sationInfor
  
}

async function getStationVolume(req,res){
  var piplineVolume;
  var location = req.params.location;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${starttime}`)
  console.log(`location :${location}`)

  piplineVolume= [
    {'$match':{"detectorInfor.locationtext":location}},
    {'$match':{"starttime":{'$gt':starttime,'$lt':endtime}}},
    {'$group':{
        "_id":{"detectorid":"$detectorid"},
        "totalvolume":{'$sum':"$volume"}
    }},
      {'$project':{"totalvolume":1}}
]
  let volumeResult = calculateVolume(piplineVolume)
  return volumeResult
  
}

async function getOverSpeedXXXX(req,res){
  var piplineSpeed;
  var location = req.params.location;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${req.params.starttime}`)
  console.log(`End time :${req.params.endtime}`)
  console.log(`location :${location}`)

  piplineSpeed= [
    {'$match':{"detectorInfor.locationtext":location}},
    {'$match':{"starttime":{'$gt':starttime,'$lt':endtime}}},
    {'$match':{"speed":{'$gt':60}}},
    {'$group':{
      "_id":{"detectorid":"$detectorid"},
      "overspeednumber":{'$sum':1}
    }},
]
  let overSpeed = calculateOverSpeed(piplineSpeed)
  return overSpeed
  
}

async function getStationDetails(req,res){
  var piplineDetails;
  var location = req.params.location;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  piplineDetails={"locationtext":location}
  let detailsResult = await stations.find(piplineDetails)
  return detailsResult
  
}


async function stationNameToId(req,res){
  var piplineDetails;
  var location = req.params.location;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  //piplineDetails= [{'$match':{"locationtext":location}}];
  piplineDetails= {"locationtext":location};
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    console.log(`what's the pip;ine ${JSON.stringify(piplineDetails)}`)
    //var result = await stations.aggregate(piplineDetails);
    var result = await stations.find(piplineDetails);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}


async function getAllStationsName(req,res){

  var piplineDetails;
  piplineDetails= {}
  console.log(`piplie value ${JSON.stringify(piplineDetails)}`)
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaystations.find(piplineDetails);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}


async function getOverSpeed(req,res){
  var piplineSpeed;
  var starttime;
  var endtime;
  var idlist = req.params.idlist.split(",").map(x=>Number(x));
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${req.params.starttime}`)
  console.log(`End time :${req.params.endtime}`)
  console.log(`idlist :${idlist}`)

  piplineSpeed= [
    {'$match':{"$and":[{"starttime":{'$gt':starttime,'$lt':endtime}},{"detectorid":{"$in":idlist}},{"speed":{'$gt':60}}]}},
    {'$group':{
      "_id":{"detectorid":"$detectorid"},
      "overspeednumber":{'$sum':1}
    }},
  ]
  console.log(`show me the piplie ${JSON.stringify(piplineSpeed)}`)
  let overSpeed = calculateOverSpeed(piplineSpeed)
  return overSpeed
}

async function speedAndVolume(req,res){
  var pipline;
  var location = req.params.location;
  var starttime;
  var endtime;
  var idlist = req.params.idlist.split(",").map(x=>Number(x));
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${starttime}`)
  console.log(`location :${location}`)
  console.log(`idlist :${idlist}`)
  
  pipline= [
      {'$match':{"detectorid":{"$in":idlist}}},
      {'$match':{"starttime":{'$gt':starttime,'$lt':endtime}}},
      {'$group':{
          "_id":{"detectorid":"$detectorid"},
          "totalvolume":{'$sum':"$volume"},
          "totalspeed":{'$sum':"$speed"},
      }}
  ]
  //detectorId(pipline1);
  console.log(`piplie : ${JSON.stringify(pipline)}`)

  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await loopdata.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function findSpeedLess(req,res){
  var piplineSpeed;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${req.params.starttime}`)
  console.log(`End time :${req.params.endtime}`)

  piplineSpeed= [
    {'$match':{"$and":[{"starttime":{'$gte':starttime,'$lt':endtime}},{"speed":{'$lt':5}}]}},
    {'$group':{
      "_id":{"detector_id":"$detector_id"},
      "totalnumber":{'$sum':1}
    }},
    { '$sort': { "totalnumber": -1 } }
  ]
  console.log(`show me the piplie ${JSON.stringify(piplineSpeed)}`)
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaydata.aggregate(piplineSpeed);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function findSpeedGreater(req,res){
  var piplineSpeed;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${req.params.starttime}`)
  console.log(`End time :${req.params.endtime}`)

  piplineSpeed= [
    {'$match':{"$and":[{"starttime":{'$gte':starttime,'$lt':endtime}},{"speed":{'$gt':80}}]}},
    {'$group':{
      "_id":{"detector_id":"$detector_id"},
      "totalnumber":{'$sum':1}
    }},
    { '$sort': { "totalnumber": -1 } }
  ]
  console.log(`show me the piplie ${JSON.stringify(piplineSpeed)}`)
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaydata.aggregate(piplineSpeed);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function findGoodSpeed(req,res){
  var piplineSpeed;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${req.params.starttime}`)
  console.log(`End time :${req.params.endtime}`)

  piplineSpeed= [
    {'$match':{"$and":[{"starttime":{'$gte':starttime,'$lt':endtime}},{"speed":{'$lt':80,'$gt':5}}]}},
    {'$group':{
      "_id":{"detector_id":"$detector_id"},
      "totalnumber":{'$sum':1}
    }},
    { '$sort': { "totalnumber": -1 } }
  ]
  console.log(`show me the piplie ${JSON.stringify(piplineSpeed)}`)
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaydata.aggregate(piplineSpeed);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function basedOnIdGetStation(req,res){
  var pipline;
  var idlist = req.params.idlist.split(",").map(x=>Number(x));
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  console.log(`ID :${req.params.idlist}`)

  pipline= {"detectors.detectorid":{"$in":idlist}}
  console.log(`show me the piplie ${JSON.stringify(pipline)}`)
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaystations.find(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}


async function speedAndVolumeAndTravelTime(req,res){
  var pipline;
  var starttime;
  var endtime;
  var idlist = req.params.idlist.split(",").map(x=>Number(x));
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${starttime}`)
  console.log(`idlist :${idlist}`)
  
  pipline= [
      {'$match':{"detector_id":{"$in":idlist}}},
      {'$match':{"starttime":{'$gte':starttime,'$lt':endtime}}},
      {'$group':{
          "_id":{"detector_id":"$detector_id"},
          "totalvolume":{'$sum':"$volume"},
          "totalspeed":{'$sum':"$speed"},
          "totaltraveltime" :{'$sum':"$traveltime"} 
      }}
  ]
  //detectorId(pipline1);
  console.log(`piplie : ${JSON.stringify(pipline)}`)

  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaydata.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

async function findSpeedNull(req,res){
  var piplineSpeed;
  var starttime;
  var endtime;
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${req.params.starttime}`)
  console.log(`End time :${req.params.endtime}`)

    piplineSpeed= [
      {'$match':{"$and":[{"starttime":{'$gte':starttime,'$lt':endtime}},{"speed":null}]}},
      {'$group':{
        "_id":{"detector_id":"$detector_id"},
        "totalnumber":{'$sum':1}
      }},
      { '$sort': { "totalnumber": -1 } }
    ]
  console.log(`show me the piplie ${JSON.stringify(piplineSpeed)}`)
  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaydata.aggregate(piplineSpeed);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}


async function speedDaily(req,res){
  var pipline;
  var starttime;
  var endtime;
  var idlist = req.params.idlist.split(",").map(x=>Number(x));
  console.log(`Before the if check the req.query, is req null, ${req==null}, is req.query null: ${req.params == null}`)
  if (req && req.params && req.params.starttime && req.params.endtime){
    starttime = new Date(req.params.starttime);
    endtime = new Date(req.params.endtime);
  }
  console.log(`start time :${starttime}`)
  console.log(`idlist :${idlist}`)
  
  pipline= [
      {'$match':{"detector_id":{"$in":idlist}}},
      {'$match':{"starttime":{'$gte':starttime,'$lt':endtime}}}
  ]
  //detectorId(pipline1);
  console.log(`piplie : ${JSON.stringify(pipline)}`)

  try {
    //var detectoridresult = await uniondata.aggregate(pipline1).exec();
    var result = await highwaydata.aggregate(pipline);
    // var idTest = JSON.parse(JSON.stringify(detectoridresult));
    // console.log(idTest);
    // console.log(idTest[0]._id.detectorid);
    console.log(result);
    return result
  } catch (err) {
      console.log(`error occured : ${err}`);
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//getTravelTime(req,res)
app.get("/traveltime/:location/:starttime?/:endtime?",async(req, res,next)=>{
    //getTravelTime(req,res)
    res.send(await getTravelTime(req,res))
  });

  //Station lation(req,res)
app.get("/lat/:location",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await getStationLocation(req,res))
}));

//All the station name
app.get("/station",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await getStationGeneralInfor(req,res))
}));

//get styation details
app.get("/details/:location",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await getStationDetails(req,res))
}));

// Get all the id station volume
app.get("/volume/:location/:starttime?/:endtime?",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await getStationVolume(req,res))
}));

//Get total average speed and total volume
app.get("/sv/:location/:idlist/:starttime?/:endtime?",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await speedAndVolume(req,res))
}));



// Over speed in one station in period time 
app.get("/speed/:idlist/:starttime?/:endtime?",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await getOverSpeed(req,res))
}));

//Convert all the station name into ID
app.get("/id/:location",cors(),asyncHandler(async(req, res,next)=>{
  res.send(await stationNameToId(req,res))
}));

//All the station name
app.get("/stationname",async(req, res,next)=>{
  res.send(await getAllStationsName(req,res))
});

app.get("/lessthenfive/:starttime?/:endtime?",async(req, res,next)=>{
  res.send(await findSpeedLess(req,res))
});

app.get("/greaterthen/:starttime?/:endtime?",async(req, res,next)=>{
  res.send(await findSpeedGreater(req,res))
});

app.get("/goodspeed/:starttime?/:endtime?",async(req, res,next)=>{
  res.send(await findGoodSpeed(req,res))
});


app.get("/:idlist",async(req, res,next)=>{
  res.send(await basedOnIdGetStation(req,res))
});

app.get("/detailssummary/:idlist/:starttime?/:endtime?",async(req, res,next)=>{
  res.send(await speedAndVolumeAndTravelTime(req,res))
});

app.get("/null/:starttime?/:endtime?",async(req, res,next)=>{
  res.send(await findSpeedNull(req,res))
});

app.get("/speeddaily/:idlist/:starttime?/:endtime?",async(req, res,next)=>{
  res.send(await speedDaily(req,res))
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
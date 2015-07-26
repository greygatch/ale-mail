var express = require('express')
  , app = express()
  , BreweryDb = require("brewerydb-node")
  , brewdb = new BreweryDb('cd8bebc7e8174e11971635b9de526b79');

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.get('/beer-name/:name', function(req, res){

  var returnData;

  brewdb.beer.find({ withBreweries: "N", name: req.params.name }, function(err, response){
    if(err){ res.status(400); }

    if(!response){
      brewdb.beer.find({ withBreweries: "N", name: req.params.name + '*' }, function(err, data){
        returnData = data;
        res.json(returnData);
      });
    }
    if (response){
      res.json(response)
    }
    console.log('test');
  });
})
app.get('/beer-style/:style', function(req, res){

  brewdb.style.find({name: req.params.style }, function(err, response){
    if(err){ res.status(400); }

    if(!response){
      brewdb.beer.find({name: req.params.category + '*' }, function(err, data){
        returnData = data;
        res.json(returnData);
      });
    }
    if (response){
      res.json(response)
    }
    console.log('test');
  });
})

app.get('/', function(req, res){
  res.render('index')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('-------------------------')
  console.log('Listening on port 3000...')
  console.log('-------------------------')
})

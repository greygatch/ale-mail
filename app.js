var express = require('express')
  , app = express();

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('-------------------------')
  console.log('Listening on port 3000...')
  console.log('-------------------------')
})

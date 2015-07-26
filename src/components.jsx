var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

// brewdb.beer.getById("avMkil", {}, function(err, response){
//  console.log(response)
// });

var App = React.createClass({
  render () {
    return (
      <div>
        <RouteHandler/>
      </div>
    )
  }
});


var Card = React.createClass({
  render: function(){
    return(
      <div className='col-xs-4 col-xs-offset-4 bootcamp'>

      </div>
    )
  }
})

var Main = React.createClass({
  getInitialState: function() {
    return {}
  },

  loadServerData: function(){
    var app = this;
  },
  componentWillMount: function() {
    this.loadServerData();
  },

  render: function(){
    return (
      <div>
        Test
      </div>
    )
  }
})

var routes = (
  <Route handler={App}>
    <Route name="bootcamp" path="bootcamp/beer/:code" handler={Main}/>
    <Route path="/" handler={Main}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById("react-root"));
});

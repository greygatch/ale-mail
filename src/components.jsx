var React = require("react");
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var RouteHandler = Router.RouteHandler;

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
    var dasherizedName = this.props.bootcamp.name.toLowerCase().split(' ').join('-');
    return(
      <div className='col-xs-4 col-xs-offset-4 bootcamp'>
        <h3>{this.props.index + 1}. <Link to="bootcamp" params={{code: dasherizedName}}>{this.props.bootcamp.name}</Link></h3>
        <h3>{this.props.bootcamp.address}</h3>
        <img className='logo' src={this.props.bootcamp.imageUrl}></img>
        <h3>${this.props.bootcamp.price}</h3>
        <h3>{this.props.bootcamp.languages}</h3>
      </div>
    )
  }
})
var NavBarComponent = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
});

var OneBootCamp = React.createClass({
  getInitialState: function(){
    return {bootcamp: {}}
  },
  loadServerData: function(){
    var bootcamp;
    var app = this;
    $.get('http://bootcampapi.herokuapp.com/bootcamps/name/' + this.props.params.code, function(result) {
      bootcamp = result;
      console.log(bootcamp);
      app.setState({bootcamp: bootcamp});
    });
  },
  componentWillMount: function(){
    this.loadServerData();
  },
  render () {
    var bootcamp = this.state.bootcamp;
    // city, country, housing, duration, typicalDay, imageUrl, founded, email, url
    return (
      <div className='col-xs-6 col-xs-offset-3 bootcamp'>
        <h6><Link to="/">Go Back</Link></h6>
        <h1>{bootcamp.name}</h1>
        <img src={bootcamp.imageUrl}></img>
        <h3>{bootcamp.price}</h3>
        <h3>{bootcamp.city}, {bootcamp.country}</h3>
        <h3>Founded in {bootcamp.founded}</h3>
        <h3>{bootcamp.languages}</h3>
        <h3>{bootcamp.typicalDay}</h3>
        <h3>{bootcamp.uniqueOffer}</h3>
        <h3>Duration: {bootcamp.duration}</h3>

        <h4><a href={'mailto:' + bootcamp.email}>Email</a></h4>
        <h4><a href={bootcamp.url}>Website</a></h4>
      </div>
    )
  }
});

var LanguageSelectComponent = React.createClass({
  getInitialState: function(){
    return {
      js: false,
      ruby: false,
      python: false,
      php: false,
      java: false
    }
  },
  updateLanguages: function(){
    var js = React.findDOMNode(this.refs.js).checked;
    var ruby = React.findDOMNode(this.refs.ruby).checked;
    var python = React.findDOMNode(this.refs.python).checked;
    var php = React.findDOMNode(this.refs.php).checked;
    var java = React.findDOMNode(this.refs.java).checked;
    this.setState({
      js: js,
      ruby: ruby,
      python: python,
      php: php,
      java: java
    })
  },
  render: function(){
    return(
      <div className='col-xs-4 col-xs-offset-4 checkboxes'>
        <form className='form-control'>
          <label>JavaScript</label>
          &nbsp;
          <input type='checkbox' ref='js' onChange={this.updateLanguages}></input>
          &nbsp;
          <label>Ruby</label>
          &nbsp;
          <input type='checkbox' ref='ruby' onChange={this.updateLanguages}></input>
          &nbsp;
          <label>Python</label>
          &nbsp;
          <input type='checkbox' ref='python' onChange={this.updateLanguages}></input>
          &nbsp;
          <label>PHP</label>
          &nbsp;
          <input type='checkbox' ref='php' onChange={this.updateLanguages}></input>
          &nbsp;
          <label>Java</label>
          &nbsp;
          <input type='checkbox' ref='java' onChange={this.updateLanguages}></input>

          <button className='btn btn-xs btn-info pull-right' onClick={this.props.searchByLanguage.bind(null, this, this.state)}>Search by Language</button>
        </form>
      </div>
    )
  }
})

var PriceChooseComponent = React.createClass({
  getInitialState: function() {
    return {valueMin: 500, valueMax: 10000};
  },
  priceMinFunction: function(){
    var minValue = event.target.value;
    this.setState({valueMin: minValue});
  },
  priceMaxFunction: function(){
    var maxValue = event.target.value;
    this.setState({valueMax: maxValue});
  },
  render: function(){
    return (
      <div className='priceRange'>
        <form className='form'>
          <div className='col-xs-1 col-xs-offset-5'>
            <input type='range' min='0' max='1000' step='50' value={this.state.valueMin} ref='min' onChange={this.priceMinFunction}></input>
            <h5>Min: ${this.state.valueMin}</h5>
          </div>
          <div className='col-xs-1'>
            <input type='range' min='5000' max='20000' step='50' value={this.state.valueMax} ref='max' onChange={this.priceMaxFunction}></input>
            <h5>Max: ${this.state.valueMax}</h5>
          </div>
          <div className='col-xs-2'>
            <button className='btn btn-xs btn-info' onClick={this.props.searchByPrice.bind(null, this, [this.state.valueMin, this.state.valueMax])}>Search By Price</button>
          </div>
        </form>
      </div>
    )
  }
});

var SearchBarComponent = React.createClass({
  getInitialState: function(){
    return {text: ''}
  },
  updateText: function(){
    var searchBar = React.findDOMNode(this.refs.searchBar);
    this.setState({text: searchBar.value});
  },
  render: function(){
    return(
      <div>
        <div className='col-xs-3 col-xs-offset-4'>
          <form className='form'>
            <input className='form-control' ref='searchBar' placeholder='search...' onChange={this.updateText}></input>
          </form>
        </div>
        <div className='col-xs-2'>
          <button className='btn btn-info' onClick={this.props.filterCamps.bind(null, this, this.state.text)}>Search</button>
          <button className='btn btn-danger' onClick={this.props.resetCamps}>Reset</button>
        </div>
      </div>
    )
  }
});

var SearchButtonComponent = React.createClass({
  render: function(){
    return (
      <div className='searchButtons'>
        <button className='col-xs-2 col-xs-offset-3 btn btn-success' onClick={this.props.sortPrice}>Sort By Price</button>
        <button className='col-xs-2 btn btn-warning' onClick={this.props.sortLocation} >Sort By Location</button>
        <button className='col-xs-2 btn btn-primary' onClick={this.props.sortName} >Sort By Name</button>
      </div>
    )
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {bootcamps: [], ogBootcamps: [], reverseNames: false, reversePrices: false}
  },

  loadServerData: function(){
    var isBootcamps = this.state.bootcamps.length;
    if(isBootcamps){
      return this.state.ogBootcamps;
    }
    var bootcamps;
    var app = this;
    $.get('http://bootcampapi.herokuapp.com/bootcamps', function(result) {
      bootcamps = result;
      app.setState({bootcamps: bootcamps, ogBootcamps: bootcamps});
    });
  },
  componentWillMount: function() {
    this.loadServerData();
  },
  filterCamps: function(input){
    input = input.state.text;
    var bootcamps = this.state.bootcamps.filter(function(e, i){
      var isNameFound = e.name.toLowerCase().indexOf(input) !== -1;
      var isLanguageFound;
      var languageString = '';

      e.languages.map(function(l){
        languageString += l.toLowerCase().trim();
      });
      isLanguageFound = languageString.indexOf(input) !== -1

      return isNameFound || isLanguageFound;
    })
    bootcamps = !input ? this.state.ogBootcamps : bootcamps;
    this.setState({bootcamps: bootcamps});
  },
  searchByLanguage: function(component){
    var languages = Object.keys(component.state).filter(function(e){
      return component.state[e];
    });
    var bootcamps = this.state.bootcamps.filter(function(bootcamp){
      var bootcampLanguages = bootcamp.languages.map(function(l){
        return l.toLowerCase().trim();
      });
      console.log(bootcampLanguages);
      var match = true;
      languages.forEach(function(e){
        if(bootcampLanguages.indexOf(e) === -1){
          match = false;
        }
      })
      return match ? bootcamp : false;
    });
    this.setState({bootcamps: bootcamps});
  },
  searchByPrice: function(component, prices){
    var minPrice = prices[0];
    var maxPrice = prices[1];
    console.log('[min, max]', prices);
    var bootcamps = this.state.bootcamps.filter(function(bootcamp){
      return parseFloat(bootcamp.price) >= minPrice && parseFloat(bootcamp.price) <= maxPrice;
    });
    this.setState({bootcamps: bootcamps});
  },
  sortPrice: function(){
    var bootcamps = this.state.bootcamps.sort(function(a,b){
      return parseFloat(a.price) - parseFloat(b.price);
    });
    bootcamps = !this.state.reversePrices ? bootcamps : bootcamps.reverse();
    var isReverse = this.state.reversePrices;
    this.setState({reversePrices: !isReverse, bootcamps: bootcamps})
  },
  sortLocation: function(){
    // buggy
    var bootcamps = this.state.bootcamps.sort(function(a,b){
      return a.location.split(',')[1].trim() > b.location.split(',')[1].trim() ? 1 : -1;
    });
    this.setState({bootcamps: bootcamps});
  },
  sortName:function(){
    var bootcamps = this.state.bootcamps.sort(function(a,b){
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    });
    bootcamps = !this.state.reverseNames ? bootcamps : bootcamps.reverse();
    var isReverse = this.state.reverseNames;
    this.setState({reverseNames: !isReverse, bootcamps: bootcamps})
  },
  resetCamps: function(){
    return this.setState({bootcamps: this.state.ogBootcamps});
  },
  render: function(){
    var bootCampDivs = this.state.bootcamps.map(function(e, i){
      return <Card bootcamp={e} index={i} />
    })
    return (
      <div>
        <NavBarComponent />
        <h1 className='text-center'>Bootcamp Compare</h1>
        <LanguageSelectComponent searchByLanguage={this.searchByLanguage}/>
        <PriceChooseComponent searchByPrice={this.searchByPrice}/>
        <SearchBarComponent filterCamps={this.filterCamps} resetCamps={this.resetCamps}/>
        <SearchButtonComponent sortPrice={this.sortPrice} sortLocation={this.sortLocation} sortName={this.sortName}/>
        {bootCampDivs}
      </div>
    )
  }
})

var routes = (
  <Route handler={App}>
    <Route name="bootcamp" path="bootcamp/:code" handler={OneBootCamp}/>
    <Route path="/" handler={Main}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById("react-root"));
});

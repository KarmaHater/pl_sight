var React = require('react')
var Router = require('react-router');
var routes = require('./routes');
var InitAction = require('./actions/initActions');

InitAction.initApp();

Router.run(routes, function(Handler) {React.render(<Handler/>, document.getElementById('app')) });

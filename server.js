var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

if(process.argv[2] == "-y")	{
new WebpackDevServer(webpack(config),   {
    https: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, process.argv[3], function (err, res)    {
    if(err) {
        return console.error(err);
    }
    console.log('Listening at http://'+ process.argv[3] + ':3000');
});
}
new WebpackDevServer(webpack(config),	{
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(3000, 'localhost', function (err, res)	{
	if(err)	{
	   return console.error(err);
	}
	console.log('Listening at http://localhost:3000');
});

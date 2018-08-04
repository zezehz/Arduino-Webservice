var SerialPort = require('serialport');
var express    = require('express')
var bodyParser = require("body-parser");

var app  = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});


var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});


var str = "";
var objeto = {'umidade':'', 'temperatura':''};

app.use(express.static('public'));


var enviar = function(mensagem) {
    port.write( mensagem, function(err) {
       if (err) {
           return console.log('Erro ao enviar: ', err.message);
       }
       console.log('message written');
   });
}

port.on( 'data', function( data ) {
    str += data.toString( );

    var subStr = str.split('-');

    for( var i = 0; i < subStr.length; i++ ) {
        if( 'humidit' === subStr[i] ) {
	    if( undefined !== subStr[i+1] )
            	objeto.umidade = subStr[ i + 1 ];
	} else if( 'temper' === subStr[i] ) {
	    if( undefined !== subStr[i+1] )
	        objeto.temperatura = subStr[ i + 1 ];
	}
    }

    if( 4 > subStr.length ) {
        str    = new String( );
	subStr = new String( );
    }

    console.log(objeto);
});


app.get('/', function(req, res) {
    res.send('Arduino Webservice')
})


app.post('/infor', function (req, res) {

  var led1 = req.body.led1;
  var led2 = req.body.led2;
  var led3 = req.body.led3;
  var led4 = req.body.led4;
  var msg  = req.body.mensagen;

  var str  = led1+'-'+led2+'-'+led3+'-'+led4+'-'+msg;

   enviar( str );
   console.log(str);
   res.status(200).send( )
   
})


app.get('/dadosTempo', function (req, res) {

    res.status(200).send(objeto);

})

 
app.listen(3000)




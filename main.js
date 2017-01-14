function Client(_ClientName, _ClientIRCode){

    this.clientName             = _ClientName;          // The client name.
    this.clientIRCode           = _ClientIRCode;        // The client IR code.
    this.latestTZ               = "europe-amsterdam";   // The latest time zone.
    this.latestAmountFace       = 0;                    // The latest amount of face   recorded in the database.
    this.latestAmountPitch      = 0.0;                  // The latest amount of pitch  recorded in the database.
    this.latestAmountVolume     = 0.0;                  // The latest amount of volume recorded in the database.
    this.latestIRCode           = [];                   // The latest IR code(s) detected in the database.

    this.latestYear;    // The latest year   taken from the latest updated table in database.
    this.latestMonth;   // The latest month  taken from the latest updated table in database.
    this.latestDay;     // The latest day    taken from the latest updated table in database.
    this.latestHour;    // The latest hour   taken from the latest updated table in database.
    this.latestMinute;  // The latest minute taken from the latest updated table in database.
    this.latestSecond;  // The latest second taken from the latest updated table in database.

    this.jstDelete      = false          // PROTOTYPE, in case this client's node previously deleted.
    this.update         = false;         // PROTOTYPE, whether or not this object is updated or not.
    this.updateChance   = 1.0;           // PROTOTYPE, chance of this client of having inputs.
    var tableClientName = "Client_name"; // PENDING  , this is hard coded please change later.

    var tableCam        = this.clientName + "_cam"; // Table in the database that stores this client data with cam.
    var tableIR         = this.clientName + "_ir";  // Table in the database that stores this client data with ir transceiver.
    var tableMic        = this.clientName + "_mic"; // Table in the database that stores this client data with microphone.

}
Client.prototype.AddCurrLatDate = function(_date){

    this.latestYear         = _date.getFullYear();
    this.latestMonth        = _date.getMonth();
    this.latestDay          = _date.getDate();
    this.latestHour         = _date.getHours();
    this.latestMinute       = _date.getMinutes();
    this.latestSecond       = _date.getSeconds();

}
Client.prototype.AddLatInput = function(_ClientArray){

    this.AddLatInputCam(_ClientArray);
    this.AddLatInputIR(_ClientArray);
    this.AddLatInputMic();

}
Client.prototype.AddLatInputCam = function(_ClientArray){

    this.latestAmountFace = 0;
    for(_c of _ClientArray){ if(_c.ClientName != this.clientName){
        this.latestAmountFace = this.latestAmountFace + 1; } }

}
Client.prototype.AddLatInputIR = function(_ClientArray){

    this.latestIRCode = [];
    for(_c of _ClientArray){ if(_c.ClientName != this.clientName){
        this.latestIRCode.push(_c.ClientName) } }

}
Client.prototype.AddLatInputMic = function(){

    this.latestAmountPitch  = ((Math.random()*5000.0) + 200.0).toFixed(3)
    this.latestAmountVolume = ((Math.random()*0.05) + 0.001).toFixed(3)

}
Client.prototype.AssignUpdateChance = function(){

    var cUC             = CheckUpdateChance(this.update, this.updateChance);
    this.update         = cUC[0];
    this.updateChance   = cUC[1];

}
Client.prototype.ShowLatest = function(){

    console.log(

        FixBoolString(this.update)          + "-" +
        this.latestYear                     +
        FixDateString(this.latestMonth)     +
        FixDateString(this.latestDay)       + "-" +
        FixDateString(this.latestHour)      +
        FixDateString(this.latestMinute)    +
        FixDateString(this.latestSecond)    + "-" +
        this.latestTZ                       + "-" +
        this.clientIRCode                   + "-" +
        this.clientName                     + "-" +
        this.latestAmountFace               + "-" +
        this.latestAmountPitch              + "-" +
        this.latestAmountVolume             + "-" +
        this.latestIRCode

    )

}
Client.prototype.Simulate = function(_date, _ClientArray){

    if(this.update){

        this.AddCurrLatDate(_date);
        this.AddLatInput(_ClientArray);

    }

}





// Function to detect if x second is already passed.
// If each tick is more than 1 second then this
// function is screwed, but that will not happen
// (hopefully).
function DetectChangeInTSecond(_t, _date){

    this.t               = _t;
    this.currSecond      = _date.getSeconds();
    this.currSecondPrev  = this.currSecond;
    this.counter         = 0;
    this.xSecondPassed   = false;

}
DetectChangeInTSecond.prototype.Update = function(_date){

    this.currSecond = _date.getSeconds();
    if(this.currSecond != this.currSecondPrev){

        this.counter ++
        this.currSecondPrev = this.currSecond

    }
    else{ this.xSecondPassed = false; }

    if(this.counter >= this.t){

        this.counter        = 0
        this.xSecondPassed  = true;

        console.log(this.t + " second(s) has passed")

    }

    return this.xSecondPassed;

}





function CheckUpdateChance(_update, _updateChance){

    var random = Math.random();

    //console.log(random);
    //console.log(_updateChance);
    //console.log(random < _updateChance);

    if(random < _updateChance){

        if(_update == false){ _updateChance = 1.0; }
        else{ _updateChance = _updateChance - 0.005; }

        _update = true;

    }
    else if(random > _updateChance){

        if(_update == true){ _updateChance = 0.0; }
        else{ _updateChance = _updateChance + 0.005; }

        _update = false;

    }

    return [_update, _updateChance]

}





// Function to change "true" into "true ".
function FixBoolString(_bool){

    var string = _bool;
    if(_bool == true){ string = " " + string }
    return string

}





// Function to change x into "0x" for x lower than 10.
function FixDateString(_int){

    var string = _int;
    if(_int < 10){ string = "0" + string }
    return string

}





var clientArray           = [];
var clientArrayNameIRCode = [

    ["chris"    , "KEY_1"],
    ["dennet"   , "KEY_2"],
    ["richard"  , "KEY_3"],
    ["sam"      , "KEY_4"]

]
var currDateTime          = new Date();
var dCITS1                = new DetectChangeInTSecond(1, new Date());
var update;





// Initiate all example clientArray objects.
for(e of clientArrayNameIRCode){

    var client = new Client(e[0], e[1]);
    clientArray.push(client);

}





//console.log(clientArray)
//console.log(clientArray[0])
//console.log(clientArray[0].clientArrayName)
//console.log(clientArray[0].clientArrayIRCode)
//
// Testing thread.
//var threadUsed  = 2;
//var thread      = new Multithread(threadUsed);
//Testing thread is sucessful here.
//thread.process(function(_a, _b){ return _a + _b }, function(_return){ console.log(_return); })(1, 2);




window.setInterval(function(){

    console.log("1 second passed");

    for(c of clientArray){ c.AssignUpdateChance(currDateTime) }
    for(c of clientArray){

        c.Simulate(currDateTime, clientArray)
        c.ShowLatest();

        if(!c.update && !c.jstDelete){
            var clientNodeArrayFind = $.grep(clientNodeArray, function(_cN){ return _cN.clientName === c.clientName; });

            clientNodeArrayFind[0].shape
                .transition()
                .style("opacity", 0)
                .duration(500)
                .remove();

            var index = clientNodeArray.indexOf(clientNodeArrayFind[0]);
            if(index > -1){ clientNodeArray.splice(index, 1); }

            var index = clientNodeArrayMoved.indexOf(clientNodeArrayFind[0]);
            if(index > -1){ clientNodeArrayMoved.splice(index, 1); }

            DetermineDegTargArray(clientNodeArray.length);
            for(cN of clientNodeArray){

                cN.RotateAuto();

            }

            c.jstDelete = true;

        }
        else if(c.update && c.jstDelete){

            DetermineDegTargArray(clientNodeArray.length + 1);
            for(cN of clientNodeArray){

                cN.RotateAuto();

            }

            //console.log(degTargArray);
            //console.log(degTargArray[0]);

            new ClientNode(degTargArray[0], c.clientName);

            c.jstDelete = false;

        }

    }

}, 1000);





// Convert degree to radian and vice versa.
Math.degrees        = function(radians){ return radians * (180 / Math.PI); };
Math.radians        = function(degrees){ return degrees * (Math.PI / 180); };

// Easing function.
Math.easeInExpo     = function(t, b, c, d){ return c * Math.pow( 2, 10 * (t/d - 1) ) + b; };
Math.easeOutCubic   = function(t, b, c, d){ t /= d; t--; return c*(t*t*t + 1) + b; };
Math.easeOutSine    = function(t, b, c, d){ return c * Math.sin(t/d * (Math.PI/2)) + b; };

var dim         = { width: 512, height: 512 };                          // How big is the canvas resolution.
var dimSmall    = (dim.width < dim.height) ? dim.width : dim.height;    // Checking the smallest dimension.
var dimTrans    = { x: (dim.width/2), y: (dim.height/2) };              // Translation dimension.
var padding     = (dimSmall/16);                                        // The padding of the main circle.

// The main SVG. This is the main canvas.
var mainSVG = d3.select("body").append("svg")            // The main canvas.
    .attr("height"  , dim.height)                        // The height.
    .attr("width"   , dim.width)                         // The width.
    .style("border" , "2px solid red");                  // This the border only for debugging.

// The main circle.
var mainCircFill            = "none"                     // The main circle has no fill.
var mainCircRad             = (dimSmall/2) - padding;    // The main circle radius is smallest dimension (either the width or the height) minus padding.
var mainCircStroke          = "#008000";                 // The stroke color of the main circle is green.
var mainCircStrokeWdth      = 2;                         // The stroke width of the main circle is 2 pixels.
var mainCirc                = mainSVG.append("circle")
    .attr("cx"              , 0)
    .attr("cy"              , 0)
    .attr("fill"            , "none")
    .attr("r"               , mainCircRad)
    .attr("stroke"          , mainCircStroke)
    .attr("stroke-width"    , mainCircStrokeWdth)
    .attr("transform"       , "translate(" + dimTrans.x + ", " + dimTrans.y + ")");


var clientNodeArray         = []; // All available client node.
var clientNodeArrayMoved    = []; // All client node that is currently being animated and moving.
var degTargArray            = [];
// The client node class.
function ClientNode(_deg, _clientName){

    // Every time a new client node is added put it into the
    // client node main array. In this case the client node main
    // array is `clientArray`.
    clientNodeArray.push(this);

    this.clientName   = _clientName;

    this.deg          = _deg;
    this.degSaved     = this.deg;
    this.degTarg      = this.deg;
    this.cx           = 0 + (mainCircRad * Math.sin(Math.radians(this.deg)));
    this.cy           = 0 + (mainCircRad * Math.cos(Math.radians(this.deg)));
    this.rad          = padding;
    this.time         = 0;
    this.shape = mainSVG.append("circle")
            .attr("id", this.clientName)
            .attr("cx", this.cx)
            .attr("cy", this.cy)
            .attr("r", this.rad)
            .attr("transform", "translate(" + dimTrans.x + ", " + dimTrans.y + ")");

}
// Function to rotate the node within the line.
// The animation function need to be global because
// in case of recursion any prototype function will
// be in the global scope and lost all local references.
ClientNode.prototype.Rotate = function(_deg){

    // Set the target angle in degree.
    this.degTarg = _deg;
    this.time = 0;
    // Mark this client as a client that will be
    // animated/moved.
    var index = clientNodeArrayMoved.indexOf(this);
    if(index == -1){

        clientNodeArrayMoved.push(this);
        // This is the global function.
        ClientNodeArrayRotate();

    }

}
ClientNode.prototype.RotateAuto = function(){

    var shortestAngle;
    for(d of degTargArray){

        if(d !== undefined){
            if(shortestAngle === undefined){ shortestAngle = d; }
            else if(Math.abs(this.deg - d) <= shortestAngle){ shortestAngle = d; }
        }

    }
    var index = degTargArray.indexOf(shortestAngle);
    if(index > -1){ degTargArray.splice(index, 1); }
    this.Rotate(shortestAngle);

}

// This function will animate all client in `clientNodeArray`.
function ClientNodeArrayRotate(){

    for(cN of clientNodeArray){

        // Move the client clockwise.
        if((cN.degSaved > cN.degTarg) && (cN.deg > cN.degTarg)){

            // The step is calculated between the first angle before
            // animation and the destined angle.
            var step = -1*(Math.abs(cN.degSaved - cN.degTarg)/100);

            // The `Math.easeInExpo()` parameter is the starting time,
            // the starting number, the step, and last parameter is
            // the amount of necessary steps.
            //
            // In this case we need to multiply the step with the amount
            // of `clientNodeArrayMoved`. Because every moved client will make
            // this function to be executed more, hence more speed, hence
            // we need to slow it down, hence the multiplication with the
            // amount of node that is currently moving.
            cN.deg = Math.easeInExpo(cN.time, cN.deg, step, 32*clientNodeArrayMoved.length);
            cN.cx  = 0 + (mainCircRad * Math.sin(Math.radians(cN.deg)));
            cN.cy  = 0 + (mainCircRad * Math.cos(Math.radians(cN.deg)));
            cN.time ++;

            cN.shape
                .transition()
                .attr("cx", cN.cx)
                .attr("cy", cN.cy)
                .duration(0.1)
                .on("end", ClientNodeArrayRotate);

        }
        // Move the client node counter clockwise.
        else if((cN.degSaved < cN.degTarg) && (cN.deg < cN.degTarg)){

            var step = (Math.abs(cN.degSaved - cN.degTarg)/100);

            cN.deg = Math.easeInExpo(cN.time, cN.deg, step, 32*clientNodeArrayMoved.length);
            cN.cx  = 0 + (mainCircRad * Math.sin(Math.radians(cN.deg)));
            cN.cy  = 0 + (mainCircRad * Math.cos(Math.radians(cN.deg)));
            cN.time ++;

            cN.shape
                .transition()
                .attr("cx", cN.cx)
                .attr("cy", cN.cy)
                .duration(0.1)
                .on("end", ClientNodeArrayRotate);

        }
        // The `cN` client node is finished moving.
        else{

            // The angle position is always off by several
            // angles. So, make it equal to the target degree
            // anyway.
            cN.deg = cN.degTarg;
            cN.cx = 0 + (mainCircRad * Math.sin(Math.radians(cN.deg)));
            cN.cy = 0 + (mainCircRad * Math.cos(Math.radians(cN.deg)));

            cN.shape
                .transition()
                .attr("cx", cN.cx)
                .attr("cy", cN.cy)
                .duration(0.1);

            cN.degSaved = cN.deg;

            // After finished moving remove the client node
            // from the `clientNodeArrayMoved`.
            var index = clientNodeArrayMoved.indexOf(cN);
            if(index > -1){ clientNodeArrayMoved.splice(index, 1); }

        }

    }

}
function DetermineDegTargArray(_length){

    degTargArray = [];
    for(var i = 0; i < _length; i ++){

        var degTargTemp = ((i/_length) * 360) + 180;
        degTargTemp = (degTargTemp > 360) ? (degTargTemp - 360) : degTargTemp;
        degTargArray.push(degTargTemp);

    }

}


for(c of clientArray){

    new ClientNode(0, c.clientName);

}
DetermineDegTargArray(clientNodeArray.length);
for(cN of clientNodeArray){

    cN.RotateAuto();

}
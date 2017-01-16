Client.prototype.SimulateAddLatestInput = function(){

    this.SimulateAddLatestInputCam();
    this.SimulateAddLatestInputIR();
    this.SimulateAddLatestInputMic();

};
Client.prototype.SimulateAddLatestInputCam = function(){

    this.latestAmountFace = 0;
    for(var i = 0; i < clientList.length; i ++){

        if(
            (clientList[i].name != this.name) &&
            (clientList[i].online)
        ){

            //console.log(clientList[i].name);
            this.latestAmountFace ++;
            //console.log(clientList[i].name);

        }


   }

};
Client.prototype.SimulateAddLatestInputIR = function(){

    //console.log("test");

    this.latestIRCode = [];
    this.latestIRCodeClient = [];
    for(var i = 0; i < clientList.length; i ++){

        /*
        console.log("=========================");
        console.log(clientList[i].name + " " + this.name);
        console.log(clientList[i].name != this.name);
        console.log(clientList[i].online);
        console.log(
            (clientList[i].name != this.name) &&
            (clientList[i].online)
        );
        console.log("=========================");
        */

        if(
            (clientList[i].name != this.name) &&
            (clientList[i].online)
        ){

            this.latestIRCode.push(clientList[i].name);
            this.latestIRCodeClient.push(clientList[i]);
            //this.latestIRCode.push(clientList[i].clientIRCode);
            //console.log(clientList[i].name);

        }

    }

    console.log(this.latestIRCode);
    console.log(this.latestIRCodeClient);
    console.log(this.latestIRCodeClient[0].clientCircle.cX);

};
Client.prototype.SimulateAddLatestInputMic = function(){

    this.latestAmountPitch = ((Math.random()*5000.0) + 200.0).toFixed(3);
    this.latestAmountVolume = ((Math.random()*0.05) + 0.001).toFixed(3);

    //console.log(this.clientCircle !== null && this.clientCircle !== undefined);
    //console.log(this.clientCircle);

    if(this.clientCircle !== null && this.clientCircle !== undefined){

        var fillTem = ShadeRGBColor(
            "rgb(" + HexRGB(this.clientCircleColor).r + ", " + HexRGB(this.clientCircleColor).g + ", " + HexRGB(this.clientCircleColor).b + ")",
            simulateLinearScalePitchFill(this.latestAmountPitch)
        );
        this.clientCircle.radius = simulateLinearScaleVolume(this.latestAmountVolume);

        this.clientCircle.circle.transition().attr("r", this.clientCircle.radius).style("fill", fillTem).duration(100);

    }

};
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
            //this.latestIRCode.push(clientList[i].clientIRCode);
            //console.log(clientList[i].name);

        }

    }


};
Client.prototype.SimulateAddLatestInputMic = function(){

    this.latestAmountPitch = ((Math.random()*5000.0) + 200.0).toFixed(3);
    this.latestAmountVolume = ((Math.random()*0.05) + 0.001).toFixed(3);

};
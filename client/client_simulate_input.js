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
    this.latestIRCodeClientCircle = [];

    for(var i = 0; i < this.latestIRCodeClientLine.length; i ++){

        this.latestIRCodeClientLine[i].remove();
        this.latestIRCodeClientLine.splice(i, 1);
        i --;

    }

    console.log(this.latestIRCodeClientCircle.length);

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
            (clientList[i].clientCircle !== null && clientList[i].clientCircle !== undefined) &&
            (clientList[i].name != this.name) &&
            (clientList[i].online)
        ){

            this.latestIRCode.push(clientList[i].name);
            this.latestIRCodeClientCircle.push(clientList[i].clientCircle);
            //this.latestIRCode.push(clientList[i].clientIRCode);
            //console.log(clientList[i].clientCircle);

        }

    }

    //console.log(this.latestIRCode);
    //console.log(this.latestIRCodeClientCircle);
    //console.log(this.clientCircle.cX + " " + this.latestIRCodeClientCircle[0].cX);
    //console.log(this.clientCircle.cY + " " + this.latestIRCodeClientCircle[0].cY);

    for(var i = 0; i < this.latestIRCodeClientCircle.length; i ++){

        if(this.clientCircle !== null && this.clientCircle !== undefined){

            if(
                (this.clientCircle.degreeCurrent == this.clientCircle.degreeTarget) &&
                (this.latestIRCodeClientCircle[i].degreeCurrent == this.latestIRCodeClientCircle[i].degreeTarget)
            ){

                var x1 = this.clientCircle.cX;
                var y1 = this.clientCircle.cY;
                var x2 = this.latestIRCodeClientCircle[i].cX;
                var y2 = this.latestIRCodeClientCircle[i].cY;

                //console.log("test");

                var line = this.clientCircle.gLatestIRCodeClientLine.append("line")
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", x2)
                    .attr("y2", y2)
                    .attr(
                        "transform",
                        "translate(" + d3DimensionTranslate.x + ", " + d3DimensionTranslate.y + ")"
                    )
                    .style("opacity", 0.5)
                    .style("stroke", this.clientCircleColor)
                    .style("stroke-width", 5);

                this.latestIRCodeClientLine.push(line);

            }

        }

    }

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
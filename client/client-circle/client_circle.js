var clientCircleList = [];
var clientCircleMovingList = [];
var clientCircleRadius = d3Padding;
var degreeTargetList = [];

// Global function.
function ClientCircleListRotate(){

    for(var i = 0; i < clientCircleList.length; i ++){

        if(clientCircleList[i].circle !== null && clientCircleList[i].circle !== undefined){

            // Move the client circle clock wise.
            if(
                (clientCircleList[i].degreeCurrent > clientCircleList[i].degreeTarget) &&
                (clientCircleList[i].degreeSaved > clientCircleList[i].degreeTarget)
            ){

                //console.log(clientCircleList[i]);
                //console.log(clientCircleList[i].cX);

                var step = -1*(Math.abs(clientCircleList[i].degreeSaved - clientCircleList[i].degreeTarget)/100);

                clientCircleList[i].degreeCurrent = Math.EaseInExpo(clientCircleList[i].time, clientCircleList[i].degreeCurrent, step, 32*clientCircleList.length);
                clientCircleList[i].cX = mainCircleRadius * Math.sin(Math.Radian(clientCircleList[i].degreeCurrent));
                clientCircleList[i].cY = mainCircleRadius * Math.cos(Math.Radian(clientCircleList[i].degreeCurrent));
                clientCircleList[i].time ++;

                //console.log(mainCircleRadius);
                //console.log(clientCircleList[i].cX);
                //console.log(clientCircleList[i].degreeCurrent);
                //console.log(Math.sin(Math.Radian(clientCircleList[i].degreeCurrent)));
                //console.log(clientCircleList[i].cY);

                clientCircleList[i].circle
                    .transition()
                    .attr("cx", clientCircleList[i].cX)
                    .attr("cy", clientCircleList[i].cY)
                    .duration(0.1)
                    .on("end", ClientCircleListRotate);

            }
            // Move counter clock wise.
            else if(
                (clientCircleList[i].degreeCurrent < clientCircleList[i].degreeTarget) &&
                (clientCircleList[i].degreeSaved < clientCircleList[i].degreeTarget)
            ){

                //console.log(clientCircleList[i]);
                //console.log(clientCircleList[i].cX);

                var step = Math.abs(clientCircleList[i].degreeSaved - clientCircleList[i].degreeTarget)/100;

                clientCircleList[i].degreeCurrent = Math.EaseInExpo(clientCircleList[i].time, clientCircleList[i].degreeCurrent, step, 32*clientCircleList.length);
                clientCircleList[i].cX = mainCircleRadius * Math.sin(Math.Radian(clientCircleList[i].degreeCurrent));
                clientCircleList[i].cY = mainCircleRadius * Math.cos(Math.Radian(clientCircleList[i].degreeCurrent));
                clientCircleList[i].time ++;

                clientCircleList[i].circle
                    .transition()
                    .attr("cx", clientCircleList[i].cX)
                    .attr("cy", clientCircleList[i].cY)
                    .duration(0.1)
                    .on("end", ClientCircleListRotate);

            }
            else{

                //console.log(clientCircleList[i]);
                //console.log(clientCircleList[i].cX);

                clientCircleList[i].degreeCurrent = clientCircleList[i].degreeTarget;
                clientCircleList[i].degreeSaved = clientCircleList[i].degreeCurrent;
                clientCircleList[i].cX = mainCircleRadius * Math.sin(Math.Radian(clientCircleList[i].degreeCurrent));
                clientCircleList[i].cY = mainCircleRadius * Math.cos(Math.Radian(clientCircleList[i].degreeCurrent));
                clientCircleList[i].time = 0;

                clientCircleList[i].circle
                    .transition()
                    .attr("cx", clientCircleList[i].cX)
                    .attr("cy", clientCircleList[i].cY)
                    .duration(0.1);

                var index = clientCircleMovingList.indexOf(clientCircleList[i]);
                if(index > -1){ clientCircleMovingList.splice(index, 1); }

            }

        }

    }

}

function DetermineDegreeTargetList(_length){

    // Determine the target list.
    degreeTargetList = [];
    for(var i = 0; i < _length; i ++){

        var degreeTargetTemporary = (((i/_length) * 360) + 180)%360;
        degreeTargetList.push(degreeTargetTemporary);

    }

}

function ClientCircle(_client, _degree){

    //console.log("test");

    clientCircleList.push(this);

    this.client = _client;
    this.degreeCurrent = _degree;

    this.client.clientCircle = this;

    this.cX = mainCircleRadius * Math.sin(Math.Radian(this.degreeCurrent));
    this.cY = mainCircleRadius * Math.cos(Math.Radian(this.degreeCurrent));

    //console.log(this.cX);
    //console.log(mainCircleRadius);
    //console.log(this.degreeCurrent);
    //console.log(Math.Radian(this.degreeCurrent));
    //console.log(Math.sin(Math.Radian(this.degreeCurrent)));
    //console.log(this.cY);
    //console.log(mainCircleRadius);
    //console.log(Math.cos(Math.Radian(this.degreeCurrent)));

    this.degreeSaved = this.degreeCurrent;
    this.degreeTarget = this.degreeCurrent;

    this.time = 0;

    this.radius = clientCircleRadius;
    this.circle = d3SVG.append("circle")
        .attr("cx", this.cX)
        .attr("cy", this.cY)
        .attr("id", this.client.clientName)
        .attr("r", this.radius)
        .attr(
            "transform",
            "translate(" + d3DimensionTranslate.x + ", " + d3DimensionTranslate.y + ")"
        )
        .style("opacity", 0)
        .transition()
        .style("opacity", 1)
        .duration(50);

    //console.log(this.circle);
    //console.log(this.cX);
    //console.log(this.cY);
    //console.log(this.radius);

}
ClientCircle.prototype.constructor = ClientCircle;
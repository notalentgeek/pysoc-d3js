for(var i = 0; i < simulateClientNameIRCodeList.length; i ++){

    var client = new Client(
        simulateClientNameIRCodeList[i][0],
        simulateClientNameIRCodeList[i][1]
    );
    clientCircle = new ClientCircle(client, 180);
    //console.log(client);
    //console.log(client.clientName);
    //console.log(client.clientIRCode);
    //console.log(client.DebugShowLatest());

}
DetermineDegreeTargetList(clientCircleList.length);
for(var i = 0; i < clientCircleList.length; i ++){

    clientCircleList[i].RotateAuto();

}

window.setInterval(function(){

    console.log("1 second just passed");

    var currentDate = new Date();
    for(var i = 0; i < clientList.length; i ++){

        clientList[i].SimulateCheckOnline();

    }
    for(var i = 0; i < clientList.length; i ++){

        clientList[i].Simulate(currentDate);
        console.log(clientList[i].DebugShowLatest());

        if(!clientList[i].online && clientList[i].clientCircle !== null){

            clientList[i].clientCircle.circle
                .transition()
                .style("opacity", 0)
                .duration(500)
                .remove();

            var index = clientCircleList.indexOf(clientList[i].clientCircle);
            if(index > -1){ clientCircleList.splice(index, 1); }

            var index = clientCircleMovingList.indexOf(clientList[i].clientCircle);
            if(index > -1){ clientCircleMovingList.splice(index, 1); }

            clientList[i].clientCircle = null;

            DetermineDegreeTargetList(clientCircleList.length);
            for(var j = 0; j < clientCircleList.length; j ++){

                clientCircleList[j].RotateAuto();

            }

        }
        else if(clientList[i].online && clientList[i].clientCircle === null){

            DetermineDegreeTargetList(clientCircleList.length + 1);
            for(var j = 0; j < clientCircleList.length; j ++){

                clientCircleList[j].RotateAuto();

            }

            new ClientCircle(clientList[i], degreeTargetList[0]);

        }

    }

}, 1000);
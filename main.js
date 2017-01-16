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

            clientList[i].clientCircle.willBeDeleted = true;

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
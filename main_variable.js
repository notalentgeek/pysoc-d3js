var simulateClientNameIRCodeList = [

    ["KEY_1", "chris"],
    ["KEY_2", "dennet"],
    ["KEY_3", "richard"],
    ["KEY_4", "sam"]

];

var d3Dimension = { width:512, height:512 };
var d3DimensionSmallest = (d3Dimension.width < d3Dimension.height) ? d3Dimension.width : d3Dimension.height;
var d3DimensionTranslate = { x: (d3Dimension.width/2), y: (d3Dimension.height/2) };
var d3Padding = d3DimensionSmallest/16;

var mainCircleFill = "none";
var mainCircleRadius = (d3DimensionSmallest/2) - d3Padding;
var mainCircleStroke = "#008000";
var mainCircleStrokeWidth = 2;

var d3SVG = d3.select("body").append("svg")
    .attr("height", d3Dimension.height)
    .attr("width", d3Dimension.width)
    .style("border", "2px solid red");

var mainCirc = d3SVG.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("fill", mainCircleFill)
    .attr("r", mainCircleRadius)
    .attr("stroke", mainCircleStroke)
    .attr("stroke-width", mainCircleStrokeWidth)
    .attr("transform", "translate(" + d3DimensionTranslate.x + ", " + d3DimensionTranslate.y + ")");
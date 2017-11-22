var data;
var data2;
d3.queue()
  .defer(d3.csv, "Final Project/Newscategory.csv")
  .defer(d3.csv, "Final Project/Top20.csv")
  .awaitAll(function(error,allData){
    //console.log(error, allData);

     data = allData[0];
         data2= allData[1];

         console.log(data);
         console.log(data2);
   var width = 350,
    height = 400,
    radius = 150;

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#1a8cff", "#ff9999","#339900","b3b300","#ff9933","#b38600","#993366"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(30);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { 
      console.log(d);
      return +d['Percentage']; });

var svg = d3.select("#Pie-chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .on("mousemove", function (d) {
        console.log(d);
        var position = d3.mouse(this);
    
        var tooltipText = d.data["Catergory"];
        tooltipText = tooltipText + "<br />"; 
        tooltipText = tooltipText + "Count: <b>" + d.data["Count"] + "</b>"; 

    d3.select("#tooltip")
        .style("left", position[0] + width / 2 + "px")
        .style("top", position[1] + height / 2 + "px")
        .style("opacity", 1)
        .select('#value')
        .html(tooltipText);
})
    .on("mouseout", function () {
    // Hide the tooltip
    d3.select("#tooltip")
        .style("opacity", 0);;
});

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) { return color(i); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { 
        if (d.data["Percentage"] < 0.05) return "";
        return (d.data["Percentage"] *100).toFixed(2) +"%"; 
      });


// bar-chart

  var svg = d3.select("#barchart"),
    M = {top: 20, right: 20, bottom: 30, left: 125},
    barWidth = +svg.attr("width") - M.left - M.right,
    barHeight = +svg.attr("height") - M.top - M.bottom;
  
var tooltip = d3.select("#bars").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([0, barWidth]);
var y = d3.scaleBand().range([barHeight, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + M.left + "," + M.top + ")");
  
  
    data2.sort(function(a, b) { return a["Google hits"] - b["Google hits"]; });
    var max = d3.max(data2, function(d) { return d["Google hits"]; });
    
    x.domain([0, d3.max(data2, function(d) { return d["Google hits"]; })]);
    y.domain(data2.map(function(d) { return d.Site; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + barHeight + ")")
        .call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data2)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", 15)
        .attr("y", function(d) { return y(d.Site); })
        .attr("width", function(d) { return x(d["Google hits"]); })
        .on("mouseover", function(d){
          d3.select(this).style('fill','gold');
          //var position = d3.mouse(this);
            tooltip
              .style("left", 400 + "px")
              .style("top", 350 + "px")
              .style("opacity", "1")
              .html((d.Site) + "<br>" + "£" + (d["Google hits"]));
        })
        .on("mouseout", function(d){ 
          d3.select(this).style('fill','steelblue');
          tooltip.style("opacity", "0");});

});

 
 










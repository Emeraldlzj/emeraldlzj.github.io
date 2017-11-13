d3.csv("Final Project/Newscategory.csv", function(error,data){

   console.log(error, data);

   var width = 350,
    height = 400,
    radius = 150;

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#1a8cff", "#ff9999","#339900","b3b300","#ff9933","#b38600","#993366"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

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
      .on("mouseover", function (d) {
        console.log(d);
        var position = d3.mouse(this);
    
        

    d3.select("#tooltip")
        .style("left", position[0] + "px")
        .style("top", position[1] + "px")
        .style("opacity", 1)
        .select('#value')
        .text(d.data["Catergory"]);
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
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return (d.data["Percentage"] *100).toFixed(2) +"%"; });

});




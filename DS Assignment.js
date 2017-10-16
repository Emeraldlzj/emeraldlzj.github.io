
var svg=d3.select("mysvg")
.attr("width", window.innerWidth)
.attr("height", window.innerHeight);

svg.append(".dot")
   .style("stroke", "gray")
   .style("fill", "blue")
   .attr("r", 35)
   .attr("cx",425)
   .attr("cy", 246)
   .on("click",ChangeColor(d3.select(this).style("fill", "magenta");});


  function plusTen(num){
	return num + 10;
}
function minusTen(num){
	return num - 10;
}

var numbers = {
	plus10: plusTen,
	minus10: minusTen
};
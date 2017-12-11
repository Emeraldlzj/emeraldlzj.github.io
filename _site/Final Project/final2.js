(function () {
        var width =1200,
            height=900;

        var svg = d3.select('#chart')
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id","canvasEl")
            .append("g")
            .attr("transform","translate(0,0)");

        var defs = svg.append("defs");
        defs.append("pattern")
            .attr("id","bubble")
            .attr("height","100%")
            .attr("width","100%")
            .attr("patternContentUnits","objectBoundingBox")
            .append("circle")
            .attr("width",1)
            .attr("height",1)
            .attr("preserveAspectRatio","none")

        //如何让圆圈的大小和其他变量相关呢 如文章的点击率越大 圆圈越大
        var radiusScale = d3.scaleSqrt().domain([1,300]).range([10,100]);

        //using d3.force to push all the bubbles


        var forceX = d3.forceX(function (d) {
            return width/2
        }).strength(0.1)

        var forceY = d3.forceY(function(d){
            return height/2
        }).strength(0.1)
        
        function colorScale(str) {
            if(str=='left'){
                return 'rgb(26, 140, 255)'
            } else if( str=='right'){
                return '#FF3333'
            } else {
                return '#009900'
            }
        }

        //d3.forceCollide()是每个circle之间推开多远的距离.当d3.forceCollide的数值和圆圈半径相等时，没有任何overlap
        var forcecollide = d3.forceCollide(8).radius(22);

        //the simulation is the power of force, about where we want our circles to go and how we want our circle to go
        var simulation =d3.forceSimulation()
            .force("x",forceX)
            .force("y",forceY)
            .force("collide",forcecollide)
            .alpha(0.9)
            .restart();

        //load the data
        d3.queue()
            .defer(d3.csv,"political50.csv")
            .await(ready);

        function ready(error,data) {
            console.log(data);

            var columnData = data.map(function (d) { return d.Category });

            // var colorScale = d3.scaleOrdinal(d3.schemeCategory10)
            //     .domain(columnData);

            defs.selectAll(".party_pattern")
                .data(data)
                .enter().append("pattern")
                .attr("class","party_pattern")
                .attr("id",function (data) {
                    return data.Site;
                })
                .attr("height","100%")
                .attr("width","100%")
                .attr("patternContentUnits","objectBoundingBox")
                .append("circle")
                .attr("width",1)
                .attr("height",1)
                .attr("preserveAspectRatio","none");

            var circles = svg.selectAll(".party")
                .data(data)
                .enter().append("circle")
                .attr("class","party")
                .attr("r",function(d){
                    return 20;
                })
                .attr("fill",function (d) {
                    return colorScale(d["political alignment"]);

                })
                .on('mouseover',function (d) {
                    d3.select(this)
                      // .style("fill","gold")
                      .style("opacity",0.6);
                

                  var position = d3.mouse(this);
                    console.log(position);
                    var tooltip = d3.select('#tooltip');

                    tooltip.style('left', position[0]+20+ "px")
                        .style('top', position[1]+ "px")
                        .style('opacity', 0.8);

                    tooltip
                        .select('.site')
                        .text("Site: "+d.Site);

                    tooltip
                        .select('.category')
                        .text("Category: "+d.Category);
                    tooltip
                        .select('.political')
                        .text("Political alignment: "+d["political alignment"]);
                })
                .on('mouseout', function () {
                    d3.select(this)
                      .style("opacity",1)
                //       .style("fill",function (d) {
                //     return colorScale(d["political alignment"]);

                // } );
                    var tooltip = d3.select('#tooltip');
                    tooltip
                        .style('opacity', 0);
                });

            d3.select("#combine").on('click',function () {
                simulation
                    .force("X", d3.forceX(width/2).strength(0.2))
                    .force("Y", d3.forceY(height/2).strength(0.2))
                    .alpha(0.5)
                    .restart();

            })
            //
            d3.select("#split").on('click',function () {
                simulation
                    .force("X", d3.forceX(function(d){
                        if(d["Category"] =="clickbait"){
                            return 150
                        }
                        if(d.Category =="satire"){
                            return 500
                        }
                        if(d.Category =="conspiracy"){
                            return 800
                        }
                        if (d.Category=="fake news"){
                            return 1000
                        }
                        if(d.Category=="junk science"){
                            return 1200
                        }
                        else{
                            return 2000
                        }
                    }).strength(0.8))
                    .force("Y", d3.forceY(height/2).strength(0.8))
                    .alpha(0.9)
                    .restart();
                 });


            d3.select("#political").on('click',function () {
                simulation
                    .force("X", d3.forceX(function(d){
                        if(d["political alignment"]=="left"){
                            return 200
                        } else if(d["political alignment"]=="right"){
                            return 800
                        }
                        else{
                            return 2000
                        }
                    }).strength(0.8))
                    .force("Y", d3.forceY(height/2).strength(0.8))
                    .alpha(0.9)
                    .restart();
                 });
            simulation.nodes(data)
                .on('tick',ticked)
            //node is one of the circles

            function ticked(){
                circles
                    .attr("cx",function(d){
                        return d.x
                    })
                    .attr("cy",function(d){
                        return d.y
                    })

            }

        }

    }



)();
var margin={top:40, bottom:100, left:150, right:110},
    width=1000-margin.left-margin.right,
    height=600-margin.top-margin.bottom;

  var horizontal=d3.scale.ordinal().rangeRoundBands([0,width],0.12),
    vertical=d3.scale.linear().rangeRound([height,0]);

  var color = d3.scale.ordinal()
    .range(["#2ca02c",  "#ff7f0e"]);

  var xAxis=d3.svg.axis()
    .scale(horizontal)
    .orient("bottom");

  var yAxis=d3.svg.axis()
    .scale(vertical)
    .orient("left");

  var svg=d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
  console.log("Prakhar");
  d3.json('../output/jsonDocs1.json',function(err,data){
    console.log(data);
    if(err)
       console.log("error");
    
  data.forEach(function(d)
  {
    d.country=d.country;
    d.salt=d.salt;
    d.sugar=d.sugar;
  });
  var xData=["sugar","salt"];
  var dataIntermediate = xData.map(function (c) 
    {
        return data.map(function (d) 
        {
            return {x: d.country, y: d[c]};
        });
    });
  var dataStackLayout = d3.layout.stack()(dataIntermediate);

  horizontal.domain(dataStackLayout[0].map(function (d) 
    {
        return d.x;
    }));
  vertical.domain([0,
        d3.max(dataStackLayout[dataStackLayout.length - 1],
                  function (d) { return d.y0 + d.y;})
      ])
      .nice();
  var layer = svg.selectAll(".stack")
          .data(dataStackLayout)
          .enter().append("g")
          .attr("class", "stack")
          .style("fill", function (d, i) {
                return color(i);
    });

  layer.selectAll("rect")
        .data(function (d) 
        {
            return d;
        })
        .enter().append("rect")
          .attr("height",0)
          .attr("y",height)
          .transition().duration(3000)
          .delay(function(d,i) { return i*200;})
        .attr("x", function (d) {
            return horizontal(d.x);
          })
          .attr("y", function (d) {
              return vertical(d.y + d.y0);
          })
          .attr("height", function (d) {
              return vertical(d.y0) - vertical(d.y + d.y0);
        })
      .attr("width", horizontal.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
       .attr("transform", "translate(" + width + ",0)")
       .attr("dy","1.3em")
       .attr("dx","1.2em")
       .style("font-size","15px")
       .style("font-weight","bold")
       .style("color","red")
       .text("Countries");

  svg.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
       .attr("transform", "rotate(-90)")
       .attr("dy","1em")
       .style("text-anchor", "end")
       .style("font-size","12px")
       .style("font-weight","bold")
       .style("color","red")
       .text("sugar,salt");

       var mar = svg.selectAll(".corner")
         .data(color.domain())
       .enter().append("g")
         .attr("class", "corner")
         .attr("transform", function(d, i) { return "translate(0," + i * 20 +
  ")"; });


     mar.append("rect")
           .attr("x", width - 18)
           .attr("width", 18)
           .attr("height", 18)
           .style("fill", color);

     mar.append("text")
         .attr("x", width - 24)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .style("fill","green")
         .text(function(d,i) { return xData[i]; });

  });
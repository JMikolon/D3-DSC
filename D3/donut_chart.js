function donut_chart(){
    var data = [
        {name: "Europe", value: 1},
        {name: "North America", value: 1},
        {name: "Latin America", value: 1},
        {name: "Japan", value: 1},
        {name: "MEA", value: 1},
        {name: "China", value: 1},
      ];
      var text = "";
      
      var width = 260;
      var height = 260;
      var thickness = 40;
      var duration = 750;
      
      var radius = 110;
      //Math.min(width, height) / 2;
      //console.log(radius)
      var color = d3.scaleOrdinal()
        .range(["#BBDEFB","#98CAF9","#64B5F6","#42A5F5","#2196F3","#1E88E5"])
      //var color = d3.scaleOrdinal(d3.schemeCategory10);
      
      var svg2 = d3.select("#area2")
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);
      
      var g = svg2.append('g')
      .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
      
      var arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
      
      var pie = d3.pie()
      .value(function(d) { return d.value; })
      .sort(null);
      
      var arcOver = d3.arc().outerRadius(radius + 9);

      var path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append("g")
        .append('path')
        .style('stroke', 'white')       
        .attr('d', arc)
        .attr('fill', (d,i) => color(i))
        .on("mouseover", function(d) {
            d3.select(this)     
              .style("cursor", "pointer")
              .style("fill", "#8b0000")
              .transition(400).ease(d3.easeBounce).duration(500).attr('d', arcOver.innerRadius(radius - thickness))
              ;
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")  
              .style("fill", color(this._current))
              .transition(400).ease(d3.easeBounce).duration(500).attr('d', arc)
              ;
          })
        .each(function(a, i) { this._current = i; });
      

       // Die Mitt des Donut-Charts
        var ease = d3.easeBounceOut
        var zweiter_radius = 58
        var centerSvg = svg2.append('circle')
				.attr('fill','#d3d3d3')
        .attr('r',zweiter_radius)
        .attr("class", "labels")
        .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')')
        .on('mouseover', function(data){
          d3.select(this).transition(400).attr("r",zweiter_radius * 1.15)})
        .on('mouseout', function(data){
          d3.select(this).transition(400).ease(d3.easeBounce).duration(500).attr("r",zweiter_radius)})
      
        

        svg2.selectAll("text.labels")
        .data(data)
        .enter()
        .append("text")
        .text("Geo Filter")
        .attr("text-anchor", "middle")
        .style('fill', 'black')
				.style("font-size", "16px")
				.style("font-weight", "bold")
        .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')')
        .on("mouseover", function(){
          d3.select(this).attr()
        })


    
}
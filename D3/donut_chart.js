function donut_chart(){
    var data = [
        {name: "Europe", value: 40},
        {name: "North America", value: 20},
        {name: "Latin America", value: 30},
        {name: "Japan", value: 10},
        {name: "MEA", value: 10},
        {name: "China", value: 10},
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
      
      var path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append("g")
      .on("mouseover", function(d) {
            let g = d3.select(this)
              .style("cursor", "pointer")
              .style("fill", "black")
              .append("g")
              .transition()
              .attr("r", 3 * 0.65)
              .attr("class", "text-group");
       
            g.append("text")
              .attr("class", "name-text")
              .text(`${d.data.name}`)
              .attr('text-anchor', 'middle');
        
            g.append("text")
              .attr("class", "value-text")
              .text(`${d.data.value}`)
              .attr('text-anchor', 'middle')
              .attr('dy', '.6em');
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")  
              .style("fill", color(this._current))
              .select(".text-group").remove();
          })
        .append('path')
        .style('stroke', 'white')
        
        .attr('d', arc)
        .attr('fill', (d,i) => color(i))
        .on("mouseover", function(d) {
            d3.select(this)     
              .style("cursor", "pointer")
              .style("fill", "black");
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")  
              .style("fill", color(this._current));
          })
        .each(function(a, i) { this._current = i; });
      
        // Die Mitt des Donut-Charts

        var centerSvg = svg2.append('circle')
				.attr('fill','#a8a8a8')
        .attr('r','62')
        .attr("class", "labels")
        .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')')
      
        
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
    
}
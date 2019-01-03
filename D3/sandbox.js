//.style("border", "1px solid black")

// Hier die neue Visualisierung
//second_viz();
function second_viz(){
    //d3.select(container).remove()
  var margin = {top: 100, right: 50, bottom: 0, left: 100};
  var width = 600,
      height = 500;
  
  var svgContainer = d3.select("body").append("svg")
                                            .attr('width', width - margin.left - margin.right)
                                            .attr('height', height - margin.top - margin.bottom)
                                            .attr("class", "container_1")
                                            .attr("transform", "translate(100, -300)");
  
  var second_viz = svgContainer.append("circle").attr("cx", 100).attr("class", "container_1").attr("cy", 100).attr("r", 20);
  var active   = second_viz.active ? false : true,
  
  
  newOpacity = active ? 0 : 1;
  
  d3.select("second_viz").style("opacity", newOpacity);
  second_viz.active = active;
  
  
  
  };
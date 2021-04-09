function drawBackground() {

    var svghodo = d3.select("div#hodobox svg g").append("g").attr("class", "hodobg");
    var svg = d3.select("div#mainbox svg g").append("g").attr("class", "skewtbg");

    var dryline = d3.svg.line()
        .interpolate("linear")
        .x(function(d,i) { return x( ( 273.15 + d ) / Math.pow( (1000/pp[i]), 0.286) -273.15) + (y(basep)-y(pp[i]))/tan;})
        .y(function(d,i) { return y(pp[i])} );

    var moistline = d3.svg.line()
        .interpolate("linear")
        .x(function(d,i) { return x(d) + (y(basep)-y(pp[i]))/tan;})
        .y(function(d,i) { return y(pp[i])} );

    var vp = 0;
    e_array = [];
    t_array = [];
    for (t=-50; t<=50; t+=.01) {
            vp=calcVaporPressure(t);
            e_array.push(vp);
            t_array.push(t);
    }

    var mixra1, mixra2;
    var allmixr1000 = [];
    var allmixr622 = [];
    var Ttuple = [];
    var allT = [];
    var mixr_lims = [.4,.7,1,2,3,5,8,12,16,20];
    mixr_lims.forEach(function (item) {  
            for (i=0; i<=e_array.length; i++) {
                    var mixraf1 = 0;
                    var mixraf2 = 0;
            var Ttuple = [];
                    mixra1 = calcMixingRatio(e_array[i],1000);
                    if (mixra1 >= item) {
                            allmixr1000.push(mixra1);
                            Ttuple.push(t_array[i]);
                            break;
                    }
            }
            for (j=0; j<=e_array.length; j++) {
                    mixra2 = calcMixingRatio(e_array[j],622);
                    if (mixra2 >= item) {
                            allmixr622.push(mixra2);
                            Ttuple.push(t_array[j]);
                            break;
                    }
            }
        allT.push(Ttuple);
    });

    console.log(allT);
    
    // Mixing Ratio Lines
    var mrline = d3.svg.line()
        .interpolate("linear")
        .x(function(d,i) { return x(d) + (y(basep)-y(i%2 ? 622:1050))/tan})
        .y(function(d,i) { return i % 2 ? y(622) : y(1050)} );

    // Add clipping path
    svg.append("clipPath")
        .attr("id", "clipper")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height);
        
    // Skewed temperature lines
    svg.selectAll("gline")
        .data(d3.range(-100,50,10))
    .enter().append("line")
        .attr("x1", function(d) { return x(d)-0.5 + (y(basep)-y(100))/tan; })
        .attr("x2", function(d) { return x(d)-0.5; })
        .attr("y1", 0)
        .attr("y2", height)
        .attr("class", function(d) { if (d == 0) { return "tempzero"; } else if (d == -20 || d == -10) { return "dendrite" }else { return "gridline"}})
        .attr("clip-path", "url(#clipper)");
        
    // Logarithmic pressure lines
        svg.selectAll("gline2")
            .data(plines)
        .enter().append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", function(d) { return y(d); })
            .attr("y2", function(d) { return y(d); })
            .attr("class", "gridline");
        
    // create array to plot dry adiabats
    var pp = d3.range(topp,basep+1,10);
    var dryad = d3.range(-40,240,20);
    var all = [];
    for (i=0; i<dryad.length; i++) { 
        var z = [];
        for (j=0; j<pp.length; j++) { z.push(dryad[i]); }
        all.push(z);
    }

    var allmoist = [];
    var moistad = d3.range(-20,40,4);
    for (i=0; i<moistad.length; i++) { 
        var a = [];
        for (j=0; j<pp.length; j++) { 
        a.push( findTC( calcThetaE(basep, moistad[i], moistad[i]), pp[j])) 
        }
        allmoist.push(a);
    }

    // Draw dry adiabats
    svg.selectAll(".dryline")
        .data(all)
    .enter().append("path")
        .attr("class", "gridline")
        .attr("class", "dryline")
        .attr("clip-path", "url(#clipper)")
        .attr("d", dryline);
        
    // Draw moist adiabats
    svg.selectAll(".moistline")
        .data(allmoist)
    .enter().append("path")
        .attr("class", "gridline")
        .attr("class", "moistline")
        .attr("clip-path", "url(#clipper)")
        .attr("d", moistline);

    // Draw mixing ratio lines
    svg.selectAll(".mrline")
        .data(allT)
    .enter().append("path")
        .attr("class", "gridline")
        .attr("class", "mrline")
        .attr("clip-path", "url(#clipper)")
        .attr("d", mrline);

    allT.forEach( function (item, i) {
        xVal = x(item[1]) + (y(basep) - y(622))/tan;
        yVal = y(622);
        mixR622 = parseFloat(allmixr622[i]);
        if (mixR622 < 1) {
            roundedMixR = mixR622.toFixed(1);
            xVal = xVal-11;
        } else {
            roundedMixR = mixR622.toFixed(0);
            if (roundedMixR < 10) {
                xVal = xVal-5;
            } else {
                xVal = xVal-8;
            }
        }
        
        svg.append("text")
            .attr("transform","translate( " + xVal + " ," + yVal + ")")
            .text(roundedMixR)
            .attr("opacity",".65")
            .attr("fill","#48cf6a");
    });

    // Line along right edge of plot
    svg.append("line")
        .attr("x1", width-0.5)
        .attr("x2", width-0.5)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("class", "gridline");
        
        // draw hodograph background
    svghodo.selectAll(".circles")
        .data(d3.range(10,80,10))
        .enter().append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", function(d) { return r(d); })
        .attr("class", "gridline");
        svghodo.selectAll("hodolabels")
        .data(d3.range(10,80,20)).enter().append("text")
            .attr('x', 0)
            .attr('y', function (d,i) { return r(d); })
            .attr('dy', '0.4em')
            .attr('class', 'hodolabels')
            .attr('text-anchor', 'middle')
            .text(function(d) { return d+'kts'; });
        
            // Add axes
        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + (height-0.5) + ")").call(xAxis);
        svg.append("g").attr("class", "y axis").attr("transform", "translate(-0.5,0)").call(yAxis);
        svg.append("g").attr("class", "y axis ticks").attr("transform", "translate(-0.5,0)").call(yAxis2);

}

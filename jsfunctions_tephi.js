function drawBackground() {

    var svghodo = d3.select("div#hodobox svg g").append("g").attr("class", "hodobg");
    var svg = d3.select("div#mainbox svg g").append("g").attr("class", "tephibg");

    var presline = d3.svg.line()
        .interpolate("monotone")
        .x(function(d) {return d[0]})
        .y(function(d) {return d[1]});

    var moistline = d3.svg.line()
        .interpolate("linear")
		.x(function(d,i) { loc = getTephiLoc(d,calcTheta(pp[i],d)); return loc[0] })
        .y(function(d,i) { loc = getTephiLoc(d,calcTheta(pp[i],d)); return loc[1] });

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
        .data(d3.range(-130,80,10))
    .enter().append("line")
        .attr("x1", function(d,i) { loc = getTephiLoc(d,calcTheta(topp-50,d)); return loc[0] }) 
        .attr("x2", function(d,i) { loc = getTephiLoc(d,calcTheta(basep+100,d)); return loc[0] })
        .attr("y1", function(d,i) { loc = getTephiLoc(d,calcTheta(topp-50,d)); return loc[1] }) 
        .attr("y2", function(d,i) { loc = getTephiLoc(d,calcTheta(basep+100,d)); return loc[1] })
        .attr("class", function(d) { if (d == 0) { return "tempzero"; } else if (d == -20 || d == -10) { return "dendrite" }else { return "gridline"}})
        .attr("clip-path", "url(#clipper)");

    // Skewed dry adiabats
    svg.selectAll("dryline")
        .data(d3.range(220,500,10))
        .enter().append("line")
        .attr("x1", function(d,i) { loc = getTephiLoc(calcTC(topp-50,d),d); return loc[0] })
        .attr("x2", function(d,i) { loc = getTephiLoc(calcTC(basep+100,d),d); return loc[0] })
        .attr("y1", function(d,i) { loc = getTephiLoc(calcTC(topp-50,d),d); return loc[1] })
        .attr("y2", function(d,i) { loc = getTephiLoc(calcTC(basep+100,d),d); return loc[1] })
        .attr("class", "dryline")
        .attr("clip-path", "url(#clipper)");


    // create array to plot moist adiabats
    var pp = d3.range(topp,basep+1,10);
    var allmoist = [];
    var moistad = d3.range(-32,32,4);
    for (i=0; i<moistad.length; i++) { 
        var a = [];
        for (j=0; j<pp.length; j++) { 
            a.push( findTC(calcThetaE(1000, moistad[i], moistad[i]), pp[j])) 
        }
        allmoist.push(a);
    }

    // Draw moist adiabats
    svg.selectAll(".moistline")
        .data(allmoist)
    .enter().append("path")
        .attr("class", "gridline")
        .attr("class", "moistline")
        .attr("clip-path", "url(#clipper)")
        .attr("d", moistline);

    //Build pressure dots (pdots) arrays
    var allpdots = [];
    var temps = d3.range(-130,130,20);
    for (p=0; p<plines.length; p++) {
        pdots = [];
        for (i=0; i<temps.length; i++) {
            thetaK = calcTheta(plines[p],temps[i]);
            pdots.push(getTephiLoc(temps[i],thetaK));
//            pdots.push({"temp": tempC, "press": plines[p], "theta": thetaK});
        }
        allpdots.push(pdots);
    } 
    svg.selectAll("gline2")
//        .data(pdots)
        .data(allpdots)
        .enter().append("path")
        .attr("class", "gridline")
        .attr("clip-path", "url(#clipper)")
        .attr("d", presline);

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
    var allT = [];
    var mixr_lims = [.1,.2,.4,.7,1,2,3,5,8,12,16,20];
    mixr_lims.forEach(function (item) {  
            for (i=0; i<=e_array.length; i++) {
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

    // Mixing Ratio Lines
    var mrline = d3.svg.line()
        .interpolate("linear")
        .x(function(d,i) { i%2 ? loc=getTephiLoc(d,calcTheta(622,d)) : loc=getTephiLoc(d,calcTheta(1000,d)) ; return loc[0]})
        .y(function(d,i) { i%2 ? loc=getTephiLoc(d,calcTheta(622,d)) : loc=getTephiLoc(d,calcTheta(1000,d)) ; return loc[1]})

    // Draw mixing ratio lines
    svg.selectAll(".mrline")
        .data(allT)
    .enter().append("path")
        .attr("class", "gridline")
        .attr("class", "mrline")
        .attr("clip-path", "url(#clipper)")
        .attr("d", mrline);

    allT.forEach( function (item, i) {
        loc = getTephiLoc(item[1],calcTheta(622,item[1]));
        xVal = loc[0];
        yVal = loc[1]; // adjust for Tephi?
        mixR622 = parseFloat(allmixr622[i]);
        if (mixR622 < 1) {
            roundedMixR = mixR622.toFixed(1);
            xVal = xVal-11; // adjust for Tephi?
        } else {
            roundedMixR = mixR622.toFixed(0);
            if (roundedMixR < 10) {
                xVal = xVal-5; // adjust for Tephi?
            } else {
                xVal = xVal-8; // adjust for Tephi?
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
//        svg.append("g").attr("class", "y axis ticks").attr("transform", "translate(-0.5,0)").call(yAxis2);

}

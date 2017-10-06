$(function() {
	function _random(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	var chart = new CanvasJS.Chart("followers-line-chart", {
		zoomEnabled: false,
		animationEnabled: true,
		title: {
			text: "Followers By Year"
		},
		axisY2: {
			interlacedColor: "#F5F5F5",
		},
		theme: "theme3",
		toolTip: {
			shared: true
		},
		data: [{
			type: "line",
			lineThickness: 3,
			axisYType: "secondary",
			showInLegend: true,
			name: "Facebook",
			color: "#3b5998",
			dataPoints: [
			{ x: new Date(2010, 0), y: _random(30, 150) },
			{ x: new Date(2011, 0), y: _random(30, 150) },
			{ x: new Date(2012, 0), y: _random(30, 150) },
			{ x: new Date(2013, 0), y: _random(30, 150) },
			{ x: new Date(2014, 0), y: _random(30, 150) },
			{ x: new Date(2015, 0), y: _random(30, 150) },
			{ x: new Date(2016, 0), y: _random(30, 150) },
			{ x: new Date(2017, 0), y: _random(30, 150) }
			]
		},
		{
			type: "line",
			lineThickness: 3,
			showInLegend: true,
			name: "Twitter",
			axisYType: "secondary",
			color: "#1da1f2",
			dataPoints: [
			{ x: new Date(2010, 0), y: _random(30, 150) },
			{ x: new Date(2011, 0), y: _random(30, 150) },
			{ x: new Date(2012, 0), y: _random(30, 150) },
			{ x: new Date(2013, 0), y: _random(30, 150) },
			{ x: new Date(2014, 0), y: _random(30, 150) },
			{ x: new Date(2015, 0), y: _random(30, 150) },
			{ x: new Date(2016, 0), y: _random(30, 150) },
			{ x: new Date(2017, 0), y: _random(30, 150) }
			]
		},
		{
			type: "line",
			lineThickness: 3,
			showInLegend: true,
			name: "Instagram",
			axisYType: "secondary",
			color: "#396991",
			dataPoints: [
			{ x: new Date(2010, 0), y: _random(30, 150) },
			{ x: new Date(2011, 0), y: _random(30, 150) },
			{ x: new Date(2012, 0), y: _random(30, 150) },
			{ x: new Date(2013, 0), y: _random(30, 150) },
			{ x: new Date(2014, 0), y: _random(30, 150) },
			{ x: new Date(2015, 0), y: _random(30, 150) },
			{ x: new Date(2016, 0), y: _random(30, 150) },
			{ x: new Date(2017, 0), y: _random(30, 150) }
			]
		}
		]
	});

	chart.render();
	
	var chart = new CanvasJS.Chart("followers-pie-chart",
	{
		theme: "theme3",
		title:{
			text: "Total Followers"
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			toolTipContent: "{y} Followers - #percent %",
			legendText: "{indexLabel}",
			dataPoints: [
				{  y: 210, indexLabel: "Facebook", color: "#3b5998"},
				{  y: 174, indexLabel: "Twitter", color: "#1da1f2" },
				{  y: 124, indexLabel: "Instagram", color: "#396991" }
			]
		}
		]
	});
	chart.render();
});
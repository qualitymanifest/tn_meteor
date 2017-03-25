import React, { Component } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import d3tip from "d3-tip"
import Moment from "moment-timezone";

Moment.tz.setDefault("Etc/UTC");

// https://mikewilliamson.wordpress.com/2016/06/03/d3-and-react-3-ways/
// http://c3js.org/samples/chart_scatter.html
// http://c3js.org/reference.html

const addInfo = (notes) => {
	const newNotes = notes.map((note) => {
		const noteMoment = Moment(note.dateTime);
		const newNote = Object.assign({}, note);
		newNote.time = noteMoment.format("HHmm");
		newNote.weekday = noteMoment.isoWeekday();
		return newNote;
	});
	return newNotes;
};

const days = {
	1: "Mo",
	2: "Tu",
	3: "We",
	4: "Th",
	5: "Fr",
	6: "Sa",
	7: "Su"
};


class Scatterplot extends Component {

	render() {
		if (!this.props.notes) return null;
		let data = addInfo(this.props.notes);

		const div = ReactFauxDOM.createElement("div");
		div.setAttribute("id", "chart")
/* ---------------------------------------------------- */
/* ---------------------------------------------------- */

		const margin = { top: 20, right: 15, bottom: 60, left: 60 };
		const width = 960 - margin.left - margin.right;
		const height = 500 - margin.top - margin.bottom;

		const x = d3.scaleLinear()
			.domain([0, 2359])
			.range([0, width]);

		const y = d3.scaleLinear()
			.domain([1, 7])
			.range([height, 0]);

		const chart = d3.select(div)
			.append("svg")
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
			.attr("class", "chart");

		const main = chart.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`)
			.attr("width", width)
			.attr("height", height)
			.attr("class", "main");

		main.append("g")
			.attr("transform", `translate(0,${height})`)
			.attr("class", "main axis date")
			.call(d3.axisBottom(x));

		main.append("g")
			.attr("transform", "translate(0,0)")
			.attr("class", "main axis date")
			.call(d3.axisLeft(y));

		const g = main.append("g");

		g.selectAll("scatter-dots")
			.data(data)
			.enter().append("circle")
				.attr("cx", d => x(d.time))
				.attr("cy", d => y(d.weekday))
				.attr("r", 8);

/* ---------------------------------------------------- */
/* ---------------------------------------------------- */

		return div.toReact();
	}
}

export default Scatterplot;

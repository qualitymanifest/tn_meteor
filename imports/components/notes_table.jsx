import React from "react";
import moment from "moment-timezone";
import { LinkContainer } from "react-router-bootstrap";

moment.tz.setDefault("Etc/UTC");

const NotesTable = (props) => {
	if (!props.notes.length) return null;
	const renderedNotes = props.notes.map((train) => {
		const { railroad, city, state, symbol, dateTime, _id } = train;
		return (
			<LinkContainer key={_id} className="notesTableLink" to={`/?city=${city}&state=${state}&railroad=${railroad}&symbol=${symbol}`}>
				<tr>
					<td>{railroad}</td>
					<td>{city + ", " + state}</td>
					<td>{symbol}</td>
					<td>{moment(dateTime).format("MM-DD-YY HH:mm")}</td>
					{ props.deleteFunc &&
						<LinkContainer to="#">
							<td className="trashColumn">
								<span onClick={() => props.deleteFunc(_id)}
									className="glyphicon glyphicon-trash"
								/>
							</td>
						</LinkContainer>
					}
				</tr>
			</LinkContainer>
		);
	});
	return (
		<table className="table table-striped table-condensed table-responsive">
			<caption>{props.caption}</caption>
			<thead>
				<tr>
					<th>RR</th>
					<th>Location</th>
					<th>Symbol</th>
					<th>Date/Time</th>
					{props.deleteFunc && <th className="trashColumn"></th>}
				</tr>
			</thead>
			<tbody>
				{renderedNotes}
			</tbody>
		</table>
	);
};

export default NotesTable;

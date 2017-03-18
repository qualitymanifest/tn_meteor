import React from 'react';

const NotesTable = (props) => {
	const renderedNotes = props.notes.map((train, idx) => {
		const {railroad, location, symbol, dateTime} = train
		return  (
			<tr key={idx}>
				<td>{railroad}</td>
				<td>{location}</td>
				<td>{symbol}</td>
				<td>{String(dateTime)}</td>
			</tr>
		)
	})
	return (
		<table className="table table-striped table-condensed">
			<thead>
				<tr>
					<th>RR</th>
					<th>Location</th>
					<th>Symbol</th>
					<th>Date/Time</th>
				</tr>
			</thead>
			<tbody>
				{renderedNotes}
			</tbody>
		</table>
	)
}

export default NotesTable;
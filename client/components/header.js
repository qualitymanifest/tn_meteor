import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import Accounts from './accounts';
import { Notes } from '../../imports/collections/notes'

/* the forceUpdate on click is to re-render the header after the
	'.active' NavItem changes. this is a temp fix */

class Header extends Component {
	render() {
		const pathname = browserHistory.getCurrentLocation().pathname
		let toggle;
		return (
		  <Navbar inverse collapseOnSelect fixedTop>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#">FoamBook</a>
		      </Navbar.Brand>
		    {this.props.notesCount && 
	      	<Navbar.Text>
	      		{this.props.notesCount} notes & counting!
	      	</Navbar.Text>
		    }
		    	<Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav pullRight>
		        <IndexLinkContainer onClick={() => this.forceUpdate()} to='/'>
		        	<NavItem>
		        		Search
		        	</NavItem>
		        </IndexLinkContainer>
		        <LinkContainer onClick={() => this.forceUpdate()} to='/add_note'>
		        	<NavItem>
		        		Submit
		        	</NavItem>
		        </LinkContainer>
		    		{this.props.user &&
					 		<LinkContainer onClick={() => this.forceUpdate()} to="/user_profile">
					 			<NavItem>
					 				Profile
					 			</NavItem>
					 		</LinkContainer>
					 	}
					 <NavItem id="log-button">
					 	<Accounts />
					 </NavItem>
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		)
	}
}

Header = createContainer(() => {
	Meteor.subscribe('notes');
	return { 
		notesCount : Notes.find({}).count(),
		user : Meteor.user() }
}, Header);

export default Header;
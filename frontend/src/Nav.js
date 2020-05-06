import React, { createRef } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default class Nav extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			open: false,
		};
		this.anchorRef = createRef();
		this.handleToggle = this.handleToggle.bind( this );
		this.handleClose = this.handleClose.bind( this );
	}

	// return focus to the button when we transitioned from !open -> open
	componentDidUpdate( prevProps, prevState ) {
		if ( prevState.open === false ) {
			this.anchorRef.current.focus();
		}
	}

	handleToggle() {
		const { open } = this.state;
		this.setState( { open: !open } );
	}

	handleClose( event ) {
		if ( this.anchorRef.current && this.anchorRef.current.contains( event.target ) ) {
			return;
		}
		this.setState( { open: false } );
	}

	handleListKeyDown( event ) {
		if ( event.key === 'Tab' ) {
			event.preventDefault();
			this.setState( { open: false } );
		}
	}

	render() {
		const { open } = this.state;
		return (
			<div>
				<Button
					ref={this.anchorRef}
					onClick={this.handleToggle}
				>
					<MenuOpenIcon />
				</Button>
				<SwipeableDrawer
					anchor="left"
					open={open}
					onClose={this.handleToggle}
					onOpen={this.handleToggle}
				>
					<MenuList autoFocusItem={open} onKeyDown={this.handleListKeyDown}>
						<MenuItem onClick={this.handleClose}>
							<Link to="/">Workouts</Link>
						</MenuItem>
						<MenuItem onClick={this.handleClose}>
							<Link to="/history">History</Link>
						</MenuItem>
						<MenuItem onClick={this.handleClose}>
							<LogoutButton />
						</MenuItem>
					</MenuList>
				</SwipeableDrawer>
			</div>
		);
	}
}

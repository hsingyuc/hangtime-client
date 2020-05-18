import React, { createRef } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HistoryIcon from '@material-ui/icons/History';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
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
				<AppBar position="static">
					<Toolbar variant="dense">
						<SwipeableDrawer
							anchor="right"
							open={open}
							onClose={this.handleToggle}
							onOpen={this.handleToggle}
						>
							<List autoFocusItem={open} onKeyDown={this.handleListKeyDown}>
								<ListItem button onClick={this.handleClose} component={Link} to="/">
									<ListItemIcon>
										<FitnessCenterIcon />
									</ListItemIcon>
									<ListItemText primary="Workouts" />
								</ListItem>

								<ListItem button onClick={this.handleClose} component={Link} to="/history">
									<ListItemIcon>
										<HistoryIcon />
									</ListItemIcon>
									<ListItemText primary="History" />
								</ListItem>
							</List>

							<Divider />

							<List>
								<LogoutButton />
							</List>
						</SwipeableDrawer>
						<Tooltip title="Home" arrow component={Link} to="/">
							<Typography variant="h6" color="inherit">
								HANGTIME
							</Typography>
						</Tooltip>
						<IconButton
							edge="start"
							className="menuButton"
							color="inherit"
							aria-label="menu"
							ref={this.anchorRef}
							onClick={this.handleToggle}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

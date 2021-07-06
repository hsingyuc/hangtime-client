import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

class Sessions extends React.PureComponent {
	constructor( props ) {
		super( props );
		this.state = {
			sessions: [],
			page: 0,
		};

		this.handleChangePage = this.handleChangePage.bind( this );
	}

	componentDidMount() {
		this.getSessions();
	}

	async getSessions() {
		const { currentUser } = this.props;
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/users/${currentUser.id}/sessions`,
			{
				credentials: 'include',
			},
		);
		const json = await response.json();
		this.setState( { sessions: json.data } );
	}

	static getDaysDifference( item ) {
		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const date = new Date( Date.parse( item.createdAt ) );
		return Math.round( ( new Date() - date ) / millisecondsPerDay );
	}

	handleChangePage( event, page ) {
		this.setState( { page } );
	}

	render() {
		const { page, sessions } = this.state;

		return (
			<div className="table-container">
				<Paper>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										Type
									</TableCell>
									<TableCell>
										Result
									</TableCell>
									<TableCell>
										Days ago
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{sessions.slice( page * 7, page * 7 + 7 ).map( ( session ) => (
									<TableRow hover role="checkbox" tabIndex={-1} key={session.id}>
										<TableCell>
											{session.type}
										</TableCell>
										<TableCell>
											{session.isSuccess ? 'Success' : 'Failed'}
										</TableCell>
										<TableCell>
											{Sessions.getDaysDifference( session )}
										</TableCell>
									</TableRow>
								) )}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[7]}
						rowsPerPage={7}
						component="div"
						count={sessions.length}
						page={page}
						onChangePage={this.handleChangePage}
					/>
				</Paper>
			</div>
		);
	}
}

Sessions.propTypes = {
	currentUser: PropTypes.instanceOf( Object ).isRequired,
};
const mapStateToProps = ( state ) => ( {
	currentUser: state.currentUser,
	isAuthRequesting: state.isAuthRequesting,
} );

export default connect( mapStateToProps )( Sessions );

const jwt = require( 'jsonwebtoken' );

export const authenticate = ( req, res, next ) => {
	const authHeader = req.headers.authorization;

	if ( authHeader ) {
		const token = authHeader.split( ' ' )[1];

		jwt.verify( token, 'secret-to-update', ( err, data ) => {
			if ( err ) {
				return res.sendStatus( 403 );
			}

			req.user = data.user;
			return next();
		} );
	} else {
		res.sendStatus( 401 );
	}
};


export default authenticate;

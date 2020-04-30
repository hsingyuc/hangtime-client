import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import User from '../entity/User';

const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

export default class AuthController {
	private userRepository = getRepository( User );

	async register( request: Request ) {
		const user = this.userRepository.create( request.body );
		return this.userRepository.save( user );
	}

	async login( request: Request, response: Response ) {
		const user = await this.userRepository.findOne( { email: request.body.email } );

		if ( !user ) {
			return { error: 'User not found!' };
		}

		const isValid = bcrypt.compareSync( request.body.password, user.password );

		if ( isValid ) {
			const token = jwt.sign( { user: { id: user.id } }, 'secret-to-update', { expiresIn: '20160m' } );
			response.cookie( 'token', token, { httpOnly: true } );
			return { data: { user: { user: user.id, email: user.email } } };
		}

		return { error: 'Password not valid!' };
	}

	async logout( request: Request, response: Response ) {
		response.clearCookie( 'token' );
		return { data: 'Logged out successfully' };
	}
}

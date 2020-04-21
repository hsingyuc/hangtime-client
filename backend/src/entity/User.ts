import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
const bcrypt = require('bcrypt');
import {Session} from "./Session";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, 10);
        }
    }

    @OneToMany(type => Session, session => session.user)
    sessions: Session[];
    
}

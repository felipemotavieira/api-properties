import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
export class Schedules {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({type: 'date'})
    date: string

    @Column({type: 'time'})
    hour: string

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Property)
    property: Property
}
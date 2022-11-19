import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('adresses')
export class Adress {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    district: string

    @Column()
    zipCode: string

    @Column()
    number: string

    @Column()
    city: string

    @Column()
    state: string
}
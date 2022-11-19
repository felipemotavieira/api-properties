import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Adress } from "./adress.entity";
import { Category } from "./category.entity";
import { Schedules } from "./schedules_user_properties.entity";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({default: false})
    sold: boolean

    @Column()
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Adress, {eager:true})@JoinColumn()
    adress: Adress

    @OneToMany(() => Schedules, schedules => schedules.property, {eager:true})
    schedules: Schedules[]

    @ManyToOne(() => Category)
    category: Category
}
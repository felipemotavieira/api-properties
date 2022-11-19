import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Exclude } from 'class-transformer'
import { Schedules } from "./schedules_user_properties.entity"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    isAdm: boolean

    @Column({ default: true})
    isActive: boolean

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Schedules, schedule => schedule.user , {eager: true})
    schedules: Schedules[]
}
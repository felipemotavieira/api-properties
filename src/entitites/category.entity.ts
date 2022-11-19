import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Property } from "./property.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @OneToMany(() => Property, (property) => property.category , {eager: true})
    properties: Property[]
}
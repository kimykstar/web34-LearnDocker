import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 64 })
    title: string;

    @Column('varchar', { length: 500 })
    content: string;

    @Column('varchar', { length: 500, nullable: true })
    hint?: string;
}

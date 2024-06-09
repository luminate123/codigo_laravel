import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "services" })
export class Service {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    titulo: string
    @Column()
    descripcion: string
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date
}
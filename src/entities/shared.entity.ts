import {
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class SharedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ length: 25, default: 'SYSTEM' })
  createdBy: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ length: 25, default: 'SYSTEM' })
  updatedBy: string;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;

  @VersionColumn({ name: 'dataVersion' })
  version: number;
}

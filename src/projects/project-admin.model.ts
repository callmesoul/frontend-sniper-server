import {
  Column,
  Model,
  Table,
  DataType,
  AfterCreate,
  ForeignKey,
} from 'sequelize-typescript';
import { Admin } from 'src/admins/admin.model';
import { Role } from './project.enum';
import { Project } from './project.model';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'project-admins',
})
export class ProjectAdmin extends Model {
  @Column({
    type: DataType.UUID,
    comment: 'id',
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  projectId: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  adminId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: Role.Developer,
  })
  role: Role;
}

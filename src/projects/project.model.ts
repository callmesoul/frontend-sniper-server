import {
  Column,
  Model,
  Table,
  DataType,
  AfterCreate,
  BelongsToMany,
} from 'sequelize-typescript';
import { Admin } from 'src/admins/admin.model';
import { ProjectAdmin } from './project-admin.model';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'projects',
})
export class Project extends Model {
  @Column({
    type: DataType.UUID,
    comment: 'id',
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Admin, () => ProjectAdmin)
  users: ProjectAdmin[];
}

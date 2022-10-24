import {
  Column,
  Model,
  Table,
  DataType,
  AfterCreate,
} from 'sequelize-typescript';
import { Role } from 'src/roles/role.enum';

@Table({
  paranoid: true,
})
export class Admin extends Model {
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
  username: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  password: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  roles: Role[];
}

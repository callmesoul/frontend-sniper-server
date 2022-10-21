import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserTagRecord } from '../user-tag-records/user-tag-records.model';
import { User } from '../users/user.model';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'user-tags',
})
export class UserTag extends Model {
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
    unique: false,
  })
  name: string;

  @BelongsToMany(() => User, () => UserTagRecord)
  users: User[];
}

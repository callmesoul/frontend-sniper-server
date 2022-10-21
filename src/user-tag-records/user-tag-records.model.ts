import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { UserTag } from '../user-tags/user-tags.model';
import { User } from '../users/user.model';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'user-tag-records',
})
export class UserTagRecord extends Model {
  @Column({
    type: DataType.UUID,
    comment: 'id',
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: false,
  })
  userId: string;

  @ForeignKey(() => UserTag)
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: false,
  })
  userTagId: string;
}

import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserTagRecord } from '../user-tag-records/user-tag-records.model';
import { UserTag } from '../user-tags/user-tags.model';

@Table({
  paranoid: true,
})
export class User extends Model {
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
  metaId: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  address: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(256),
    allowNull: false,
    unique: true,
  })
  xprivKey: string;

  @BelongsToMany(() => UserTag, () => UserTagRecord)
  tags: UserTag[];
}

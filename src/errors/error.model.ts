import {
  Column,
  Model,
  Table,
  DataType,
  AfterCreate,
  BelongsToMany,
} from 'sequelize-typescript';
import { Admin } from 'src/admins/admin.model';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'errors',
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
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    comment: '错误标题',
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
    comment: '错误信息',
  })
  message: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: false,
    comment: '错误类型',
  })
  category: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: false,
    comment: '信息类型',
  })
  level: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    comment: '行数',
  })
  row: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    comment: '列数',
  })
  col: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    comment: '触发用户',
  })
  user: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    comment: 'ua',
  })
  ua: string;
}

import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'nft-buy-tasks',
})
export class NftBuyTask extends Model {
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
  })
  topicType: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  nftBuyId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '状态 0: 未完成， 1:已完成',
  })
  status: number;
}

import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'nft-sale-tasks',
})
export class NftSaleTask extends Model {
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
    type: DataType.STRING(128),
    allowNull: false,
  })
  genesis: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  codehash: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '上架个数',
  })
  count: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  nftSaleId: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    comment: '最低价格（分）',
  })
  minAmount: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    comment: '最高价格（分）',
  })
  maxAmount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '状态 0: 未完成， 1:已完成',
  })
  status: number;
}

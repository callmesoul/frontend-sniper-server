import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'nft-buy-records',
})
export class NftBuyRecord extends Model {
  @Column({
    type: DataType.UUID,
    comment: 'id',
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  nftBuyId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  nftBuyTaskId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  orderId: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    defaultValue: 0,
  })
  genesis: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    defaultValue: 0,
  })
  codehash: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  tokenIndex: number;
}

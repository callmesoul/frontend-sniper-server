import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  freezeTableName: true,
  tableName: 'nft-sale-records',
})
export class NftSaleRecord extends Model {
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
  nftSaleId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  nftSaleTaskId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    comment: '上架时转账nft的txId',
  })
  txId: string;

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
  })
  tokenIndex: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  amount: number;
}

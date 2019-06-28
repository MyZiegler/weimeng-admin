import XianqianWebLib from "xianqian-web-lib";
import allModels from '@/models';

let ProductTable = XianqianWebLib.ModelTable({
  name: 'ProductTable',
  model: allModels.ProductModel,
});
let OrderTable = XianqianWebLib.ModelTable({
  name: 'OrderTable',
  model: allModels.OrderModel,
});
let ShopConfigTable = XianqianWebLib.ModelTable({
  name: 'OrderTable',
  model: allModels.ShopConfigModel,
});

let UserTable = XianqianWebLib.ModelTable({
  name: 'UserTable',
  model: allModels.UserModel,
});

let GroupTable = XianqianWebLib.ModelTable({
  name: 'GroupTable',
  model: allModels.GroupModel,
});

let GroupAndProductTable = XianqianWebLib.ModelTable({
  name: 'GroupAndProductTable',
  model: allModels.GroupAndProductModel,
});

let GroupAndUserTable = XianqianWebLib.ModelTable({
  name: 'GroupAndUserTable',
  model: allModels.GroupAndUserModel,
});
let CouponTable = XianqianWebLib.ModelTable({
  name: 'CouponTable',
  model: allModels.CouponModel,
});
let CouponCodeTable = XianqianWebLib.ModelTable({
  name: 'CouponCodeTable',
  model: allModels.CouponCodeModel,
});
let DiscountComboTable = XianqianWebLib.ModelTable({
  name: 'DiscountComboTable',
  model: allModels.DiscountComboModel,
});
let PayforgiftTable = XianqianWebLib.ModelTable({
  name: 'DiscountComboTable',
  model: allModels.PayforgiftModel,
});
let MemberCardTable = XianqianWebLib.ModelTable({
  name: 'DiscountComboTable',
  model: allModels.MemberCardModel,
});
let SeckillTable = XianqianWebLib.ModelTable({
  name: 'SeckillTable',
  model: allModels.SeckillModel,
});
let PackingBargainTable = XianqianWebLib.ModelTable({
  name: 'PackingBargainTableTable',
  model: allModels.PackingBargainModel,
});
let ReduceSendTable = XianqianWebLib.ModelTable({
  name: 'ReduceSendTable',
  model: allModels.ReduceSendModel,
});

let ToGetPaidTable = XianqianWebLib.ModelTable({
  name: 'ToGetPaidTable',
  model: allModels.ToGetPaidModel,
});

let CashBackTable = XianqianWebLib.ModelTable({
  name: 'CashBackTable',
  model: allModels.CashBackModel,
});

let SevenIncomeTable = XianqianWebLib.ModelTable({
  name: 'SevenIncomeTable',
  model: allModels.SevenIncomeModel,
});

let ShopMoneyTable = XianqianWebLib.ModelTable({
  name: 'ShopMoneyTable',
  model: allModels.ShopMoneyModel,
});

let FundApplyRecordTable = XianqianWebLib.ModelTable({
  name: 'FundApplyRecordTable',
  model: allModels.FundApplyRecordModel,
});

let MailTable = XianqianWebLib.ModelTable({
  name: 'MailTable',
  model: allModels.MailModel,
});

let MailAndProductTable = XianqianWebLib.ModelTable({
  name: 'MailAndProductTable',
  model: allModels.MailAndProductModel,
});

let MailRuleTable = XianqianWebLib.ModelTable({
  name: 'MailRuleTable',
  model: allModels.MailRuleModel,
});
let ListTable = XianqianWebLib.ModelTable({
  name: 'MailRuleTable',
  model: allModels.ListModel,
});
export default {
  ProductTable: ProductTable,
  OrderTable:OrderTable,
  ShopConfigTable:ShopConfigTable,
  UserTable:UserTable,
  GroupTable:GroupTable,
  GroupAndProductTable:GroupAndProductTable,
  GroupAndUserTable:GroupAndUserTable,
  CouponTable:CouponTable,
  CouponCodeTable:CouponCodeTable,
  DiscountComboTable:DiscountComboTable,
  PayforgiftTable:PayforgiftTable,
  MemberCardTable:MemberCardTable,
  SeckillTable:SeckillTable,
  PackingBargainTable:PackingBargainTable,
  ReduceSendTable:ReduceSendTable,


  ToGetPaidTable:ToGetPaidTable,
  CashBackTable:CashBackTable,
  SevenIncomeTable:SevenIncomeTable,
  ShopMoneyTable:ShopMoneyTable,
  FundApplyRecordTable:FundApplyRecordTable,
  MailTable:MailTable,
  MailAndProductTable:MailAndProductTable,
  MailRuleTable:MailRuleTable,
  ListTable:ListTable,
}

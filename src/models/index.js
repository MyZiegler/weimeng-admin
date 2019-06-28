import XianqianWebLib from "xianqian-web-lib";
import ProductLoopbackModelDefine from '@/model-definitions/product.json';
import OrderLoopbackModelDefine from '@/model-definitions/order.json';
import ShopConfigLoopbackModelDefine from '@/model-definitions/shop-config.json';
import UserLoopbackModelDefine from '@/model-definitions/user.json';
import GroupLoopbackModelDefine from '@/model-definitions/group.json';
import GroupAndProductLoopbackModelDefine from '@/model-definitions/group-and-product.json';
import GroupAndUserLoopbackModelDefine from '@/model-definitions/group-and-user.json';
import CouponLoopbackModelDefine from '@/model-definitions/coupon.json';
import CouponCodeLoopbackModelDefine from '@/model-definitions/coupon-code.json';
import DiscountComboLoopbackModelDefine from '@/model-definitions/discount-combo.json';
import PayforgiftLoopbackModelDefine from '@/model-definitions/payforgift.json';
import MemberCardLoopbackModelDefine from '@/model-definitions/member-card.json';
import SeckillLoopbackModelDefine from '@/model-definitions/seckill.json';
import PackingBargainLoopbackModelDefine from '@/model-definitions/packing-bargain.json';
import ReduceSendLoopbackModelDefine from '@/model-definitions/reduce-send.json';
import ToGetPaidLoopbackModelDefine from '@/model-definitions/to-get-paid.json';
import CashBackLoopbackModelDefine from '@/model-definitions/cashback.json';
import SevenIncomeLoopbackModelDefine from '@/model-definitions/seven-income.json';
import ShopMoneyLoopbackModelDefine from '@/model-definitions/shop-money.json';
import FundApplyRecordLoopbackModelDefine from '@/model-definitions/fund-application-record.json';
import MailModelLoopbackModelDefine from '@/model-definitions/mail.json';
import MailAndProductModelLoopbackModelDefine from '@/model-definitions/mail-and-product.json';
import MailRuleModelLoopbackModelDefine from '@/model-definitions/mail-rule.json';
import ListModelLoopbackModelDefine from '@/model-definitions/list.json';
let baseUrl = "http://192.168.31.109:3000"
let ProductModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/products',
  define: ProductLoopbackModelDefine,
});
let OrderModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/orders',
  define: OrderLoopbackModelDefine,
});
let ShopConfigModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/shop_configs',
  define: ShopConfigLoopbackModelDefine,
});

let UserModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/shopusers',
  define: UserLoopbackModelDefine,
});

let GroupModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/groups',
  define: GroupLoopbackModelDefine,
});

let GroupAndProductModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/group_and_products',
  define: GroupAndProductLoopbackModelDefine,
});

let GroupAndUserModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/group_and_users',
  define: GroupAndUserLoopbackModelDefine,
});
let CouponModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/coupons',
  define: CouponLoopbackModelDefine,
});
let CouponCodeModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/coupon_codes',
  define: CouponCodeLoopbackModelDefine,
});
let DiscountComboModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/discount_combos',
  define: DiscountComboLoopbackModelDefine,
});
let PayforgiftModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/payforgifts',
  define: PayforgiftLoopbackModelDefine,
});
let MemberCardModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/member_cards',
  define: MemberCardLoopbackModelDefine,
});
let SeckillModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/seckills',
  define: SeckillLoopbackModelDefine,
});
let PackingBargainModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/packing_bargains',
  define: PackingBargainLoopbackModelDefine,
});
let ReduceSendModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/reduce_sends',
  define: ReduceSendLoopbackModelDefine,
});
let ToGetPaidModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/toGetPaids',
  define: ToGetPaidLoopbackModelDefine,
});

let CashBackModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/cashbacks',
  define: CashBackLoopbackModelDefine,
});

let SevenIncomeModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/seven_incomes',
  define: SevenIncomeLoopbackModelDefine,
});

let ShopMoneyModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/shop_moneys',
  define: ShopMoneyLoopbackModelDefine,
});

let FundApplyRecordModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/fund_application_records',
  define: FundApplyRecordLoopbackModelDefine,
});

let MailModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/mails',
  define: MailModelLoopbackModelDefine,
});

let MailAndProductModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/mail_and_products',
  define: MailAndProductModelLoopbackModelDefine,
});

let MailRuleModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/mail_rules',
  define: MailRuleModelLoopbackModelDefine,
});


let ListModel = XianqianWebLib.LoopbackModel({
  endpoint: baseUrl+'/api/lists',
  define: ListModelLoopbackModelDefine,
});
export default {
  ProductModel:ProductModel,
  OrderModel:OrderModel,
  ShopConfigModel:ShopConfigModel,
  UserModel:UserModel,
  GroupModel:GroupModel,
  GroupAndProductModel:GroupAndProductModel,
  GroupAndUserModel:GroupAndUserModel,
  CouponModel:CouponModel,
  CouponCodeModel:CouponCodeModel,
  DiscountComboModel:DiscountComboModel,
  PayforgiftModel:PayforgiftModel,
  MemberCardModel:MemberCardModel,
  SeckillModel:SeckillModel,
  PackingBargainModel:PackingBargainModel,
  ReduceSendModel:ReduceSendModel,
  ToGetPaidModel:ToGetPaidModel,
  CashBackModel:CashBackModel,
  SevenIncomeModel:SevenIncomeModel,
  ShopMoneyModel:ShopMoneyModel,
  FundApplyRecordModel:FundApplyRecordModel,
  MailModel:MailModel,
  MailAndProductModel:MailAndProductModel,
  MailRuleModel:MailRuleModel,
  ListModel:ListModel
}

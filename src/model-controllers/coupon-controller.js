import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let CouponController = XianqianWebLib.ModelController({
  methods: {
    addCoupon(couponData, onDone) {
      allModelTables.CouponTable.create(couponData, onDone);
    },

    deleteCoupon(couponId, onDone) {
      allModelTables.CouponTable.record(couponId).delete(onDone);
    },

    editCoupon(couponId, couponData, onDone) {
      allModelTables.CouponTable.record(couponId).update(couponData, onDone);
    },

    getCouponById(couponId, onDone) {
      allModelTables.CouponTable.record(couponId).read(onDone);
    },

    getAllCoupons(onDone) {
      allModelTables.CouponTable.records(allModelTables.CouponTable.$ALL).read(onDone);
    },
  }
});

export default CouponController;

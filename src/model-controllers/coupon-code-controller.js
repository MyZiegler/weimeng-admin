import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let CouponCodeController = XianqianWebLib.ModelController({
  methods: {
    addCouponCode(couponCodeData, onDone) {
      allModelTables.CouponCodeTable.create(couponCodeData, onDone);
    },

    deleteCouponCode(couponCodeId, onDone) {
      allModelTables.CouponCodeTable.record(couponCodeId).delete(onDone);
    },

    editCouponCode(couponCodeId, couponCodeData, onDone) {
      allModelTables.CouponCodeTable.record(couponCodeId).update(couponCodeData, onDone);
    },

    getCouponCodeById(couponCodeId, onDone) {
      allModelTables.CouponCodeTable.record(couponCodeId).read(onDone);
    },

    getAllCouponCodes(onDone) {
      allModelTables.CouponCodeTable.records(allModelTables.CouponCodeTable.$ALL).read(onDone);
    },
  }
});

export default CouponCodeController;

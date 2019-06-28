import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let DiscountComboController = XianqianWebLib.ModelController({
  methods: {
    addDiscountCombo(discountComboData, onDone) {
      allModelTables.DiscountComboTable.create(discountComboData, onDone);
    },

    deleteDiscountCombo(discountComboId, onDone) {
      allModelTables.DiscountComboTable.record(discountComboId).delete(onDone);
    },

    editDiscountCombo(discountComboId, discountComboData, onDone) {
      allModelTables.DiscountComboTable.record(discountComboId).update(discountComboData, onDone);
    },

    getDiscountComboById(discountComboId, onDone) {
      allModelTables.DiscountComboTable.record(discountComboId).read(onDone);
    },

    getAllDiscountCombos(onDone) {
      allModelTables.DiscountComboTable.records(allModelTables.DiscountComboTable.$ALL).read(onDone);
    },
  }
});

export default DiscountComboController;

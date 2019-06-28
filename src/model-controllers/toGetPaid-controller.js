import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let ToGetPaidController = XianqianWebLib.ModelController({
  methods: {
    addToGetPaid(toGetPaidData, onDone) {
      allModelTables.ToGetPaidTable.create(toGetPaidData, onDone);
    },

    deleteToGetPaid(toGetPaidId, onDone) {
      allModelTables.ToGetPaidTable.record(toGetPaidId).delete(onDone);
    },

    editToGetPaid(toGetPaidId, toGetPaidData, onDone) {
      allModelTables.ToGetPaidTable.record(toGetPaidId).update(toGetPaidData, onDone);
    },

    getToGetPaidById(toGetPaidId, onDone) {
      allModelTables.ToGetPaidTable.record(toGetPaidId).read(onDone);
    },

    getAllToGetPaids(onDone) {
      allModelTables.ToGetPaidTable.records(allModelTables.ToGetPaidTable.$ALL).read(onDone);
    }
  }
});

export default ToGetPaidController;

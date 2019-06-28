import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let PayforgiftController = XianqianWebLib.ModelController({
  methods: {
    addPayforgift(payforgiftData, onDone) {
      allModelTables.PayforgiftTable.create(payforgiftData, onDone);
    },

    deletePayforgift(payforgiftId, onDone) {
      allModelTables.PayforgiftTable.record(payforgiftId).delete(onDone);
    },

    editPayforgift(payforgiftId, payforgiftData, onDone) {
      allModelTables.PayforgiftTable.record(payforgiftId).update(payforgiftData, onDone);
    },

    getPayforgiftById(payforgiftId, onDone) {
      allModelTables.PayforgiftTable.record(payforgiftId).read(onDone);
    },

    getAllPayforgifts(onDone) {
      allModelTables.PayforgiftTable.records(allModelTables.PayforgiftTable.$ALL).read(onDone);
    },
  }
});

export default PayforgiftController;

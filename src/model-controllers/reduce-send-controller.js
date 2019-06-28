import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let ReduceSendController = XianqianWebLib.ModelController({
  methods: {
    addReduceSend(reduceSendData, onDone) {
      allModelTables.ReduceSendTable.create(reduceSendData, onDone);
    },

    deleteReduceSend(reduceSendId, onDone) {
      allModelTables.ReduceSendTable.record(reduceSendId).delete(onDone);
    },

    editReduceSend(reduceSendId, reduceSendData, onDone) {
      allModelTables.ReduceSendTable.record(reduceSendId).update(reduceSendData, onDone);
    },

    getReduceSendById(reduceSendId, onDone) {
      allModelTables.ReduceSendTable.record(reduceSendId).read(onDone);
    },

    getAllReduceSends(onDone) {
      allModelTables.ReduceSendTable.records(allModelTables.ReduceSendTable.$ALL).read(onDone);
    },
  }
});

export default ReduceSendController;

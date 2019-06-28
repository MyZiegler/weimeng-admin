import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let CashBackController = XianqianWebLib.ModelController({
    methods: {
        addCashBack(objData, onDone) {
            allModelTables.CashBackTable.create(objData, onDone);
        },

        deleteCashBack(objId, onDone) {
            allModelTables.CashBackTable.record(objId).delete(onDone);
        },

        editCashBack(objId, objData, onDone) {
            allModelTables.CashBackTable.record(objId).update(objData, onDone);
        },

        getCashBackById(objId, onDone) {
            allModelTables.CashBackTable.record(objId).read(onDone);
        },

        getAllCashBacks(onDone) {
            allModelTables.CashBackTable.records(allModelTables.CashBackTable.$ALL).read(onDone);
        },
    }
});

export default CashBackController;

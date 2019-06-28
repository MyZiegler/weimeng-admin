import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let FundApplyRecordController = XianqianWebLib.ModelController({
    methods: {
        addFundApplyRecord(objData, onDone) {
            allModelTables.FundApplyRecordTable.create(objData, onDone);
        },

        deleteFundApplyRecord(objId, onDone) {
            allModelTables.FundApplyRecordTable.record(objId).delete(onDone);
        },

        editFundApplyRecord(objId, objData, onDone) {
            allModelTables.FundApplyRecordTable.record(objId).update(objData, onDone);
        },

        getFundApplyRecordById(objId, onDone) {
            allModelTables.FundApplyRecordTable.record(objId).read(onDone);
        },

        getAllFundApplyRecords(onDone) {
            allModelTables.FundApplyRecordTable.records(allModelTables.FundApplyRecordTable.$ALL).read(onDone);
        },
    }
});

export default FundApplyRecordController;

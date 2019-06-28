import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let SevenIncomeController = XianqianWebLib.ModelController({
    methods: {
        addSevenIncome(objData, onDone) {
            allModelTables.SevenIncomeTable.create(objData, onDone);
        },

        deleteSevenIncome(objId, onDone) {
            allModelTables.SevenIncomeTable.record(objId).delete(onDone);
        },

        editSevenIncome(objId, objData, onDone) {
            allModelTables.SevenIncomeTable.record(objId).update(objData, onDone);
        },

        getSevenIncomeById(objId, onDone) {
            allModelTables.SevenIncomeTable.record(objId).read(onDone);
        },

        getAllSevenIncomes(onDone) {
            allModelTables.SevenIncomeTable.records(allModelTables.SevenIncomeTable.$ALL).read(onDone);
        },
    }
});

export default SevenIncomeController;

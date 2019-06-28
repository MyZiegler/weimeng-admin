import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let MailAndProductController = XianqianWebLib.ModelController({
    methods: {
        addMailAndProduct(objData, onDone) {
            allModelTables.MailAndProductTable.create(objData, onDone);
        },

        deleteMailAndProduct(objId, onDone) {
            allModelTables.MailAndProductTable.record(objId).delete(onDone);
        },

        editMailAndProduct(objId, objData, onDone) {
            allModelTables.MailAndProductTable.record(objId).update(objData, onDone);
        },

        getMailAndProductById(objId, onDone) {
            allModelTables.MailAndProductTable.record(objId).read(onDone);
        },

        getAllMailAndProducts(onDone) {
            allModelTables.MailAndProductTable.records(allModelTables.MailAndProductTable.$ALL).read(onDone);
        },
    }
});

export default MailAndProductController;

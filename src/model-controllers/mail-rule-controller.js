import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let MailRuleController = XianqianWebLib.ModelController({
    methods: {
        addMailRule(objData, onDone) {
            allModelTables.MailRuleTable.create(objData, onDone);
        },

        deleteMailRule(objId, onDone) {
            allModelTables.MailRuleTable.record(objId).delete(onDone);
        },

        editMailRule(objId, objData, onDone) {
            allModelTables.MailRuleTable.record(objId).update(objData, onDone);
        },

        getMailRuleById(objId, onDone) {
            allModelTables.MailRuleTable.record(objId).read(onDone);
        },

        getAllMailRules(onDone) {
            allModelTables.MailRuleTable.records(allModelTables.MailRuleTable.$ALL).read(onDone);
        },
    }
});

export default MailRuleController;

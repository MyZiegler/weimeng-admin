import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let MailController = XianqianWebLib.ModelController({
    methods: {
        addMail(objData, onDone) {
            allModelTables.MailTable.create(objData, onDone);
        },

        deleteMail(objId, onDone) {
            allModelTables.MailTable.record(objId).delete(onDone);
        },

        editMail(objId, objData, onDone) {
            allModelTables.MailTable.record(objId).update(objData, onDone);
        },

        getMailById(objId, onDone) {
            allModelTables.MailTable.record(objId).include([
              {
                relation:"selectedProduct",
                scope:{
                  fields:['product_name'],
                }
              },
              {
                relation:"mailRule",
                scope:{
                  fields:[
                    "mail_id",
                    "city_list",
                    "money_limit",
                    "amount_limit"
                  ]
                }
              }
            ]).read(onDone);
        },

        getAllMails(onDone) {
            allModelTables.MailTable.records(allModelTables.MailTable.$All).read(onDone);
        },
    }
});

export default MailController;

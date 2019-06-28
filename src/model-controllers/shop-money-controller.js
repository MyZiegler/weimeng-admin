import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let ShopMoneyController = XianqianWebLib.ModelController({
    methods: {
        addShopMoney(objData, onDone) {
            allModelTables.ShopMoneyTable.create(objData, onDone);
        },

        deleteShopMoney(objId, onDone) {
            allModelTables.ShopMoneyTable.record(objId).delete(onDone);
        },

        editShopMoney(objId, objData, onDone) {
            allModelTables.ShopMoneyTable.record(objId).update(objData, onDone);
        },

        getShopMoneyById(objId, onDone) {
            allModelTables.ShopMoneyTable.record(objId).read(onDone);
        },

        getAllShopMoneys(onDone) {
            allModelTables.ShopMoneyTable.records(allModelTables.ShopMoneyTable.$ALL).read(onDone);
        },
    }
});

export default ShopMoneyController;

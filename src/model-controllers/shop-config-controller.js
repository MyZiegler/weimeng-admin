import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let ShopConfigController = XianqianWebLib.ModelController({
  methods: {
    addShopConfig(shopConfigData, onDone) {
      allModelTables.ShopConfigTable.create(shopConfigData, onDone);
    },

    deleteShopConfig(shopConfigId, onDone) {
      allModelTables.ShopConfigTable.record(shopConfigId).delete(onDone);
    },

    editShopConfig(shopConfigId, shopConfigData, onDone) {
      allModelTables.ShopConfigTable.record(shopConfigId).update(shopConfigData, onDone);
    },

    getShopConfigById(shopConfigId, onDone) {
      allModelTables.ShopConfigTable.record(shopConfigId).read(onDone);
    },

    getAllShopConfigs(onDone) {
      allModelTables.ShopConfigTable.records(allModelTables.ShopConfigTable.$ALL).read(onDone);
    },
  }
});

export default ShopConfigController;

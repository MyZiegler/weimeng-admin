import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let PackingBargainController = XianqianWebLib.ModelController({
  methods: {
    addPackingBargain(packingBargainData, onDone) {
      allModelTables.PackingBargainTable.create(packingBargainData, onDone);
    },

    deletePackingBargain(packingBargainId, onDone) {
      allModelTables.PackingBargainTable.record(packingBargainId).delete(onDone);
    },

    editPackingBargain(packingBargainId, packingBargainData, onDone) {
      allModelTables.PackingBargainTable.record(packingBargainId).update(packingBargainData, onDone);
    },

    getPackingBargainById(packingBargainId, onDone) {
      allModelTables.PackingBargainTable.record(packingBargainId).read(onDone);
    },

    getAllPackingBargains(onDone) {
      allModelTables.PackingBargainTable.records(allModelTables.PackingBargainTable.$ALL).read(onDone);
    },
  }
});

export default PackingBargainController;

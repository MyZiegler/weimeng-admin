import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let ListController = XianqianWebLib.ModelController({
  methods: {
    addList(listData, onDone) {
      allModelTables.ListTable.create(listData, onDone);
    },

    deleteList(listId, onDone) {
      allModelTables.ListTable.record(listId).delete(onDone);
    },

    editList(listId, listData, onDone) {
      allModelTables.ListTable.record(listId).update(listData, onDone);
    },

    getListById(listId, onDone) {
      allModelTables.ListTable.record(listId).read(onDone);
    },

    getAllLists(onDone) {
      allModelTables.ListTable.records(allModelTables.ListTable.$ALL).read(onDone);
    },

  }
});

export default ListController;

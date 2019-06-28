import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let GroupController = XianqianWebLib.ModelController({
  methods: {
    addGroup(groupData, onDone) {
      allModelTables.GroupTable.create(groupData, onDone);
    },

    deleteGroup(groupId, onDone) {
      allModelTables.GroupTable.record(groupId).delete(onDone);
    },

    editGroup(groupId, groupData, onDone) {
      allModelTables.GroupTable.record(groupId).update(groupData, onDone);
    },

    getGroupById(groupId, onDone) {
      allModelTables.GroupTable.record(groupId).read(onDone);
    },

    getAllGroups(onDone) {
      allModelTables.GroupTable.records(allModelTables.GroupTable.$ALL).read(onDone);
    },
  }
});

export default GroupController;

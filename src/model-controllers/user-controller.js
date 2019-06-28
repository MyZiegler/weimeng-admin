import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let UserController = XianqianWebLib.ModelController({
  methods: {
    addUser(userData, onDone) {
      allModelTables.UserTable.create(userData, onDone);
    },

    deleteUser(userId, onDone) {
      allModelTables.UserTable.record(userId).delete(onDone);
    },

    editUser(userId, userData, onDone) {
      allModelTables.UserTable.record(userId).update(userData, onDone);
    },

    getUserById(userId, onDone) {
      allModelTables.UserTable.record(userId).read(onDone);
    },

    getAllUsers(onDone) {
      allModelTables.UserTable.records(allModelTables.UserTable.$ALL).read(onDone);
    },
    getUsersBySearch(val,onDone){
      allModelTables.UserTable.records({
        or:[
          {
          "nickName":{"like":"%"+ val +"%"}
          },
          {
          "user_phone":{"like":"%"+ val +"%"}
          },
        ]
      }).read(onDone);
    }
  }
});

export default UserController;

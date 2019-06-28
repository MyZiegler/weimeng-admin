import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let OrderController = XianqianWebLib.ModelController({
  methods: {
    addOrder(orderData, onDone) {
      allModelTables.OrderTable.create(orderData, onDone);
    },

    deleteOrder(orderId, onDone) {
      allModelTables.OrderTable.record(orderId).delete(onDone);
    },

    editOrder(orderId, orderData, onDone) {
      allModelTables.OrderTable.record(orderId).update(orderData, onDone);
    },

    getOrderById(orderId, onDone) {
      allModelTables.OrderTable.record(orderId).read(onDone);
    },

    getAllOrders(onDone) {
      allModelTables.OrderTable.records(allModelTables.OrderTable.$ALL).include([
        'order_product',
        'order_user'
      ]).read(onDone);
    },
  }
});

export default OrderController;

import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let ProductController = XianqianWebLib.ModelController({
  methods: {
    addProduct(productData, onDone) {
      allModelTables.ProductTable.create(productData, onDone);
    },

    deleteProduct(productId, onDone) {
      allModelTables.ProductTable.record(productId).delete(onDone);
    },

    editProduct(productId, productData, onDone) {
      allModelTables.ProductTable.record(productId).update(productData, onDone);
    },

    getProductById(productId, onDone) {
      allModelTables.ProductTable.record(productId).read(onDone);
    },

    getAllProducts(onDone) {
      allModelTables.ProductTable.records(allModelTables.ProductTable.$ALL).read(onDone);
    },

  }
});

export default ProductController;

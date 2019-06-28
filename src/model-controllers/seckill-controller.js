import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let SeckillController = XianqianWebLib.ModelController({
  methods: {
    addSeckill(seckillData, onDone) {
      allModelTables.SeckillTable.create(seckillData, onDone);
    },

    deleteSeckill(seckillId, onDone) {
      allModelTables.SeckillTable.record(seckillId).delete(onDone);
    },

    editSeckill(seckillId, seckillData, onDone) {
      allModelTables.SeckillTable.record(seckillId).update(seckillData, onDone);
    },

    getSeckillById(seckillId, onDone) {
      allModelTables.SeckillTable.record(seckillId).read(onDone);
    },

    getAllSeckills(onDone) {
      allModelTables.SeckillTable.records(allModelTables.SeckillTable.$ALL).read(onDone);
    },
  }
});

export default SeckillController;

import XianqianWebLib from "xianqian-web-lib";
import allModelTables from '@/model-tables';

let MemberCardController = XianqianWebLib.ModelController({
  methods: {
    addMemberCard(memberCardData, onDone) {
      allModelTables.MemberCardTable.create(memberCardData, onDone);
    },

    deleteMemberCard(memberCardId, onDone) {
      allModelTables.MemberCardTable.record(memberCardId).delete(onDone);
    },

    editMemberCard(memberCardId, memberCardData, onDone) {
      allModelTables.MemberCardTable.record(memberCardId).update(memberCardData, onDone);
    },

    getMemberCardById(memberCardId, onDone) {
      allModelTables.MemberCardTable.record(memberCardId).read(onDone);
    },

    getAllMemberCards(onDone) {
      allModelTables.MemberCardTable.records(allModelTables.MemberCardTable.$ALL).read(onDone);
    },
  }
});

export default MemberCardController;

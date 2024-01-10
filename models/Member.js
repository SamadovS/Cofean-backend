// MEMBER SERVICE MODEL (file nomi js shu fileni class sifatida qabul qilishi uchun bosh harfda yozildi)
const {
  shapeIntoMongooseObjectId,
  lookup_auth_member_following,
  lookup_auth_member_liked,
} = require("../lib/config");
const Definer = require("../lib/mistake");
const MemberModel = require("../schema/member.model");
const assert = require("assert");
const bcrypt = require("bcryptjs");
const View = require("./View");
const Like = require("./Like");

class Member {
  constructor() {
    this.memberModel = MemberModel;
  }
  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);

      const new_member = new this.memberModel(input);
      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        throw new Error(Definer.mongo_valid_err1);
      }
      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();
      assert.ok(member, Definer.auth_err3);
      console.log("member >>>", member);

      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      );
      assert.ok(isMatch, Definer.auth_err4);

      const result = await this.memberModel
        .findOne({ mb_nick: input.mb_nick })
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }

  // async getChosenMemberData(member, id) {
  //   try {
  //     const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
  //     id = shapeIntoMongooseObjectId(id);
  //     console.log("member: :", member);

  //     let aggregationQuery = [
  //       { $match: { _id: id, mb_status: "ACTIVE" } },
  //       { $unset: "mb_password" },
  //     ];

  //     if (member) {
  //       await this.viewChosenItemByMember(member, id, "member");

  //       // todo: check auth member liked the chosen member
  //       aggregationQuery.push(lookup_auth_member_liked(auth_mb_id));
  //       aggregationQuery.push(
  //         lookup_auth_member_following(auth_mb_id, "members")
  //       );
  //     }

  //     const result = await this.memberModel.aggregate(aggregationQuery).exec();

  //     assert.ok(result, Definer.general_err2);
  //     return result[0];
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async viewChosenItemByMember(member, view_ref_id, group_type) {
  //   try {
  //     view_ref_id = shapeIntoMongooseObjectId(view_ref_id);
  //     const mb_id = shapeIntoMongooseObjectId(member._id);
  //     const view = new View(mb_id);

  //     // validation needed
  //     const isValid = await view.validateChosenTarget(view_ref_id, group_type);
  //     console.log("isValid:::", isValid);
  //     assert.ok(isValid, Definer.general_err2);

  //     // logged user has seen target before
  //     const doesExist = await view.checkViewExistence(view_ref_id);
  //     console.log("doesExist : ", doesExist);

  //     if (!doesExist) {
  //       const result = await view.insertMemberView(view_ref_id, group_type);
  //       assert.ok(result, Definer.general_err1);
  //     }
  //     return true;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async likeChosenItemByMember(member, like_ref_id, group_type) {
  //   try {
  //     like_ref_id = shapeIntoMongooseObjectId(like_ref_id);
  //     const mb_id = shapeIntoMongooseObjectId(member._id);

  //     const like = new Like(mb_id);
  //     const isValid = await like.validateTargetItem(like_ref_id, group_type);
  //     // console.log("isValid:::", isValid);
  //     assert.ok(isValid, Definer.general_err2);

  //     const doesExist = await like.checkLikeExistence(like_ref_id);
  //     console.log("doesExist>>>", doesExist);

  //     let data = doesExist
  //       ? await like.removeMemberLike(like_ref_id, group_type)
  //       : await like.insertMemberLike(like_ref_id, group_type);
  //     assert.ok(data, Definer.general_err1);

  //     const result = {
  //       like_group: data.like_group,
  //       like_ref_id: data.like_ref_id,
  //       like_status: doesExist ? 0 : 1,
  //     };
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

module.exports = Member;
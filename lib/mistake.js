class Definer {
  /** general errors */
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that params!";
  static general_err3 = "att: file upload error!";

  /** member auth related errors */
  static auth_err1 = "att: you are not authenticated!";
  static auth_err2 = "att: jwt token creation error";
  static auth_err3 = "att: no member with that mb_nick!";
  static auth_err4 = "att: your credentials do not match!";

  /** products related errors */
  static product_err1 = "att: product creation is failed!";

  /** orders related errors */
  static order_err1 = "att: order creation is failed!";
  static order_err2 = "att: order item creation is failed!";
  static order_err3 = "att: no orders with that params exists!";

  /** posts related errors */
  static post_err1 = "att: author member for posts not provided!";
  static post_err2 = "att: no posts found for that member!";
  static post_err3 = "att: no posts found for that target!";

  /** follow related errors */
  static follow_err1 = "att: self subscription is denied!";
  static follow_err2 = "att: new follow subscription is failed!";
  static follow_err3 = "att: no follow data found!";

  /** mongodb related errors */
  static mongo_valid_err1 = "att: mongodb validation is failed!";
}

module.exports = Definer;

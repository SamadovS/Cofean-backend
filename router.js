const express = require("express");
const router = express.Router();
const cafeController = require("./controllers/cafeController");
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
// const followController = require("./controllers/followController");
// const communityController = require("./controllers/communityController");
const orderController = require("./controllers/orderController");

/********************
 *     REST API     *
 ********************/

// Member related routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

// Product related routers
router.post(
  "/products",
  memberController.retrieveAuthMember,
  productController.getAllProducts
);
router.get(
  "/products/:id",
  memberController.retrieveAuthMember,
  productController.getChosenProduct
);

// Cafe related routers
router.get(
  "/cafes",
  memberController.retrieveAuthMember,
  cafeController.getCafes
);
router.get(
  "/cafes/:id",
  memberController.retrieveAuthMember,
  cafeController.getChosenCafe
);

// Order related routers
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);
router.get(
  "/orders",
  memberController.retrieveAuthMember,
  orderController.getMyOrders
);
// router.post(
//   "/orders/edit",
//   memberController.retrieveAuthMember,
//   orderController.editChosenOrder
// );

// // Community related routers
// router.post(
//   "/community/image",
//   uploader_community.single("community_image"),
//   communityController.imageInsertion
// );
// router.post(
//   "/community/create",
//   memberController.retrieveAuthMember,
//   communityController.createArticle
// );
// router.get(
//   "/community/articles",
//   memberController.retrieveAuthMember,
//   communityController.getMemberArticles
// );
// router.get(
//   "/community/target",
//   memberController.retrieveAuthMember,
//   communityController.getArticles
// );
// router.get(
//   "/community/single-article/:art_id",
//   memberController.retrieveAuthMember,
//   communityController.getChosenArticle
// );

// // Following related routers
// router.post(
//   "/follow/subscribe",
//   memberController.retrieveAuthMember,
//   followController.subscribe
// );
// router.post(
//   "/follow/unsubscribe",
//   memberController.retrieveAuthMember,
//   followController.unsubscribe
// );
// router.get("/follow/followings", followController.getMemberFollowings);
// router.get(
//   "/follow/followers",
//   memberController.retrieveAuthMember,
//   // yuqoridan farqli o'laroq, kim req. qilayotgani kk. menga follower bo'lgan
//   // userga, bu authenticated user follow bo'lganmi, yo'qmi?
//   followController.getMemberFollowers
// );

module.exports = router;

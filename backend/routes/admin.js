const router = require("express").Router()
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const adminOnly = require("../middlewares/adminOnly")

// 📌 GET ALL USERS
router.get("/users", adminOnly, async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/stats", adminOnly, async (req, res) => {
  try {
    const [usersCount, postsCount, commentsCount, latestUsers, latestPosts, latestComments] =
      await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),

        User.find().sort({ createdAt: -1 }).limit(5),
        Post.find().sort({ createdAt: -1 }).limit(5),
        Comment.find().sort({ createdAt: -1 }).limit(5)
      ]);

    res.json({
      users: usersCount,
      posts: postsCount,
      comments: commentsCount,
      latestUsers,
      latestPosts,
      latestComments
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// 📌 DELETE USER
router.delete("/user/:id", adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    await Post.deleteMany({ userId: req.params.id })
    await Comment.deleteMany({ userId: req.params.id })

    res.status(200).json("User deleted by admin")
  } catch (err) {
    res.status(500).json(err)
  }
})

// 📌 MAKE ADMIN
router.put("/make-admin/:id", adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    )

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// 📌 GET ALL POSTS
router.get("/posts", adminOnly, async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

// 📌 DELETE POST
router.delete("/post/:id", adminOnly, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ postId: req.params.id })

    res.status(200).json("Post deleted by admin")
  } catch (err) {
    res.status(500).json(err)
  }
})

// 📌 GET ALL COMMENTS
router.get("/comments", adminOnly, async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userId", "username email")
      .populate("postId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 📌 DELETE COMMENT
router.delete("/comment/:id", adminOnly, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json("Comment deleted by admin")
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
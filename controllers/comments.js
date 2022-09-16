const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
      try {
        await Comment.create({
          comment: req.body.comment,
          user: req.user.id,
          likes: 0,
          post: req.params.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+req.params.id); //follow route go back to server js to start
      } catch (err) {
        console.log(err); 
      }
    },
    deleteComment: async (req, res) => {
      try {
        // Find comment by id
        console.log(req.params.id)
        console.log('we\'re in the delet comment bit')
        let comment = await Comment.findById(req.params.id); //this finds the comment id
        console.log(comment)
        await Comment.findOneAndDelete({ _id: req.params.id });
        console.log("Deleted Comment");
        res.redirect(`/post/${comment.post}`);
      } catch (err) {
        console.log(err)
        // res.redirect("/post/"+comment.post);
      }
    },
  };
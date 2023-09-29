const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    // Check if a chat with these members already exists
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    // Create a new chat if it doesn't exist
    const newChat = new chatModel({
      members: [firstId, secondId],
    });

    const response = await newChat.save();

    res.status(201).json(response); // Use 201 status code for resource creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" }); // Return a generic error message
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
        const chats = await chatModel.find({
           members: { $in: [userId] }, // Use userId directly, not in an object
    });

    res.status(200).json(chats);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" }); // Use 404 status code for not found
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createChat, findUserChats, findChat };

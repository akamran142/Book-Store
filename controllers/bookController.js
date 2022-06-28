const bookModel = require("../model/bookModel");

// get req
const getAllBooks = async (req, res, next) => {
  let getBooks;
  try {
    getBooks = await bookModel.find();
  } catch (error) {
    console.log(error);
  }

  if (!getBooks) {
    return res.status(404).json({ message: "No product found" });
  } else {
    return res.status(200).json({ getBooks });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let getBook;
  try {
    getBook = await bookModel.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!getBook) {
    return res.status(404).json({ message: "No product found" });
  } else {
    return res.status(200).json({ getBook });
  }
};

//post req
const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image } = req.body; //object destructuring
  let sendBook;
  try {
    (sendBook = new bookModel({
      // bcoz i have to post data to bookModel so i created new instance with bookModel
      name,
      author,
      description,
      price,
      available,
      image
    })),
      await sendBook.save(); // to save data in db mongodb has save function
  } catch (error) {
    console.log(error);
  }

  if (!sendBook) {
    return res.status(500).json({ message: "Unable to Add" });
  } else {
    return res.status(201).json({ sendBook });
  }
};

//update req
const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  let addChanges;
  try {
    addChanges = await bookModel.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image
    });
    addChanges = await addChanges.save();
  } catch (error) {
    console.log(error);
  }
  if (!addChanges) {
    return res.status(404).json({ message: "Unable to update by this Id" });
  } else {
    return res.status(200).json({ addChanges });
  }
};

// delete req
const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let delBook;
    try {
      delBook = await bookModel.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);
    }
    if (!deleteBook) {
      return res.status(404).json({ message: "Unable to delete book" });
    } else {
      return res.status(200).json({ message: "Product Successfully deleted" });
    }
  };

exports.getAllBooks = getAllBooks;
exports.getById = getById;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;

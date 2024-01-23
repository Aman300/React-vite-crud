const contact = require("../Models/contact");

exports.createContact = async (req, res) => {
  try {
    console.log(req.body);
    let isCreated = await contact.create(req.body);

    if (!isCreated) {
      return res.status(404).send({
        status: false,
        message: "Contact not created something went worng",
      });
    }

    return res.status(201).send({
      status: true,
      message: "Contact has been created successfully",
      data: isCreated,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getContact = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    const total = await contact.countDocuments();
    const users = await contact.find().skip(skip).limit(size);

    return res.status(200).send({
      status: true,
      message: "Contact fetch successfully",
      data: users,
      total,
      page,
      size,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    let isDeleted = await contact.findByIdAndDelete(req.params.id);

    if (!isDeleted) {
      return res.status(404).send({
        status: false,
        message: "Contact not deleted something went worng",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact deleted successfully",
      data: isDeleted,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getSingleContact = async (req, res) => {
  try {
    let isSingleContact = await contact.findById(req.params.id);

    if (!isSingleContact) {
      return res.status(404).send({
        status: false,
        message: "Contact not fetch something went worng",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact fetch successfully",
      data: isSingleContact,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateContact = async (req, res) => {
  try {
    let isUpdate = await contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!isUpdate) {
      return res.status(404).send({
        status: false,
        message: "Contact not updated something went worng",
      });
    }

    return res.status(201).send({
      status: true,
      message: "Contact updated successfully",
      data: isUpdate,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.searchContact = async (req, res) => {
  try {
    let isSearch = await contact.find({
      $or: [
        { contactName: { $regex: req.params.search, $options: "i" } },
        // { contactNumber: { $regex: req.params.search, $options: "i" } },
        { address: { $regex: req.params.search, $options: "i" } },
      ],
    });

    if (!isSearch) {
      return res.status(404).send({
        status: false,
        message: "Contact not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact found successfully",
      data: isSearch,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.pagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    let contact = await contact.find({});
    // Calculate the start and end indexes for the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    // Slice the products array based on the indexes
    const paginatedContact = await contact.slice(startIndex, endIndex);
    // Calculate the total number of pages
    const totalPages = Math.ceil(contact.length / pageSize);

    if (!paginatedContact) {
      return res.status(404).send({
        status: false,
        message: "Contact not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact found successfully",
      data: { paginatedContact, totalPages },
    });

    // Return the current page, total pages, and products on the page
  } catch (e) {
    console.log(e);
  }
};

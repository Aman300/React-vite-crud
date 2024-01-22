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
    let isContact = await contact.find({});

    if (!isContact) {
      return res.status(404).send({
        status: false,
        message: "Contact not fetch something went worng",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Contact fetch successfully",
      data: isContact,
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

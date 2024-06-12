const createError = require("../utils/createErrors");
const Gig = require("../models/gig.model");

exports.createGig = async (req, res, next) => {
  if (!req.isSeller) return next(createError(403, "You are not a seller"));

  const gig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await gig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

exports.deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userId != req.userId)
      return next(createError(403, "You can delete only your gig"));

    await Gig.findByIdAndDelete(gig);

    res.status(200).json("Gig has been deleted");
  } catch (error) {
    next(error);
  }
};

exports.getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

exports.getGigs = async (req, res, next) => {
  // const filters = {
  //   cat: "web development",
  //   price: { $gt: 3000 },
  //   title: { $regex: "create" },
  // };

  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...(q.min ||
      (q.max && {
        price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
      })),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters).sort({[q.sort]:1});

    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};

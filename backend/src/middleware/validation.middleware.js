import Joi from "joi";

export const validateSong = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    albumId: Joi.string().optional().allow(null, ""),
    duration: Joi.number().required(),
    genre: Joi.string().optional().allow(""),
    isFeatured: Joi.boolean().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateAlbum = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    releaseYear: Joi.number().required(),
    imageUrl: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

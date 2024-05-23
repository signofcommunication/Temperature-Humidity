import mongoose from "mongoose";

const TanamanSchema = new mongoose.Schema(
  {
    Tanaman_ID: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Automatically generate ObjectID
      index: true,
      unique: true,
    },
    Nama: {
      type: String,
      required: true,
    },
    Suhu: {
      type: Number,
      required: true,
    },
    Kelembapan: {
      type: Number,
      required: true,
    },
    Panen: {
      type: Number,
      required: true,
    },
    Keterangan: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// TanamanSchema.virtual("Tanaman_ID").get(function () {
//   return this._id;
// });

TanamanSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.Tanaman_ID = ret._id;
    delete ret._id;
  },
});

export default mongoose.models.Tanaman ||
  mongoose.model("Tanaman", TanamanSchema);

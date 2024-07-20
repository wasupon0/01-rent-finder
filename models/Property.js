import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      station: {
        type: String,
      },
      ward: {
        type: String,
      },
      city: {
        type: String,
      },
      floor: {
        type: String,
      },
    },
    age: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    square_meter: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    cost: {
      monthly: {
        type: Number,
      },
      fee: {
        type: Number,
      },
      deposit: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;

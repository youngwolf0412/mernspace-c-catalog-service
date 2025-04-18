/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Schema } from "mongoose";
import { Attribute, Category, PriceConfiguration } from "./category-types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const priceConfigurationSchema = new mongoose.Schema<PriceConfiguration>(
    {
        priceType: {
            type: String,
            enum: ["base", "aditional"],
            required: true,
        },
        availableOptions: {
            type: [String],
            required: true,
        },
    },
    { _id: false },
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const attributeSchema = new mongoose.Schema<Attribute>(
    {
        name: {
            type: String,
            required: true,
        },
        widgetType: {
            type: String,
            enum: ["switch", "radio"],
            required: true,
        },
        defaultValue: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            type: Schema.Types.Mixed,
            required: true,
        },
        availableOptions: {
            type: [String],
            required: true,
        },
    },
    { _id: false },
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const categorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true,
    },
    priceConfiguration: {
        type: Map,
        of: priceConfigurationSchema,
        required: true,
    },
    attributes: {
        type: [attributeSchema],
        required: true,
    },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
export default mongoose.model("Category", categorySchema);

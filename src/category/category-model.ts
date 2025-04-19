import mongoose, { Schema } from "mongoose";

const priceConfigurationSchema = new mongoose.Schema(
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

const attributeSchema = new mongoose.Schema(
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

const categorySchema = new Schema({
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

export default mongoose.model("Category", categorySchema);

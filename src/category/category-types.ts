import mongoose from "mongoose";

export interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id?: mongoose.Types.ObjectId;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = exports.getParticularProperty = exports.getAllProperties = void 0;
const Properties_1 = require("@/models/Properties");
const getAllProperties = async (req, res) => {
    try {
        const { skip, limit, propertyType, selectedCountry, beds, bedrooms, bathroom, isEnabled, allowCooking, allowParty, allowPets, minPrice, maxPrice } = (await req.body);
        console.log("request body: ", skip, limit, propertyType, selectedCountry, beds, bedrooms, bathroom, isEnabled, allowCooking, allowParty, allowPets);
        const query = {};
        if (propertyType.length) {
            query["propertyType"] = { $in: propertyType };
        }
        if (selectedCountry.length) {
            query["country"] = { $in: selectedCountry };
        }
        if (beds !== undefined && beds !== null && beds > 0) {
            query["beds"] = { $gte: beds };
        }
        if (bathroom !== undefined && bathroom !== null && bathroom > 0) {
            query["bathroom"] = { $gte: bathroom };
        }
        if (bedrooms !== undefined && bedrooms !== null && bedrooms > 0) {
            query["bedrooms"] = { $gte: bedrooms };
        }
        if (minPrice !== undefined && minPrice !== null && minPrice > 10) {
            query["basePrice"] = { $gte: minPrice };
        }
        if (maxPrice !== undefined && maxPrice !== null && maxPrice < 5000) {
            query["basePrice"] = { $lte: maxPrice };
        }
        if (isEnabled) {
            query['rentalType'] = "Long Term";
        }
        if (allowCooking) {
            query['cooking'] = "Allow";
        }
        if (allowParty) {
            query['party'] = "Allow";
        }
        if (allowPets) {
            query['pet'] = "Allow";
        }
        console.log("query: ", query);
        const pipeline = [];
        if (Object.keys(query).length > 0) {
            pipeline.push({ $match: query }, { $skip: skip });
        }
        else {
            pipeline.push({ $sample: { size: limit } });
        }
        pipeline.push({ $limit: limit });
        const properties = await Properties_1.Properties.aggregate(pipeline);
        console.log("properties: ", properties.length);
        res.json({ success: true, data: properties });
    }
    catch (err) {
        res.json({ error: "Unable to fetch Properties", status: 400 });
    }
};
exports.getAllProperties = getAllProperties;
const getParticularProperty = async (req, res) => {
    try {
        const { propertyId } = req.body;
        const particularProperty = await Properties_1.Properties.findById(propertyId);
        res.send({ data: particularProperty, status: 200 });
    }
    catch (err) {
        res.json({ error: "Unable to fetch Particular Property", status: 400 });
    }
};
exports.getParticularProperty = getParticularProperty;
const getProperties = async (req, res) => {
    try {
        const property = await Properties_1.Properties.find({}, { center: 1 });
        if (!property) {
            res.status(404).json({ error: "No property found", status: 404 });
        }
        res.json({ data: property, status: 200 });
    }
    catch (err) {
        res.status(500).json({ error: "Unable to fetch property", status: 500 });
    }
};
exports.getProperties = getProperties;
//# sourceMappingURL=PropertyController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new PostSchema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        deadline: {
            type: String,
            required: true,
        },
        team: [
            {
                email: {
                    type: String,
                    required: true,
                },
                role: {
                    type: String,
                    enum: ["owner", "member"],
                },
            },
        ],
        tasks: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);
const projectModel = mongoose.model("project", ProjectSchema);
module.exports = projectModel;

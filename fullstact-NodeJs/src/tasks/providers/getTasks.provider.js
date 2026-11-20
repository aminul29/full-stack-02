const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTasksProvider(req, res) {
    const query = matchedData(req, { locations: ["query"] });
    const limit = query.limit ?? 10;
    const page = query.page ?? 1;
    const order = query.order ?? "desc";
    const sortDirection = order === "asc" ? 1 : -1;
    const filter = {};

    if (query.status) {
        filter.status = query.status;
    }

    if (query.priority) {
        filter.priority = query.priority;
    }

    if (query.search) {
        const escapedSearch = query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        filter.$or = [
            { title: { $regex: escapedSearch, $options: "i" } },
            { description: { $regex: escapedSearch, $options: "i" } },
        ];
    }

    try {
        const [totalItems, tasks] = await Promise.all([
            Task.countDocuments(filter),
            Task.find(filter)
                .sort({ createdAt: sortDirection, _id: sortDirection })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        const basePath = req.originalUrl.split("?")[0];
        const buildPageLink = (targetPage) => {
            const params = new URLSearchParams({
                limit: String(limit),
                page: String(targetPage),
                order,
            });

            if (query.status) params.set("status", query.status);
            if (query.priority) params.set("priority", query.priority);
            if (query.search) params.set("search", query.search);

            return `${basePath}?${params.toString()}`;
        };

        const response = {
            data: tasks,
            pagination: {
                meta: {
                    itemsPerPage: limit,
                    totalItems,
                    currentPage: page,
                    totalPages,
                },
                links: {
                    first: totalPages ? buildPageLink(1) : null,
                    last: totalPages ? buildPageLink(totalPages) : null,
                    current: buildPageLink(page),
                    next: page < totalPages ? buildPageLink(page + 1) : null,
                    previous: page > 1 ? buildPageLink(page - 1) : null,
                },
            },
        };

        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        errorLogger("Error occurred while fetching tasks", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({ reason: "Unable to process request at the moment, please try again later" });
    }
}

module.exports = getTasksProvider;

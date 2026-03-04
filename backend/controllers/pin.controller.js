import Pin from "../models/pin.model.js";

export const getPins = async (req,res) => {

    const pageNumber = Number(req.query.cursor) || 0;
    const search = (req.query.search || '').trim();
    const LIMIT =21;
    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ]
        }
        : {};

    const pins = await Pin.find(query)
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

    const hasNextPage = pins.length === LIMIT;

    res.status(200).json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
}
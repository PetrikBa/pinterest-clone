import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";

export const getPins = async (req,res) => {

    const pageNumber = Number(req.query.cursor) || 0;
    const search = (req.query.search || '').trim();
    const userId = req.query.userId;
    const boardId = req.query.boardId;
    const LIMIT =21;
    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ]
        }
        : userId 
        ? {user: userId} 
        : boardId 
        ? {board: boardId}
        : {};
    const pins = await Pin.find(query)
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);

    const hasNextPage = pins.length === LIMIT;

    res
        .status(200)
        .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
}

export const getPin = async (req, res) => {
    const {id} = req.params;

    const pin = await Pin.findById(id).populate('user', 'userName img displayName');

    res.status(200).json(pin);
}
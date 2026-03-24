import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";
import sharp from 'sharp';
import ImageKit from 'imagekit';

export const getPins = async (req,res) => {
    try {
        const pageNumber = Number(req.query.cursor) || 0;
        const search = (req.query.search || '').trim();
        const userId = req.query.userId;
        const boardId = req.query.boardId;
        const LIMIT = 21;
        const query = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { tags: { $regex: search, $options: 'i' } }
                ]
            }
            : userId
            ? { user: userId }
            : boardId
            ? { board: boardId }
            : {};

        const pins = await Pin.find(query)
            .limit(LIMIT)
            .skip(pageNumber * LIMIT);

        const hasNextPage = pins.length === LIMIT;
        
        res
            .status(200)
            .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch pins' });
    }
}

export const getPin = async (req, res) => {
    try {
        const { id } = req.params;

        const pin = await Pin.findById(id).populate('user', 'userName img displayName');

        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch pin' });
    }
}

export const createPin = async (req, res) => {
    try {
        const { title, description, textOptions, canvasOptions, link, board, tags } = req.body;

        const media = req.files?.media;

        if(!title || !description || !media) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const parsedTextOptions = JSON.parse(textOptions || '{}');
        const parsedCanvasOptions = JSON.parse(canvasOptions || '{}');

        const metaData = await sharp(media.data).metadata();
        const originalOrientation = metaData.width < metaData.height ? 'portrait' : 'landscape';
        const originalAspectRatio = metaData.width / metaData.height;

        let clientAspectRatio;

        if(parsedCanvasOptions.size !== 'original') {
            clientAspectRatio = parsedCanvasOptions.size.split(':')[0] 
                / parsedCanvasOptions.size.split(':')[1];
        } else {
            parsedCanvasOptions.orientation === originalOrientation 
                ? (clientAspectRatio = originalAspectRatio) 
                : (clientAspectRatio = 1 / originalAspectRatio);
        }

        const width = metaData.width;
        const height = Math.round(metaData.width / clientAspectRatio);

        const imagekit = new ImageKit({
            publicKey: process.env.IK_PUBLIC_KEY,
            privateKey: process.env.IK_PRIVATE_KEY,
            urlEndpoint: process.env.IK_URL_ENDPOINT
        });

        const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
        const textTopPosition = parsedCanvasOptions.height > 0
            ? Math.round((parsedTextOptions.top * height) / parsedCanvasOptions.height)
            : 0;

        const textLayer = parsedTextOptions.text
            ? `,l-text,i-${parsedTextOptions.text},fs-${parsedTextOptions.fontSize},lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(1)},l-end`
            : '';

        const transformationString = `w-${width},h-${height}${originalAspectRatio > clientAspectRatio ? ',cm-pad_resize' : ''},bg-${parsedCanvasOptions.backgroundColor.substring(1)}${textLayer}`;

        const response = await imagekit.upload({
            file: media.data,
            fileName: media.name,
            folder: 'pins',
            transformation: {
                pre: transformationString
            }
        });

        const newPin = await Pin.create({
            user: req.userId,
            title,
            description,
            link: link || null,
            board: board || null,
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
            media: response.filePath,
            width: response.width,
            height: response.height,
        });
        return res.status(201).json(newPin);
    } catch (err) {
        console.error('createPin error:', err);
        return res.status(500).json({ message: 'Failed to create pin', error: err.message });
    }
}
import { type NextFunction, type Request, type Response } from "express";
import { publisherOdm } from "../odm/publisher.odm";
import fs from "fs";

const getAllPublishers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const publishers = await publisherOdm.getAllPublishers(page, limit);

    const totalElements = await publisherOdm.getPublisherCount();

    const response = {
      pagination: {
        totalItems: totalElements,
        totalPages: Math.ceil(totalElements / limit),
        currentPage: page,
      },
      data: publishers,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getPublisherById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const publisher = await publisherOdm.getPublisherById(id);
    if (publisher) {
      res.json(publisher);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

const getPublisherByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const publisherName = req.params.name;

  try {
    const publisher = await publisherOdm.getPublisherByName(publisherName);
    if (publisher?.length) {
      res.json(publisher);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    next(error);
  }
};

const createPublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdPublisher = await publisherOdm.createPublisher(req.body);
    res.status(201).json(createdPublisher);
  } catch (error) {
    next(error);
  }
};

const deletePublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const publisherDeleted = await publisherOdm.deletePublisher(id);
    if (publisherDeleted) {
      res.json(publisherDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

const updatePublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    const publisherUpdated = await publisherOdm.updatePublisher(id, req.body);
    if (publisherUpdated) {
      res.json(publisherUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

const updatePublisherLogo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const originalname = req.file?.originalname as string;
    const path = req.file?.path as string;
    const newPath = `${path}_${originalname}`;
    fs.renameSync(path, newPath);

    const publisherId = req.body.publisherId;
    const publisher = publisherOdm.getPublisherById(publisherId) as any;

    if (publisher) {
      publisher.logoImage = newPath;
      const publisherUpdated = await publisherOdm.updatePublisher(publisherId, publisher);
      res.json(publisherUpdated);

      console.log("Marca modificada correctamente!");
    } else {
      fs.unlinkSync(newPath);
      res.status(404).send("Marca no encontrada");
    }
  } catch (error) {
    next(error);
  }
};

export const publisherService = {
  getAllPublishers,
  getPublisherById,
  getPublisherByName,
  createPublisher,
  deletePublisher,
  updatePublisher,
  updatePublisherLogo,
};

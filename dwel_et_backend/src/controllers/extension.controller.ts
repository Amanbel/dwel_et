import { Request, Response } from "express";
import { processContent } from "../services/ingestion/contentIngestion.service";

export const ingestContent = async (req: Request, res: Response) => {
  try {
    const result = await processContent(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Processing failed",
    });
  }
};

import { CardService } from '@/services/card.service';
import { HttpStatusCode } from '@/utils/constants';

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: error.message
    });
  }
};

export const CardController = { createNew };

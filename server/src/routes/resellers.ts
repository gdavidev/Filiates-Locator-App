import express, {Router} from "express";
import dataAccess from "../data/DataAccess";
import Reseller from "../../../shared/models/Reseller";

export const router: Router = express.Router();

type ResellersRequest = {
  body: {
    state: string;
    city: string;
  }
};
router.get('/api/resellers', async (req: ResellersRequest, res) => {
  const resellers: Reseller[] = await dataAccess.resellers.search(req.body.state, req.body.city);

  if (resellers) {
    res.status(200).send({ resellers });
  } else {
    res.status(404).send();
  }
});

type ResellersAvailableCitiesRequest = {
  body: {
    state: string;
  }
};
router.get('/api/resellers/available-cities', async (req: ResellersAvailableCitiesRequest, res) => {
  const states: string[] = await dataAccess.resellers.getCitiesByState(req.body.state);

  if (states) {
    res.status(200).send({ states });
  } else {
    res.status(404).send();
  }
});

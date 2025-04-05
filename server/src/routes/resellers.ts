import express, {Router} from "express";
import dataAccess from "../data/DataAccess";
import Reseller from "../../../shared/models/Reseller";

export const router: Router = express.Router();

type ResellersRequest = {
  query: {
    state: string;
    city: string;
  }
};
router.get('/resellers', async (req: ResellersRequest, res) => {
  const resellers: Reseller[] = await dataAccess.resellers.search(req.query.state, req.query.city);

  if (resellers) {
    res.status(200).send({ resellers });
  } else {
    res.status(404).send();
  }
});

router.get('/resellers/all-states', async (req, res) => {
  const states: string[] = await dataAccess.resellers.getAllStates();

  if (states) {
    res.status(200).send({ states });
  } else {
    res.status(404).send();
  }
});

type ResellersAvailableCitiesRequest = {
  query: {
    state: string;
  }
};
router.get('/resellers/cities-by-state', async (req: ResellersAvailableCitiesRequest, res) => {
  const cities: string[] = await dataAccess.resellers.getCitiesByState(req.query.state);

  if (cities) {
    res.status(200).send({ cities });
  } else {
    res.status(404).send();
  }
});

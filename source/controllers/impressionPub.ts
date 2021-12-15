
import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";


const NAMESPACE = "impressionPub";

const csv = require("csvtojson");

//distances geolib
const geolib = require("geolib");


// interface for the data ( source : https://flaviocopes.com/typescript-object-destructuring/ )
export interface PointOfInt {
  name: string;
  lat: number;
  lon: number;
  impressions: number;
  clicks: number;
}

//reset click et impressions des points d'interets

const resetPointof = (arr: object[])=> {
  let newArr:PointOfInt[] = [];
  arr.forEach((el:any) => {
    el.impressions = 0;
    el.clicks = 0;
    newArr.push(el)
  })
  return newArr
}


const postImpressions = (req: Request, res: Response, next: NextFunction) => {
  
  logging.info(
    NAMESPACE,
    `Relie chaque impressions et clics au point d'intérêt le plus proche`
  );

  const pointsOfInterest = req.body;
  
  resetPointof(pointsOfInterest)

  csv()
    .fromFile("source/controllers/events.csv")
    .then(function (jsonArrayObj: object[]) {
      interface Event {
        lat?: string;
        lon?: string;
        event_type?: string;
      }
      jsonArrayObj.forEach((event: Event) => {
        let index: number = 0;
        let distance: number = 0;

        pointsOfInterest.forEach((point: PointOfInt, newIndex: number) => {
          let newDistance: number = geolib.getPreciseDistance(
            { latitude: point.lat, longitude: point.lon },
            { latitude: event.lat, longitude: event.lon }
          );

          (newIndex === 0 || newDistance < distance) &&
            ((distance = newDistance), (index = newIndex));
        });

        event.event_type === "imp" && (pointsOfInterest[index].impressions += 1);
        event.event_type === "click" &&(pointsOfInterest[index].clicks += 1);
        
      });
      res.status(200).json({
        pointsOfInterest
      });
    })
    .catch((err: string) => {
      next(err);
    });

};

export default { postImpressions, resetPointof };

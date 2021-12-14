import csvParser from "csv-parser";
import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "impressionPub";

const csv = require('csvtojson')

//distances geolib
const geolib = require("geolib");


 

// interface for the data ( source : https://flaviocopes.com/typescript-object-destructuring/ )
interface PointOfInt{
  name: string,
  lat: number,
  lon: number,
  impressions :number,
  clicks: number
}



const postImpressions = (req: Request, res: Response, next: NextFunction) => {

  logging.info(
    NAMESPACE,
    `Relie chaque impressions et clics au point d'intérêt le plus proche`
  );

  const pointsOfInterest = req.body

    csv()
      .fromFile('source/controllers/events.csv')
      .then(function(jsonArrayObj:object[]){
        interface Event{
          lat?: string,
          lon?: string,
          event_type?:string
        }
        jsonArrayObj.forEach((event:Event)=> {
          console.log(event.lat)
          
        })
      })
      .catch((err:string) => {
        next(err)
      })
 

  
  return res.status(200).json({
    message: "ok"
  });
};

export default { postImpressions };

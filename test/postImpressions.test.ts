import environement from '../source/controllers/impressionPub';
import { PointOfInt } from '../source/controllers/impressionPub';

describe("resetPointOf", () => {
      
    test("la liste attendue n'est pas vide", () => {
      let arr: object[]=[
        {
          "lat": 48.8759992,
          "lon": 2.3481253,
          "name": "Arc de triomphe"
        },
        {
          "lat": 48.86,
          "lon": 2.35,
          "name": "Chatelet"
        }
      ]

      let result:any[]=environement.resetPointof(arr);
    
      expect(result.length).toBeGreaterThan(0);
    });
  });


export class Device {
  id: number;
  name: string;
  ip: string;
  _id: string;
  members: [{
    name: string, 
    photos: [{
        data: string,
        contentType: string
    }]
  }];
}

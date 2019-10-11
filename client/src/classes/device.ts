// Device class
export class Device {
  id: number;
  name: string;
  ip: string;
  status: boolean;
  _id: string;
  members: [{
    name: string, 
    photos: [{
        data: string,
        contentType: string
    }]
  }];
}

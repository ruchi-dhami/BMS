# BMS API Documentation

## Base URL
```
http://localhost:8080/v1
```


### Login
- **Endpoint**: `POST /login`
- **Description**: Authenticate user and get JWT token
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}

```
- **Response**:
```json
{
  "status": "success",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

### Register User
- **Endpoint**: `POST /register`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Request Body**:
```json
{
    "firstName":"Admin1",
    "lastName":"admin1",
    "email": "ruchi.dhami1@epita.fr",
    "password": "password",
    "role": "admin",
    "buildings":["67979cc846f2663d2e470a18"],
    "floors": []
}
```

### List Users
- **Endpoint**: `GET /users`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json
{
    "status": "success",
    "data": {
        "users": [
            {
                "_id": "67979f9646f2663d2e470a27",
                "firstName": "Admin1",
                "lastName": "admin1",
                "email": "ruchi.dhami1@epita.fr",
                "role": "admin",
                "buildings": [
                    "67979cc846f2663d2e470a18"
                ],
                "floors": []
            }
        ]
    }
}

```

### Get All Buildings only by super admin
- **Endpoint**: `GET /buildings`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "buildings": [
            {
                "location": {
                    "coordinates": {
                        "latitude": -88.1215,
                        "longitude": -156.34
                    },
                    "address": "7060 Schimmel Passage"
                },
                "metrics": {
                    "totalFloors": 6
                },
                "_id": "67979cc846f2663d2e470a18",
                "name": "Lehner LLC"
            },
            {
                "location": {
                    "coordinates": {
                        "latitude": 48.4331,
                        "longitude": 132.6807
                    },
                    "address": "40509 Marion Meadow"
                },
                "metrics": {
                    "totalFloors": 3
                },
                "_id": "6797a12e7dd7527fd2baa1c0",
                "name": "Rau Group"
            }
        ]
    }
}
```

### Create Building only by super admin
- **Endpoint**: `POST /buildings`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Request Body**:
```json
{

}
```
- **Response**:
```json
{
    "status": "success",
    "data": {
        "building": {
            "name": "Schmidt, Larson and Lueilwitz",
            "location": {
                "address": "5957 Derick Harbor",
                "city": "South Sheldonstad",
                "country": "United States of America",
                "coordinates": {
                    "latitude": 61.9944,
                    "longitude": -99.3179
                }
            },
            "metrics": {
                "totalFloors": 5,
                "totalZones": 3,
                "occupancyStatus": {
                    "current": 25,
                    "capacity": 100,
                    "percentage": 58.12377851179057
                },
                "energyStatus": {
                    "currentConsumption": 75,
                    "dailyTotal": 1704
                },
                "airQualityStatus": "Good"
            },
            "status": "active",
            "floors": [
                "6797bcfdfd1f5fb716b1d3b9",
                "6797bcfdfd1f5fb716b1d3ba",
                "6797bcfdfd1f5fb716b1d3bb",
                "6797bcfdfd1f5fb716b1d3bc",
                "6797bcfdfd1f5fb716b1d3bd"
            ],
            "_id": "6797bcfdfd1f5fb716b1d3b7",
            "createdAt": "2025-01-27T17:06:05.078Z",
            "updatedAt": "2025-01-27T17:06:05.110Z",
            "__v": 1
        }
    }
}
```


### Get the outside weather
- **Endpoint**: `GET /weathers?lat=48.4331&lon=132.6807`
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "coord": {
            "lon": 132.6807,
            "lat": 48.4331
        },
        "weather": [
            {
                "id": 600,
                "main": "Snow",
                "description": "light snow",
                "icon": "13n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 262.68,
            "feels_like": 259.66,
            "temp_min": 262.68,
            "temp_max": 262.68,
            "pressure": 1017,
            "humidity": 96,
            "sea_level": 1017,
            "grnd_level": 1000
        },
        "visibility": 123,
        "wind": {
            "speed": 1.41,
            "deg": 39,
            "gust": 2.19
        },
        "snow": {
            "1h": 0.28
        },
        "clouds": {
            "all": 100
        },
        "dt": 1738072909,
        "sys": {
            "country": "RU",
            "sunrise": 1738104149,
            "sunset": 1738137721
        },
        "timezone": 36000,
        "id": 2027277,
        "name": "Babstovo",
        "cod": 200
    }
}
```


### Get buildings detail
- **Endpoint**: `GET /buildings/6797a14d7dd7527fd2baa1d2
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "building": {
            "location": {
                "coordinates": {
                    "latitude": 69.1357,
                    "longitude": -42.8275
                },
                "address": "25009 Araceli Plains"
            },
            "metrics": {
                "occupancyStatus": {
                    "current": 40,
                    "capacity": 100,
                    "percentage": 52.493800796237366
                },
                "energyStatus": {
                    "currentConsumption": 491,
                    "dailyTotal": 4141,
                    "efficiency": 0.0954715390364127
                },
                "temperature": {
                    "current": 21.496472318189973,
                    "efficiency": 0.4328710870232524
                },
                "airQuality": {
                    "index": 41,
                    "satisfaction": 1.9396062265525642
                },
                "energyDistribution": {
                    "hvac": 0.18013680585238379,
                    "lighting": 0.532294401803717,
                    "equipment": 0.5511873260499254,
                    "other": 0.816035875351357
                },
                "occupancyDistribution": {
                    "office": 45,
                    "meeting": 14,
                    "common": 78,
                    "other": 88
                },
                "totalFloors": 3
            },
            "_id": "679a406cd104cb959d94b42c",
            "name": "Nitzsche - Oberbrunner",
            "alerts": [
                {
                    "type": "occupancy",
                    "message": "Turpis adhaero delibero nemo omnis confugo.",
                    "severity": "low",
                    "timestamp": "2025-01-28T16:34:14.215Z",
                    "_id": "679a406cd104cb959d94b42d"
                },
                {
                    "type": "energy",
                    "message": "Dolorem totus terra caute succurro cognatus adopto cupiditate tenuis.",
                    "severity": "low",
                    "timestamp": "2025-01-28T20:37:28.670Z",
                    "_id": "679a406cd104cb959d94b42e"
                }
            ],
            "floors": [
                {
                    "_id": "679a406cd104cb959d94b43a",
                    "floorNumber": 1,
                    "name": "Floor 1",
                    "floorType": "mixed",
                    "status": "active",
                    "totalArea": 2559.4068973844523,
                    "buildingId": "679a406cd104cb959d94b42c",
                    "createdAt": "2025-01-29T14:51:24.949Z",
                    "updatedAt": "2025-01-29T14:51:24.949Z",
                    "__v": 0
                },
                {
                    "_id": "679a406cd104cb959d94b43b",
                    "floorNumber": 2,
                    "name": "Floor 2",
                    "floorType": "mixed",
                    "status": "active",
                    "totalArea": 1674.90025124495,
                    "buildingId": "679a406cd104cb959d94b42c",
                    "createdAt": "2025-01-29T14:51:24.949Z",
                    "updatedAt": "2025-01-29T14:51:24.949Z",
                    "__v": 0
                }
            ],
            "systems": [
                {
                    "metrics": {
                        "temperature": 21.220820759068157,
                        "uptime": 2.367409571822332
                    },
                    "name": "hvac",
                    "status": "active",
                    "_id": "679a406cd104cb959d94b431"
                },
                {
                    "metrics": {
                        "waterLevel": 35.721541555155355
                    },
                    "name": "sprinkler",
                    "status": "active",
                    "_id": "679a406cd104cb959d94b432"
                }
            ],
            "history": [
                {
                    "type": "energy",
                    "timestamp": "2024-12-28T06:17:36.854Z",
                    "value": 132,
                    "_id": "679a406cd104cb959d94b435"
                },
                {
                    "type": "occupancy",
                    "timestamp": "2024-08-23T17:46:32.766Z",
                    "value": 24,
                    "_id": "679a406cd104cb959d94b436"
                }
            ]
        }
    }
}
```


### Get floors by building id detail
- **Endpoint**: `GET /buildings/6797a14d7dd7527fd2baa1d2/floors
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "floors": [
            {
                "_id": "679a406cd104cb959d94b43a",
                "floorNumber": 1,
                "name": "Floor 1",
                "floorType": "mixed",
                "status": "active",
                "totalArea": 2559.4068973844523,
                "deviceCount": 22
            },
            {
                "_id": "679a406cd104cb959d94b43c",
                "floorNumber": 3,
                "name": "Floor 3",
                "floorType": "mixed",
                "status": "active",
                "totalArea": 2711.2022263426607,
                "deviceCount": 34
            },
            {
                "_id": "679a406cd104cb959d94b43b",
                "floorNumber": 2,
                "name": "Floor 2",
                "floorType": "mixed",
                "status": "active",
                "totalArea": 1674.90025124495,
                "deviceCount": 28
            }
        ]
    }
}
```

### Get Floor Details with Rooms
- **Endpoint**: `GET /floors/6797a14d7dd7527fd2baa1d2/rooms
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "rooms": [
            {
                "_id": "679a406cd104cb959d94b45f",
                "name": "quit",
                "status": "active",
                "area": 206.7320571908466,
                "metrics": {
                    "currentOccupancy": 8,
                    "maxOccupancy": 11,
                    "temperature": 26.017526626405612,
                    "humidity": 50.12775545683258
                }
            },
            {
                "_id": "679a406cd104cb959d94b459",
                "name": "label",
                "status": "active",
                "area": 440.28851489554955,
                "metrics": {
                    "currentOccupancy": 10,
                    "maxOccupancy": 11,
                    "temperature": 19.092844949819565,
                    "humidity": 34.99704016897153
                }
            }
        ],
        "commonAreas": [
            {
                "_id": "679a406dd104cb959d94b533",
                "name": "deck",
                "status": "active",
                "totalArea": 600.2350964073084
            }
        ]
    }
}
```

### Get Floor Details with Rooms
- **Endpoint**: `GET /floors/6797a14d7dd7527fd2baa1d2/rooms
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "rooms": [
            {
                "_id": "679a406cd104cb959d94b45f",
                "name": "quit",
                "status": "active",
                "area": 206.7320571908466,
                "metrics": {
                    "currentOccupancy": 8,
                    "maxOccupancy": 11,
                    "temperature": 26.017526626405612,
                    "humidity": 50.12775545683258
                }
            },
            {
                "_id": "679a406cd104cb959d94b459",
                "name": "label",
                "status": "active",
                "area": 440.28851489554955,
                "metrics": {
                    "currentOccupancy": 10,
                    "maxOccupancy": 11,
                    "temperature": 19.092844949819565,
                    "humidity": 34.99704016897153
                }
            }
        ],
        "commonAreas": [
            {
                "_id": "679a406dd104cb959d94b533",
                "name": "deck",
                "status": "active",
                "totalArea": 600.2350964073084
            }
        ]
    }
}
```

### Get Room Devices:
- **Endpoint**: `GET /rooms/6797a14d7dd7527fd2baa1d2/devices
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "room": {
            "_id": "679a406cd104cb959d94b45f",
            "name": "quit",
            "status": "active",
            "area": 206.7320571908466,
            "metrics": {
                "currentOccupancy": 8,
                "maxOccupancy": 11,
                "temperature": 26.017526626405612,
                "humidity": 50.12775545683258
            }
        },
        "devices": [
            {
                "_id": "679a406dd104cb959d94b4af",
                "name": "Awesome Metal Salad",
                "manufacturer": "Robel LLC",
                "model": "KHx8T98S",
                "serialNumber": "aGQzE9ceOuCX",
                "status": "active",
                "installationDate": "2024-11-13T19:50:49.786Z",
                "lastMaintenanceDate": "2024-09-05T08:41:16.962Z",
                "nextMaintenanceDate": "2025-09-29T19:26:56.488Z",
                "metrics": {
                    "batteryLevel": 73,
                    "signalStrength": 2,
                    "errorRate": 0.027953660590854437
                }
            }
        ]
    }
}
```

### Get Device Details:
- **Endpoint**: `GET /devices/6797a14d7dd7527fd2baa1d2
- **Headers**: `Authorization: Bearer JWT_TOKEN`
- **Response**:
```json

{
    "status": "success",
    "data": {
        "device": {
            "_id": "679a406dd104cb959d94b4af",
            "name": "Awesome Metal Salad",
            "manufacturer": "Robel LLC",
            "model": "KHx8T98S",
            "serialNumber": "aGQzE9ceOuCX",
            "status": "active",
            "installationDate": "2024-11-13T19:50:49.786Z",
            "lastMaintenanceDate": "2024-09-05T08:41:16.962Z",
            "nextMaintenanceDate": "2025-09-29T19:26:56.488Z",
            "metrics": {
                "batteryLevel": 73,
                "signalStrength": 2,
                "errorRate": 0.027953660590854437
            }
        }
    }
}
```
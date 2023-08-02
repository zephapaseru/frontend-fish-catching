const testDataModified = [
  {
    latitude: 4.6352775,
    longitude: 126.948347,
    wave: 31,
    wind: 100,
    current: 18,
    salinity: 85,
    temperature: 84,
    catchResult: 64,
  },
  {
    latitude: 4.626041666666667,
    longitude: 126.82249722222222,
    wave: 47,
    wind: 32,
    current: 27,
    salinity: 64,
    temperature: 0,
    catchResult: 65,
  },
  {
    latitude: 4.553333333333333,
    longitude: 126.98000000000002,
    wave: 41,
    wind: 69,
    current: 18,
    salinity: 13,
    temperature: 26,
    catchResult: 29,
  },
  {
    latitude: 4.747513888888889,
    longitude: 126.91221666666667,
    wave: 44,
    wind: 0,
    current: 27,
    salinity: 0,
    temperature: 40,
    catchResult: 79,
  },
  {
    latitude: 4.790347222222222,
    longitude: 126.79975277777779,
    wave: 100,
    wind: 46,
    current: 55,
    salinity: 56,
    temperature: 46,
    catchResult: 100,
  },
  {
    latitude: 4.738138888888889,
    longitude: 126.69805555555556,
    wave: 34,
    wind: 96,
    current: 64,
    salinity: 94,
    temperature: 70,
    catchResult: 60,
  },
  {
    latitude: 4.377025,
    longitude: 126.52111111111112,
    wave: 63,
    wind: 87,
    current: 64,
    salinity: 19,
    temperature: 46,
    catchResult: 26,
  },
  {
    latitude: 4.0472222222222225,
    longitude: 126.46166666666667,
    wave: 0,
    wind: 73,
    current: 0,
    salinity: 43,
    temperature: 100,
    catchResult: 51,
  },
  {
    latitude: 4.162547222222222,
    longitude: 126.51152777777778,
    wave: 19,
    wind: 76,
    current: 27,
    salinity: 89,
    temperature: 50,
    catchResult: 0,
  },
  {
    latitude: 4.561305555555556,
    longitude: 126.625,
    wave: 44,
    wind: 78,
    current: 18,
    salinity: 79,
    temperature: 62,
    catchResult: 2,
  },
  {
    latitude: 4.491527777777778,
    longitude: 126.56388888888888,
    wave: 28,
    wind: 80,
    current: 100,
    salinity: 69,
    temperature: 83,
    catchResult: 23,
  },
  {
    latitude: 4.674513888888889,
    longitude: 126.66536111111111,
    wave: 53,
    wind: 82,
    current: 0,
    salinity: 88,
    temperature: 79,
    catchResult: 3,
  },
  {
    latitude: 4.470416666666667,
    longitude: 126.51288888888889,
    wave: 25,
    wind: 84,
    current: 73,
    salinity: 92,
    temperature: 79,
    catchResult: 35,
  },
  {
    latitude: 4.360027777777777,
    longitude: 126.5486101111111,
    wave: 44,
    wind: 87,
    current: 27,
    salinity: 48,
    temperature: 61,
    catchResult: 33,
  },
  {
    latitude: 4.214722222222222,
    longitude: 126.57224444444445,
    wave: 22,
    wind: 89,
    current: 73,
    salinity: 100,
    temperature: 67,
    catchResult: 16,
  },
];

function normalizeData(data) {
  const normalizedData = [];

  // Find min and max values for each property
  const minMaxValues = {};
  for (const key in data[0]) {
    if (data[0].hasOwnProperty(key)) {
      const values = data.map((item) => item[key]);
      minMaxValues[key] = {
        min: Math.min(...values),
        max: Math.max(...values),
      };
    }
  }

  // Normalize the data
  for (const item of data) {
    const normalizedItem = {};
    for (const key in item) {
      if (
        item.hasOwnProperty(key) &&
        minMaxValues[key].max !== minMaxValues[key].min
      ) {
        normalizedItem[key] =
          (item[key] - minMaxValues[key].min) /
          (minMaxValues[key].max - minMaxValues[key].min);
      } else {
        normalizedItem[key] = item[key];
      }
    }
    normalizedData.push(normalizedItem);
  }

  return normalizedData;
}

const normalizedData = normalizeData(testDataModified);
console.log(normalizedData);

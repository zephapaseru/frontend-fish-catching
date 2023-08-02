export const normalizeData = (data) => {
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
};

export const findLargest = (images) => {
  if (!images) return null
  
  let max = images[0];
  for (let i = 0; i < images.length; i++) {
    if (images[i].width > max.width) {
      max = images[i];
    }
  }
  return max.getUrl();
};



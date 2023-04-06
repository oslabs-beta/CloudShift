/*
Extract the relevant transfer data from the rclone copy output.
*/

const rcloneCopyString = (fullString) => {
  //Get the string between the first and second occurence of the word "transferred".
  //RIGHT NOW, JUST RETURNING AN EMPTY STRING IF THERE'S NO RELEVANT PERCENTAGE.
  try {
    let first = fullString.indexOf('Transferred:');
    let second = fullString.indexOf('Transferred:', first + 1);
    const slicedStr = fullString.slice(first, second);
    //Now get the overall percentage as the number.
    first = slicedStr.indexOf(',');
    second = slicedStr.indexOf('%');
    //If finalized string isn't correct for some reason, return an empty string.
    const finalString = slicedStr.slice(first + 1, second).trim();
    if (isNaN(finalString)) return '';
    return finalString;
  } catch {
    return '';
  }
};

module.exports = { rcloneCopyString };

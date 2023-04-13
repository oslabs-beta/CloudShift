/*
Extract the relevant transfer data from the rclone copy output.
*/

const rcloneCopyString = (fullString) => {
  //First see if the string contains an access denied error.
  const accessDenied = fullString.includes("AccessDenied") ? true : false;
  if (accessDenied) return "accessDenied";
  //Get the string between the first and second occurence of the word "transferred".
  try {
    let first = fullString.indexOf("Transferred:");
    let second = fullString.indexOf("Transferred:", first + 1);
    let slicedStr = fullString.slice(first, second);
    //Now get the overall percentage as the number.
    first = slicedStr.indexOf(",");
    second = slicedStr.indexOf("%");
    slicedStr = slicedStr.slice(first + 1, second).trim();
    //If final string is the total transfer percent, return it.
    if (!isNaN(slicedStr)) return slicedStr;
    //If the string contains "checks" (buckets likely already in sync) and shows a number, return it.
    first = slicedStr.indexOf("Checks:");
    slicedStr = slicedStr.slice(first + 1);
    second = slicedStr.indexOf(",");
    slicedStr = slicedStr.slice(second + 1).trim();
    if (!isNaN(slicedStr)) return slicedStr;
    //Otherwise, return an empty string.
    return "";
  } catch {
    return "";
  }
};

module.exports = { rcloneCopyString };

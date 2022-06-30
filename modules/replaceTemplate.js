module.exports = (tempCard, objectItem) => {
    let output = tempCard.replace(/{%PRODUCTNAME%}/g, objectItem.productName);
  
    output = output.replace(/{%IMAGE%}/g, objectItem.image);
    output = output.replace(/{%FROM%}/g, objectItem.from);
    output = output.replace(/{%NUTRIENTS%}/g, objectItem.nutrients);
    output = output.replace(/{%QUANTITY%}/g, objectItem.quantity);
    output = output.replace(/{%PRICE%}/g, objectItem.price);
    output = output.replace(/{%DESCRIPTION%}/g, objectItem.description);
    output = output.replace(/{%ID%}/g, objectItem.id);
    // console.log(output);
  
    if (!objectItem.organic)
      output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  
    return output;
  };
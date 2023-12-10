//this helper method sort the descriptions in the homepage which is used in component BlogSection.js

export const excerpt = (str, count) => {
    if (str.length > count) {
      str = str.substring(0, count) + " ... ";
    }
    return str;
  }; 



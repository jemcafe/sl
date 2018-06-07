const fs = require('fs');

const comma = fs.readFileSync('./input/comma.txt', 'utf8');
const pipe = fs.readFileSync('./input/pipe.txt', 'utf8');
const space = fs.readFileSync('./input/space.txt', 'utf8');
const inputFiles = comma + '\n' + pipe + '\n' + space;


function output (file) {
   let people = file.split('\n');

   // Format info
   people = formatInfo(people);

   // Sort
   let outputs = [
      sortByGender(people),
      sortByBirthday(people),
      sortByLastName(people, 'reverse')
   ];

   // Remove empty middle initals and join info array
   for (let i = 0; i < outputs.length; i++) {
      outputs[i] = outputs[i]
      .map(info => {
         if (!info[2]) info.splice(2, 1);
         return info.join(' ');
      }).join('\n');
   }

   // Concatenate the outputs and return
   return outputsToString(outputs);
}

function outputsToString(array) {
   let str = '';

   for (let i = 0; i < array.length; i++) {
      if (i === array.length-1) {
         str += `Output ${i+1}:\n` + array[i];
      } else {
         str += `Output ${i+1}:\n` + array[i] + `\n\n`;
      }
   }

   return str;
}

function formatInfo (array) {
   return array.map(info => {
      // Remove delimiters (commas, pipes, and spaces)
      info = info.split(/[,|\s]+/).map(e => e.trim());
      
      // If there is no middle initial, it's an empty string
      if (info.length != 6) info.splice(2, 0, '');

      // Format gender
      if (info[3] === 'F') info[3] = 'Female'; 
      if (info[3] === 'M') info[3] = 'Male';

      // Swap birthday and color
      if ( isNaN( parseInt(info[4]) ) ) {
         info = swap(info, 4, 5);
      }

      // Format Birthday
      info[4] = info[4].split('-').join('/');

      return info;
   });
}

function sortByGender (array) {
   // The items are seperated by gender
   let genders = {
      females: array.filter(info => info[3] === 'Female' ? info : false),
      males: array.filter(info => info[3] === 'Male' ? info : false)
   }

   // The genders are sorted by name in ascending order
   for ( let index in genders ) {
      genders[index] = sortByLastName(genders[index]);
   }

   // Concatenate the sorted arrays
   array = genders.females.concat(genders.males);

   return array;
}

function sortByBirthday (array) {
   let obj = {};
   let newArray = [];

   array.forEach((info, i) => {
      const date = info[4].split(/[/-]/);
      const year = date[2];
      const month = date[0];

      // Create year property if undefined
      if (!obj[year]) {
         obj[year] = {};
      }

      // Create month property if undefined
      if (!obj[year][month]) {
         obj[year][month] = [info];
      } else {
         // Add the info to the month's array
         obj[year][month] = [...obj[year][month], info];

         // Sort
         if (obj[year][month].length > 1) {
            // Sort by day then lastname
            obj[year][month].sort((a, b) => {
               const dayA = a[4].split(/[/-]/)[1];
               const dayB = b[4].split(/[/-]/)[1];
               return dayA - dayB;
            }).sort((a, b) => {
               const lastNameA = a[0].toUpperCase();
               const lastNameB = b[0].toUpperCase();
               if (lastNameA < lastNameB) return -1; 
               if (lastNameA > lastNameB) return 1;
               return 0;
            });
         }
      }
   });

   // Concat organized info
   for (let y in obj) {
      for (let m in obj[y]) {
         newArray = newArray.concat(obj[y][m]);
      }
   }
   
   return newArray;
}

function sortByLastName (array, order) {
   array.sort((a, b) => {
      const nameA = a[0].toUpperCase();
      const nameB = b[0].toUpperCase();
      if (nameA < nameB) return -1; 
      if (nameA > nameB) return 1;
      return 0;
   });

   return order === 'reverse' ? array.reverse() : array;
}

function swap (arr, indexA, indexB) {
   const temp = arr[indexA];
   arr[indexA] = arr[indexB];
   arr[indexB] = temp;
   return arr;
}

// For testing
module.exports = {
   output,
   sortByBirthday,
   sortByGender,
   sortByLastName
}

console.log( output(inputFiles) );

// Create new file
fs.writeFileSync('./output/output.text', output(inputFiles));
const app = require('./app');

const input = `Laker, Kyle, Male, Tan, 2/13/1943
Windel | Thomas | D | M | Red | 3-3-1985
Pirl Jessie F 12-2-1973 Black`;

const output = `Output 1:
Pirl Jessie Female 12/2/1973 Black
Laker Kyle Male 2/13/1943 Tan
Windel Thomas D Male 3/3/1985 Red

Output 2:
Laker Kyle Male 2/13/1943 Tan
Pirl Jessie Female 12/2/1973 Black
Windel Thomas D Male 3/3/1985 Red

Output 3:
Windel Thomas D Male 3/3/1985 Red
Pirl Jessie Female 12/2/1973 Black
Laker Kyle Male 2/13/1943 Tan`;

const testArr = [
   ['Johnson', 'Tim', '', 'Male', '5/20/1988', 'Magenta'],
   ['Davis', 'Theo', 'H', 'Male', '2/23/1988', 'Yellow'],
   ['Gauder', 'Lisa', 'D', 'Female', '6/19/1985', 'Blue']
];


test('Parse input to the correct output', () => {
   expect(app.output(input)).toEqual(output);
});

test('Order by gender with females first', () => {
   expect(app.sortByGender(testArr)).toEqual([
      ['Gauder', 'Lisa', 'D', 'Female', '6/19/1985', 'Blue'],
      ['Davis', 'Theo', 'H', 'Male', '2/23/1988', 'Yellow'],
      ['Johnson', 'Tim', '', 'Male', '5/20/1988', 'Magenta']
   ]);
});

test('Order by birthday and last name ascending', () => {
   expect(app.sortByBirthday(testArr)).toEqual([
      ['Gauder', 'Lisa', 'D', 'Female', '6/19/1985', 'Blue'],
      ['Davis', 'Theo', 'H', 'Male', '2/23/1988', 'Yellow'],
      ['Johnson', 'Tim', '', 'Male', '5/20/1988', 'Magenta'],
   ]);
});

test('Order by last name ascending', () => {
   expect(app.sortByLastName(testArr)).toEqual([
      ['Davis', 'Theo', 'H', 'Male', '2/23/1988', 'Yellow'],
      ['Gauder', 'Lisa', 'D', 'Female', '6/19/1985', 'Blue'],
      ['Johnson', 'Tim', '', 'Male', '5/20/1988', 'Magenta']
   ]);
});


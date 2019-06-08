const rand_int = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rand_date = (start, end, startHour, endHour) => {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
};

const rand_from = arr => {
    return arr[rand_int(0, arr.length)];
};

const categories = ['Fruit', 'Grain', 'Meat', 'Dairy', 'Vegetable'];

const gen_food = () => {
    return {
        category: rand_from(categories),
        calories: rand_int(20, 500),
    };
};

const gen_entry = () => {
    return {
        time: rand_date(new Date(2019, 1, 1), new Date(2019, 1, 7), 9, 17),
        food: gen_food()
    };
};

const gen_person = () => {
    return {
        age: rand_int(10, 18),
        weight: rand_int(70, 150),
        height: rand_int(50, 72),
        sex: rand_int(0, 1),
        entries: [...Array(rand_int(1, 10))].map(v => gen_entry())
    };
};

const people = [...Array(20)].map(v => gen_person());

const data = people.reduce((acc, p) => {
    p.entries.map(e => {
        acc.push({
            age:p.age,
            weight: p.weight,
            height: p.height,
            sex: p.sex,
            time: e.time,
            category: e.food.category,
            calories: e.food.calories,
        });
    });
    return acc;
}, []);

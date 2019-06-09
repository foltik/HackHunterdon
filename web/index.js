const rand_int = (min, max) => {
    return Math.floor(Math.pow(Math.random(), Math.random() * 2) * (max - min + 1)) + min;
};

const rand_real = (min, max) => {
    return Math.pow(Math.random(), Math.random() * 2) * (max - min + 1) + min;
};

const rand_date = (start, end, startHour, endHour) => {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
};

const rand_from = arr => {
    return arr[rand_int(0, arr.length - 1)];
};

const categories = ['Fruit', 'Grain', 'Meat', 'Dairy', 'Vegetable'];
const meals = ['Snack', 'Breakfast', 'Lunch', 'Dinner'];
const sources = ['School Meal', 'Home Meal', 'Restaurant', 'Fast Food'];

const gen_food = () => {
    return {
        category: rand_from(categories),
        meal: rand_from(meals),
        source: rand_from(sources),
        calories: rand_int(20, 1000),
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
        weight: rand_real(70, 150),
        height: rand_real(50, 72),
        sex: rand_int(0, 1),
        entries: [...Array(rand_int(10, 20))].map(v => gen_entry())
    };
};

const people = [...Array(100)].map(v => gen_person());

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
            meal: e.food.meal,
            source: e.food.source
        });
    });
    return acc;
}, []);

const ndx = crossfilter(data);

const age_dim = ndx.dimension(d => d.age);
const age = dc.barChart('#age')
.x(d3.scaleLinear().domain([10, 18]))
.xAxisLabel('Age')
.dimension(age_dim)
.group(age_dim.group());

const height_weight_dim = ndx.dimension(d => [d.height, d.weight]);
const height_weight = dc.scatterPlot('#weight-height')
.x(d3.scaleLinear().domain([50, 72]))
.xAxisLabel('Height')
.yAxisLabel('Weight')
.dimension(height_weight_dim)
.group(height_weight_dim.group());

const category_dim = ndx.dimension(d => d.category);
const category = dc.pieChart('#category')
.legend(dc.legend())
.dimension(category_dim)
.group(category_dim.group());

const meal_dim = ndx.dimension(d => d.meal);
const meal = dc.pieChart('#meal')
.legend(dc.legend())
.dimension(meal_dim)
.group(meal_dim.group());

const source_dim = ndx.dimension(d => d.source);
const source = dc.pieChart('#source')
.legend(dc.legend())
.dimension(source_dim)
.group(source_dim.group());

const day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day_dim = ndx.dimension(d => day_names[d.time.getDay()]);
const day = dc.rowChart('#day')
.dimension(day_dim)
.group(day_dim.group());

const time_dim = ndx.dimension(d => d.time.getHours() + ':00');
const time = dc.barChart('#time')
.x(d3.scaleBand())
.xUnits(dc.units.ordinal)
.xAxisLabel('Time of Day')
.dimension(time_dim)
.group(time_dim.group());

const calories_dim = ndx.dimension(d => d.calories);
const calories = dc.barChart('#calories')
.x(d3.scaleLinear().domain([20, 1000]))
.xAxisLabel('Calories')
.dimension(calories_dim)
.group(calories_dim.group());

dc.renderAll();

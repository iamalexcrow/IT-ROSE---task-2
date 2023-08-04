/* VORONA ALEKSANDR. IT/ROSE task 2*/
const rawData = {
  data: [
    { user: "mike@mail.com", rating: 20, disabled: false },
    { user: "greg@mail.com", rating: 14, disabled: false },
    { user: "alex@mail.com", rating: 25, disabled: false },
    { user: "alex@mail.com", rating: 11, disabled: true },
    { user: "alex@mail.com", rating: 900, disabled: false },
    { user: "alex@mail.com", rating: 32, disabled: false },
    { user: "alex@mail.com", rating: 73, disabled: false },
    { user: "john@mail.com", rating: 88, disabled: true },
    { user: "john@mail.com", rating: 9, disabled: false },
    { user: "bro@mail.com", rating: 32, disabled: false },
    { user: "cat@mail.com", rating: 16, disabled: false },
  ],
  condition: {
    include: [{ user: "alex@mail.com" }],
    exclude: [{ disabled: true }, { rating: 900 }],
    sort_by: ["rating", "user"],
  },
};

const data = rawData.data;
const condition = rawData.condition;

function submit(data, condition) {
  //INCLUDE
  if (condition.include) {
    condition.include.forEach((cond) => {
      data = data.filter(
        (object) => object[Object.keys(cond)[0]] == Object.values(cond)[0]
      );
    });
  }
  //SORT
  if (condition.sort_by) {
    data.sort((a, b) => {
      for (const param of condition.sort_by) {
        if (a[param] !== b[param]) {
          if (typeof a[param] === "string") {
            return a[param].localeCompare(b[param]);
          } else if (
            typeof a[param] === "number" ||
            typeof a[param] === "boolean"
          ) {
            return a[param] - b[param];
          } else {
            throw new Error("Wrong format data");
          }
        }
      }
    });
  }
  // EXCLUDE
  if (condition.exclude) {
    condition.exclude.forEach((cond) => {
      data = data.filter(
        (object) => object[Object.keys(cond)[0]] !== Object.values(cond)[0]
      );
    });
  }

  return { result: data };
}

submit(data, condition);

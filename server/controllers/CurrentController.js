import Egauge from "../Egauge";

export function current(request, response) {
  const eg = new Egauge();
  eg.getInstantaneousData()
    .then(mapData)
    .then((data) => {
      response.json(data);
    });
}

function mapData(data) {
  const excludedCategories = ["Grid", "Solar +"];
  const filteredData = data.filter((d) => !excludedCategories.includes(d.name));
  return {
    used: filteredData.filter((d) => d.type === "Used").map((d) => {
      d.x = d.type;
      d.y = d.kW;
      return d;
    }),
    generated: filteredData.filter((d) => d.type === "Generated").map((d) => {
      d.x = d.type;
      d.y = d.kW;
      return d;
    }),
  };
}

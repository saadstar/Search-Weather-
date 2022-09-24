import React,{useState,useEffect} from "react";
function SearchApp() {
  const [search, setSearch] = useState("London");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const componentMounted = true;

  
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=32e7a9d44328b80875530d35b7c40b6f`)
      if (componentMounted === true) {
        setData(await response.json())
      }
      return () => {
        componentMounted = false;
      }
    }
    fetcher();
  }, [search]);
  // const temp=(data.main.temp-273.15).toFixed(2)
  // const tempMin=(data.main.temp_min-273.15).toFixed(2)
  // const tempMax=(data.main.temp_max-273.15).toFixed(2)

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji="fa-cloud"
    }
    if (data.weather[0].main ==="Thunderstorm") {
      emoji="fa-bolt"
    }
    if (data.weather[0].main === "Deizzle") {
      emoji="fa-cloud-rain"
    }
    if (data.weather[0].main ==="Rain") {
      emoji="fa-cloud-shower-heavy"
    }
    if (data.weather[0].main ==="Snow") {
      emoji="fa-snow-flake"
    } else {
      emoji="fa-smog"
    }
  } else {
    return <div>...Loading</div>
  }
//date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });
  
  //time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  }
  

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div class="card text-white text-center border-0">
              <img
                src={`http://source.unsplash.com/600x900/?${data.weather[0].main}`}
                class="card-img"
                alt="naturwater"
              />
              <div class="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      name="search"
                      value={input}
                      onChange={(e) => (setInput(e.target.value))}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">{day}, {month} {date},{year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji}`}></i>
                  <h1 className="fw-bolder mb-5">16.44&deg;C</h1>
                  <p className="lead fw-bolder mb-0">Clouds</p>
                  <p className="lead">15.05&deg;C | 17.37&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchApp;

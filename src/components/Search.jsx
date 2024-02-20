import React, { useState, useEffect } from 'react';
import { CSSProperties } from 'react';

const WeatherSearch = () => {
    const [search, setSearch] = useState("london");
    const [data, setData] = useState({});
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ea2268a4f5fd3af787597e5589dad85d`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    console.error('Error fetching weather data');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(input);
    };

    let bgimage= null;

    if (typeof data.weather !== "undefined" && data.weather.length > 0) {
        if (data.weather[0].main === "Clouds") {
            bgimage = "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (data.weather[0].main === "Thunderstrom") {
            bgimage = "https://images.unsplash.com/photo-1539026759139-805309beca38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1cm18ZW58MHwwfDB8fHwy&w=1000&q=80g";
        } else if (data.weather[0].main === "Drizzle") {
            bgimage = "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        } else if (data.weather[0].main === "Rain") {
            bgimage = "https://i.pinimg.com/736x/cf/cd/8e/cfcd8ec2279933d368210823f1a7c5dd.jphttps://images.unsplash.com/photo-1539026759139-805309beca38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1cm18ZW58MHwwfDB8fHwy&w=1000&q=80";
        } else if (data.weather[0].main === "Snow") {
            bgimage = "https://e0.pxfuel.com/wallpapers/716/442/desktop-wallpaper-winter-night-winter-night-snowy-snow-christmas-house-xmas-tree.jpg";
        } else {
            bgimage = "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
    }

    let emoji = null;
    if(typeof data.main != "undefined"){
        if(data.weather[0].main == "clouds"){
            emoji = "fa-cloud"
        }else if(data.weather[0].main == "Thunderstrom"){
            emoji = ""
        }else if(data.weather[0].main == "Drizzle"){
            emoji = "fa-cloud-rain"
        }else if(data.weather[0].main == "Rain"){
            emoji = "fa-cloud-shower-heavy"
        }
        else if(data.weather[0].main == "Snow"){
            emoji = "fa-snow-flake"
        }else{
            emoji = "fa-smog"
        }
    }else{
        return(
            <div>...Loading</div>
        )
    }

    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", {month:'long'});
    let day = d.toLocaleString("default",{weekday:'long'});

    let time = d.toLocaleString([],{
        hour : '2-digit',
        minute: '2-digit',
    });

    return (
        
        <div class="card bg-white text-white">
            <div className="col justify-content-center">
                <div className="card text-white text-center border-0">
                    <img src={`${bgimage}`} className="img" alt="..." width="auto"/>
                    <div class="card-img-overlay">
                        <form onSubmit={handleSearch}>
                            <div className="input-group mb-4 w-75 mx-auto">
                                <input
                                   type="text"
                                   className="form-control"
                                   placeholder="Search City"
                                   aria-label="Search City"
                                   aria-describedby="basic-addon2"
                                   name="search"
                                   value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   require
                                />
                                <button type="submit" className="input-group-text" id="basic-addon2">
                                    <i className='fas fa-search'></i>
                                </button>
                            </div>
                        </form>
                        <div className='txt'>
                            <h2 className="card-title">{data.name}</h2>
                            <p className="card-text lead">
                                {day}, {month} {date}, {year}<br />
                                {time}
                            </p>
                            <i className={`fas ${emoji} fa-4x`}></i><br />
                            <h1 className='fw-bolder mb-5'>{data.main && data.main.temp !== undefined ? (data.main.temp - 273.15).toFixed(2) : 'N/A'} &deg;C</h1>
                            <p className='lead fw-bolder mb-0'>{data.weather && data.weather[0] && data.weather[0].description ? data.weather[0].description : 'N/A'}</p>
                            <p className="lead">
                                <i class='bx bx-down-arrow-alt'></i>{data.main && data.main.temp_min !== undefined ? (data.main.temp_min - 273.15).toFixed(2) : 'N/A'} &deg;C | <i class='bx bx-up-arrow-alt'></i>{data.main && data.main.temp_max !== undefined ? (data.main.temp_max - 273.15).toFixed(2) : 'N/A'} &deg;C
                            </p>
                        </div>
                        <div class="footer">
                          copyright © pavan teja reddy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherSearch;
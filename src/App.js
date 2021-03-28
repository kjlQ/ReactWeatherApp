import React ,{ useRef ,useState}from "react";
import "./App.css"
const API_KEY = '783d7891abed53ca9342294c08e42861'
export default function App () {
    const [state , setState] = useState([{
        temp:undefined,
        city :undefined,
        country:undefined,
        error:undefined,
    }])
    const refHandler = useRef()
    async function gettingWeather (e) {
        e.preventDefault()
        const city = refHandler.current.value;
        refHandler.current.value = null;
        const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await api_url.json()
        if (city) {
            setState(
                {
                    temp:data.main.temp,
                    city:data.name,
                    country:data.sys.country,
                    error: "",
                })
        }
        else {
            setState(
                {
                    temp:undefined,
                    city :undefined,
                    country:undefined,
                    error:"Введите название города",
                }
            )
        }
    }
    return (
        <div className={"wid"}>
            <form>
                <input type="text" name="city" placeholder="Город" ref={refHandler}/>
                <button onClick={gettingWeather}>Узнать погоду</button>
            </form>
            {state.city &&
            <div>
                <p>Местоположение : {state.city} , {state.country}</p>
                <p>Температура:{state.temp}</p>
            </div>}
            <p>{state.error}</p>
        </div>
    )
}
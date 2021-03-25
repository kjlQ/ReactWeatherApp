import React from "react";
import "./App.css"
const API_KEY = '783d7891abed53ca9342294c08e42861'
class App extends React.Component {
    state = {
        temp:undefined,
        city :undefined,
        country:undefined,
        error:undefined,
    }
    gettingWeather = async (e) => {
        e.preventDefault()
        const city = e.target.elements.city.value;
        const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await api_url.json()
        if (data.name != null) {
            this.setState({
                temp:data.main.temp,
                city:data.name,
                country:data.sys.country,
                error: "",
            })
        }
        else {
            this.setState({
                temp:undefined,
                city :undefined,
                country:undefined,
                error:"Введите название города",
            })
        }
    }
    render() {
        return (
            <div className={"wid"}>
                <h2>Узнать погоду в вашем городе</h2>
                <form onSubmit={this.gettingWeather}>
                    <input type="text" name="city" placeholder="Город"/>
                    <button>Узнать погоду</button>
                </form>
                {this.state.city &&
                <div>
                    <p>Местоположение : {this.state.city} , {this.state.country}</p>
                    <p>Температура:{this.state.temp}</p>
                </div>}
                <p>{this.state.error}</p>
            </div>
        )
    }
}
export default App
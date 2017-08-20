import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);  // weather.city.list[] each map to weather,
                                                                    // then to temps, actually is temps
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    // const lon = cityData.city.coord.lon;
    // const lat = cityData.cit.coord.lat;
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td><Chart data={temps} color='orange' unit='K' /></td>
        <td><Chart data={pressures} color='green' unit='hpa' /></td>
        <td><Chart data={humidities} color='black' unit='%' /></td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
           <th>City</th>
           <th>Temprature (K)</th>
           <th>Pressure (hpa)</th>
           <th>Humitity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps ({ weather }) {
  // const weather = state.weather;
  return { weather }; // == { weather : weather };
}

export default connect(mapStateToProps)(WeatherList);

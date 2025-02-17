import { AxiosError } from 'axios';
import {
  Card,
  CreateLine,
  ErrorComponent,
  Loading,
  ShowTempValue,
  SvgBackground,
  Title
} from 'components';
import { ENDPOINTS } from 'consts';
import { getData } from 'helpers';
import React from 'react';
import { Theme, ThemeContext } from 'store';
import { HourlyData } from 'types/interfaces';
import styles from './Today1Hourly.module.scss';

interface Today1HourlyProps {
  location: string;
}
interface Today1HourlyState {
  data: HourlyData;
  loading: boolean;
  error: string;
}

class Today1Hourly extends React.Component<Today1HourlyProps, Today1HourlyState> {
  declare context: React.ContextType<typeof ThemeContext>;
  accessToken: string = document.cookie.slice(6);
  constructor(props: Today1HourlyProps) {
    super(props);
    this.state = {
      data: { forecast: [] },
      loading: false,
      error: ''
    };
  }

  getHourlyData(): void {
    if (this.props.location && this.accessToken.length > 10) {
      getData(ENDPOINTS.hourly, this.props.location).then(
        (data: HourlyData) => {
          this.setState(() => ({ loading: true, data }));
        },
        (error: Error | AxiosError) => {
          this.setState(() => ({ error: error.message }));
        }
      );
    }
  }

  componentDidMount() {
    this.getHourlyData();
  }
  componentDidUpdate(prevProps: { location: string }) {
    if (prevProps.location !== this.props.location) {
      this.getHourlyData();
    }
  }

  render() {
    const { data, loading, error } = this.state;
    return (
      <Card id="hourly">
        <Title title="Hourly forecast" />
        {data.forecast.length > 0 ? (
          <>
            <div
              className={`${styles.container} ${
                this.context.theme === Theme.DARK && styles[Theme.DARK]
              }`}
            >
              <SvgBackground />
              {data.forecast.map(
                ({ time, symbol, temperature, precipAccum }, index, forecastData) => (
                  <div className={styles.hourContainer} key={time}>
                    <p className={styles.time}>{time.slice(11, 16)}</p>
                    <img
                      className={styles.symbol}
                      src={ENDPOINTS.symbol + symbol + '.png'}
                      style={{ top: `${350 - temperature * 10}px` }}
                    />
                    <svg height={'400'} width={'40'} className={styles.svgTemperature}>
                      <CreateLine
                        coordsBeg={{
                          x1: '4',
                          y1: `${400 - temperature * 10}`
                        }}
                        coordsEnd={{
                          x2: `${forecastData[index + 1] ? '40' : '0'}`,
                          y2: `${
                            400 - forecastData[index + 1]?.temperature * 10 ||
                            400 - temperature * 10
                          }`
                        }}
                        color={'red'}
                      />
                      <circle
                        cy={400 - temperature * 10}
                        cx={'4'}
                        r="4"
                        fill={'red'}
                        className={styles.circle}
                      ></circle>

                      <ShowTempValue
                        coords={{
                          x: '4',
                          y: `${385 - temperature * 10}`
                        }}
                        value={temperature}
                        classname={styles.textTemperature}
                      />
                    </svg>
                    <div
                      className={`${styles.precipAccum} ${
                        precipAccum! > 3.33 && styles.outOfScale
                      }`}
                      style={{
                        height: `${precipAccum! < 3.33 && precipAccum! * 30}%`,
                        top: `${precipAccum! < 3.33 && 100 - precipAccum! * 30}%`
                      }}
                    >
                      <p className={styles.precipAccumNumber}>{precipAccum}</p>
                    </div>
                  </div>
                )
              )}
            </div>
            <p className={styles.precipLabel}>Precipitation mm/hour</p>
          </>
        ) : loading ? (
          <Loading />
        ) : (
          <ErrorComponent message={error} button="TRY_AGAIN" error={error} />
        )}
      </Card>
    );
  }
}
Today1Hourly.contextType = ThemeContext;

export default Today1Hourly;

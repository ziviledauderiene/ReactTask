import React from 'react';
import { ENDPOINTS } from '../../../helpers/api';
import { CurrentData } from '../../../helpers/Interfaces';
import { useGetRequest } from '../../../hooks/useGetRequest';
import ErrorComponent from '../../UI/ErrorComponent/ErrorComponent';
import Loading from '../../UI/Loading/Loading';
import Title from './../../UI/Title/Title';

interface CurrentWeatherProps {
  userLocation: string;
}

const CurrentWeather: React.FunctionComponent<CurrentWeatherProps> = ({ userLocation }) => {
  const { data, loading, error } : {
    data: CurrentData;
    loading: boolean;
    error: string | null;
  } = useGetRequest(ENDPOINTS.current, userLocation) ;

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent message={error} button="TRY_AGAIN" />}
      {!loading && !error && (
        <>
          <Title title={`Current weather`} />
          <div>{JSON.stringify(data)}</div>
        </>
      )}
    </>
  );
};

export default CurrentWeather;

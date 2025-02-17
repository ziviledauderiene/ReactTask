import { City, ErrorComponent, Title } from 'components';
import { cities } from 'consts';
import React, { useContext, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { AuthContext, AuthContextConfig } from 'store';
import styles from './Cities.module.scss';

const Cities: React.FunctionComponent = () => {
  const { cityId } = useParams<string>();
  const { userHasToken }: AuthContextConfig = useContext(AuthContext);
  const [showMore, setShowMore] = useState<boolean>(false);
  const clickHandler = () => setShowMore(showMore => !showMore);
  const citiesToShow = cities.length / 2;

  return (
    <>
      {!cityId && (
        <main className={styles.mainContainer}>
          <Title title="What is the weather like in other Coherent&lsquo;s cities?" />
          {userHasToken ? (
            <>
              <ul className={styles.list}>
                {cities.slice(0, citiesToShow).map(city => (
                  <City key={city.id} city={city} />
                ))}
              </ul>
              {showMore && (
                <ul className={styles.list}>
                  {cities.slice(citiesToShow).map(city => (
                    <City key={city.id} city={city} />
                  ))}
                </ul>
              )}
              <button onClick={clickHandler} className={styles.button}>
                {!showMore ? 'Load more cities...' : 'Show less'}
              </button>
            </>
          ) : (
            <ErrorComponent message="No weather data available at the moment" button="TRY_AGAIN" />
          )}
        </main>
      )}
      <Outlet />
    </>
  );
};

export default Cities;

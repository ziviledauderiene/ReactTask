import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';
import { CombinedState } from '../../store/index-redux';
import { TempActionConfig, TempActions, TempUnits } from '../../store/tempUnits-redux';
import { Theme, ThemeContext, ThemeContextConfig } from '../../store/theme-context';
import GiHamburgerMenu from '../UI/Icons/GiHamburgerMenu';
import VscChromeClose from '../UI/Icons/VscChromeClose';
import styles from './Header.module.scss';
import Navigation from './Navigation/Navigation';

const Header: React.FunctionComponent = () => {
  const { theme, toggleTheme }: ThemeContextConfig = useContext(ThemeContext);
  const dispatch: Dispatch<TempActionConfig> = useDispatch();
  const tempUnit = useSelector<CombinedState, TempUnits>(state => state.tempUnit);
  const isCelsius: boolean = tempUnit === TempUnits.CELSIUS;
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  const toggleTempUnits = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: event.target.value });
  };
  const burgerClickHAndler = (): void => {
    setShowMobileNav(prevState => !prevState);
  };
  return (
    <header className={`${styles.header} ${theme === Theme.DARK && styles[theme]}`}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1 className={styles.titleContent}>
            <a href="/" className={styles.titleLink}>
              Nice Weather App
            </a>
          </h1>
          <a href="/" className={styles.logo}></a>
        </div>
        <Navigation classname={styles.nav} />
      </div>
      <div className={styles.navBurger} onClick={burgerClickHAndler}>
        {!showMobileNav ? <GiHamburgerMenu /> : <VscChromeClose />}
      </div>
      {showMobileNav && (
        <Navigation classname={styles.mobileNav} setShowMobileNav={setShowMobileNav} />
      )}
      <div className={styles.buttonsContainer}>
        <div className={styles.degreesChanger}>
          <p className={styles.buttonLabel}>Choose temperature units:</p>
          <select
            className={`${styles.select} ${theme === Theme.DARK && styles[theme]}`}
            onChange={toggleTempUnits}
          >
            <option className={styles.option} value={TempActions.TO_CELSIUS} selected={isCelsius}>
              Celsius °C
            </option>
            <option
              className={styles.option}
              value={TempActions.TO_FAHRENHEIT}
              selected={!isCelsius}
            >
              Fahrenheit °F
            </option>
          </select>
        </div>
        <p className={styles.buttonLabel}>Toggle theme: </p>
        <div
          className={`${styles.themeSwitcher} ${theme === Theme.DARK && styles[theme]}`}
          onClick={toggleTheme}
        >
          <div className={styles.themeSwitcherButton}></div>
          <div className={styles.moonMaker}></div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);

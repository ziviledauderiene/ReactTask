import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext, ThemeContextConfig, Theme } from '../../store/theme-context';
import styles from './Header.module.scss';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Action, tempActions, tempUnits } from '../../store/store-redux';
import { Dispatch, Store } from 'redux';

const Header: React.FunctionComponent = () => {
  const { theme, toggleTheme }: ThemeContextConfig = useContext(ThemeContext);
  const dispatch: Dispatch<Action> = useDispatch();
  const tempUnit = useSelector<tempUnits, tempUnits>(state => state);
  const isCelsius: boolean = tempUnit === tempUnits.CELSIUS;

  const toggleTempUnits = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: event.target.value });
  };

  return (
    <header className={`${styles.header} ${theme === Theme.DARK && styles[theme]}`}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Nice Weather App</h1>
          <div className={styles.logo}></div>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.linkContainer}>
            <li className={styles.link}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={styles.link}>
              <NavLink
                to="/cities"
                className={({ isActive }) => (isActive ? styles.active : undefined)}
              >
                Cities
              </NavLink>
            </li>
            <li className={styles.link}>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : undefined)}
              >
                About
              </NavLink>
            </li>
            <li className={styles.link}>
              <NavLink
                to="/contacts"
                className={({ isActive }) => (isActive ? styles.active : undefined)}
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.degreesChanger}>
          <p className={styles.buttonLabel}>Choose temperature units:</p>
          <select
            className={`${styles.select} ${theme === Theme.DARK && styles[theme]}`}
            onChange={toggleTempUnits}
          >
            <option className={styles.option} value={tempActions.TO_CELSIUS} selected={isCelsius}>
              Celsius °C
            </option>
            <option
              className={styles.option}
              value={tempActions.TO_FAHRENHEIT}
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

### Home page:
![Screenshot 2022-10-29 at 21-31-30 React Training App](https://user-images.githubusercontent.com/96768501/198847582-9bf61220-3ed0-4307-a75c-b55d50831c14.png)

### Cities page:
![Screenshot 2022-10-29 at 21-31-57 React Training App](https://user-images.githubusercontent.com/96768501/198847589-0b02d950-c523-49a1-b04a-a06702719345.png)

### Contacts page (dark theme):
![Screenshot 2022-10-29 at 21-33-49 React Training App](https://user-images.githubusercontent.com/96768501/198847605-c4111507-65ae-4e38-a357-912cd09193bc.png)

# ReactTask - Task assignment

This task looks like an average task you will receive from us. But it's scope is bigger than usual, since we want to see as much skills as possible from you.

## Installation

NPM is strongly recommended instead of yarn

```
npm install
npm start
```

### Subject

You are about to create weather application with location detection.

### Technologies

1. React
2. Redux
3. Fill free to use any tools for UI mark-up
4. Router
5. Form
6. Tool for immutability (ex. ImmutableJS (unmantained), Immer)

### Full description

Use weather API: https://developer.foreca.com/#Forecasts. Note that this API is **NOT** public. Your task is to create
front-end for that API. Your application should not have any login buttons to authenticate against weather api. It
should happen silently for the user. You need to create next parts (every page has a layout with a header, footer and
navigation panel):

1. Main page with weather for the current location.
2. List page (may also be a flyout or any other kind of menu), where user can see the weather for all cities in the World
   (all available cities) sorted by country and city title.
3. Page with details about chosen (in a list from previous point) city.
4. Info page where user can see some information about the service.
5. Feedback page with a form for feedback on your site: please, create the form in survey style with some simple questions.
   Implement form submitting mechanism and save it in localStorage. For now don't bother yourself saving form data in DB.
6. Implement Dark/Light mode for your app. There should be some sort of switcher that changes current view.

### P.S.

There is a branch <name>\_<surname> created for you in original repository. Your task is to fork from this repo and work
in your branches there. At the end of the day, you should create PRs against your branches in original repo.

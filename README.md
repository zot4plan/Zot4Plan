# **Zot4Plan - UCI Undergraduate Progress Tracker**

By: [`Tram La`](https://www.linkedin.com/in/tram-la-680417200/) and [`Loc Khong`](https://www.linkedin.com/in/lockhong/)

<p align="center">
    <img src="https://user-images.githubusercontent.com/70680546/165196022-10b8483c-fb8b-4ca1-96e1-19756dd659c5.PNG" width="720" />
</p>

<div align="center"> 

[Start building your UCI plan here!!!](https://www.zot4plan.com) 🎉

</div>

## **Description** 📖

Zot4Plan is a schedule planning tool that allows Anteaters to plan out their undergraduate years. In order to make the planning process easier for users, our program will also display the ge/course requirements for the chosen major. All of the data we acquired for this program are collected from the UCI General Catalogue. Please make sure to check your schedule with your academic advisor. Thank you - Zot Zot Zot!


## **Features** 💻

 <!---div align="center">

![Major Selection](https://media.giphy.com/media/snYqfS3lBIIVlZNbVP/giphy.gif))

Required courses will be displayed after major selection

![Drag and Drop](https://media.giphy.com/media/qKIZtpMRtd0Ce0jKKC/giphy.gif)

Drag and drop feature that allows users to place a course in their planner)

![Users can add courses by using the search bar](https://media.giphy.com/media/rJWU8FL63vdU6KNBHN/giphy.gif)

Users can add courses by using the search bar

![Select GE courses by section](https://media.giphy.com/media/rJWU8FL63vdU6KNBHN/giphy.gif)

Select GE courses by section

</div-->

* Search bar that allows users to either select or search their major of choice. 💖

* A calendar that displays the chosen courses, divided by quarters.

    - Users can add an additional academic year by clicking on the "Add Year" button at the top of the calendar.

    - The additional year can be removed by clicking on the "-" button next to the year.

* Major/Minor Requirements Tab 🔥
    - Users can select up to three major and/or minor requirements.
    
    - Each dropdown represents a section in the requirement.

    - Drag and drop feature that allows users to place the courses in the desired quarter(s).

    - A search engine that users can use to search/include any additional courses.

* General Education Requirement Tab ❄️

    - 10 main dropdowns - each represents a GE category.

    - Each GE category dropdown contains courses that can be used to fulfill the requirement.

* Card pop-up that exhibits necessary information of that particular course

    - Course name

    - Course description

    - Unit(s)

    - Prerequisite, Restriction, Corequisite, Repeatability

    - GE fulfillment
    
    - Past terms that the course were offered

* Refresh button that allows users to remove all of the current courses on their calendar

* Save and Load Implementation 🍭

    - Users can save their calendar under a unique username.

    - Users can easily upload their saved schedule by providing that same unique username.

## **How to Run Program Locally** 🏃

Open 2 terminals: one is for client and the other is for server

* cd to client folder: 

```sh
npm install 
npm start
```

* cd to server folder: 

```sh
npm install
node server.js
```

## **Technologies** ⛄

* Front-End: React 17.0.39

    - React-Beautiful-DnD

    - React-Redux

    - React-Select

    - React-tooltip

    - Axios 

* Back-end: NodeJS 14.17.0

    - Cors

    - Express

    - Sequelize

    - Mysql

* Scrape and build data: Python 3.8.5

    - BeautifulSoup

    - Requests

    - Json

* Database: MySql 8.0.28

## **Performance** 🚀

<p align="center">

<img src="https://user-images.githubusercontent.com/48174888/166165232-0a0a871b-cab5-4d87-8b4d-d821d2691860.jpg" width="720"/> 

</p>

## **Creators & Maintainers** 😈

- Loc Duc Minh Khong [@lockhong](https://www.linkedin.com/in/lockhong/)
- Tram Bao La [@tramla](https://www.linkedin.com/in/tram-la-680417200/)

## **Members

- Warren Leu [@warrenleu](): Implemented prerequisite/corequisite checking feature
- Huong Le and Uyen Dinh: Advisors for UI implementation

## **Art Creators** 🎨

- Leyna Nguyen ♥️
- https://www.etsy.com/listing/797921174/anteater-stickers

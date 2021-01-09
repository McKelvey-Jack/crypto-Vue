### Welcome to my Crypto-Vue app

This app is my first attemped at using the Vue framework. Throughout the NorthCoders bootcamp that I have been on, we have used React for pretty much evertything. I decided that i would begin to look at Vue in my spare time and after a few days of playing with the framework i started working on this app.

The app makes a couple of requests to the coingecko api that provides live crypto data. The home view of the app shows a list of the top 100 coins as well as their icon, their latest price and their 24h price change. There is a search bar which filters the list.

Each list item is a link to a page which will show some market history for each coin in the form of an area chart built with vue-chartkick. This data is again from the coingecko api. I have enabled a filter for the chart to show data from 1 week up to 3 years

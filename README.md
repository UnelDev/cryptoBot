# cryptoBot
## this project is no longer maintained see [this section](#the-end-of-this-project)
crypto bot is a fictitious way to trade in crypto in discord. he use api of [coingecko](https://www.coingecko.com/en/api) directly and [CoinGecko-API](https://github.com/miscavage/CoinGecko-API) for interact with crypto market

# command
crypto bot is enough simple to use for not have many command. Here is the list:
- info {paramètre (id of crypto)}
    - to display the name
    - to display chart of 24hours evolution of price
    - to display the id of this crypto
    - to display the symbole (btc, eur, usd, ...)
    - to display the evolution of price in diferant time
    - to display pusbutton for buy this crypto
    - to display pusbutton for buy this crypto
    - to display pusbutton for vew this crypto in another time
- search {paramètre}
    - for search the parametr in all crypto /!\ warning only 10 result is display
- create
    - for create acount in the bot
- presentation or p
    - for see present state of market with 4 crypto : bitcoin, ethereum, binancecoin, iShares MSCI World ETF Tokenized Stock Defichain
- walet (? tag of user)
    - for to view your account or if is inform the walet of other account
- help
    - for vew this help in french
- limit
    - allows you to create limits and stop sells /!\ warning this commande is data consumer
- ping
    - retun ping of discord, you, coingecko(api), internal
- supr limit
    -for dellet limit sell/stop sell

# clone this bot in your server
to clone the bot you will have to follow these steps:
- clone this repo
- create .env in root of this project
     - add key DEV_TOKEN=token of bot dev
     - add key PUBLIC_TOKEN=token of bot (production)
     - add key LOGGING_CHANNEL=id of channel for logging(warning the bot must be invited)
     - add key IS_DEV=in your dev computer this key=false but in prod server this key=true
- initialise npm with npm i
- start with node . or node main.js

# slow-down
this bot is moderately functional because the coingecko api is limited at 50 request per second and 5 request per second for crypto history. And it's too little. If you wallet contains more of 5 crypto you will have to wait more than a minute for the graph to be generated !

# the end of this project
because everything [is slowed down](#slow-down), the development is horrible. Everything is too long, and d had to stop the development of this project.
to resume it I would need a [premium version of coingeko](https://www.coingecko.com/en/api/pricing) and is too expensive.

# statistic
in 43 days 164 commits (22 pull requests ) have been made for a total of 20 954 additions and 13 890 deletions


## [![Repography logo](https://images.repography.com/logo.svg)](https://repography.com) / Recent activity [![Time period](https://images.repography.com/27169276/UnelDev/cryptoBot/recent-activity/6d29ae32b9e75a131d181c042dfcd2d9_badge.svg)](https://repography.com)
[![Timeline graph](https://images.repography.com/27169276/UnelDev/cryptoBot/recent-activity/6d29ae32b9e75a131d181c042dfcd2d9_timeline.svg)](https://github.com/UnelDev/cryptoBot/commits)
[![Pull request status graph](https://images.repography.com/27169276/UnelDev/cryptoBot/recent-activity/6d29ae32b9e75a131d181c042dfcd2d9_prs.svg)](https://github.com/UnelDev/cryptoBot/pulls)
[![Trending topics](https://images.repography.com/27169276/UnelDev/cryptoBot/recent-activity/6d29ae32b9e75a131d181c042dfcd2d9_words.svg)](https://github.com/UnelDev/cryptoBot/commits)
[![Top contributors](https://images.repography.com/27169276/UnelDev/cryptoBot/recent-activity/6d29ae32b9e75a131d181c042dfcd2d9_users.svg)](https://github.com/UnelDev/cryptoBot/graphs/contributors)

## [![Repography logo](https://images.repography.com/logo.svg)](https://repography.com) / Top contributors
[![Top contributors](https://images.repography.com/27169276/UnelDev/cryptoBot/top-contributors/6d29ae32b9e75a131d181c042dfcd2d9_table.svg)](https://github.com/UnelDev/cryptoBot/graphs/contributors)

## [![Repography logo](https://images.repography.com/logo.svg)](https://repography.com) / Structure
[![Structure](https://images.repography.com/27169276/UnelDev/cryptoBot/structure/9c7791e8a4f20718d5e86c5383289130_table.svg)](https://github.com/UnelDev/cryptoBot)
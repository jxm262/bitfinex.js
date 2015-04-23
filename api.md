<a name="Bitfinex"></a>
## Bitfinex
**Kind**: global class  

* [Bitfinex](#Bitfinex)
  * [.ticker(symbol)](#Bitfinex#ticker)
  * [.stats(symbol)](#Bitfinex#stats)
  * [.lendbook(currency)](#Bitfinex#lendbook)
  * [.orderbook(symbol)](#Bitfinex#orderbook)
  * [.trades(symbol)](#Bitfinex#trades)
  * [.lends(currency)](#Bitfinex#lends)
  * [.symbols()](#Bitfinex#symbols)
  * [.symbolsDetails()](#Bitfinex#symbolsDetails)
  * [.newDeposit(params)](#Bitfinex#newDeposit)
  * [.newOrder(params)](#Bitfinex#newOrder)
  * [.newMultiOrder(params)](#Bitfinex#newMultiOrder)
  * [.cancelOrder(params)](#Bitfinex#cancelOrder)
  * [.cancelMultiOrder(params)](#Bitfinex#cancelMultiOrder)
  * [.cancelAllOrders()](#Bitfinex#cancelAllOrders)
  * [.replaceOrder(params)](#Bitfinex#replaceOrder)
  * [.orderStatus(params)](#Bitfinex#orderStatus)
  * [.positions()](#Bitfinex#positions)
  * [.claimPosition(params)](#Bitfinex#claimPosition)
  * [.balanceHistory(params)](#Bitfinex#balanceHistory)
  * [.movementHistory(params)](#Bitfinex#movementHistory)
  * [.pastTrades(params)](#Bitfinex#pastTrades)
  * [.newOrder(params)](#Bitfinex#newOrder)
  * [.cancelOffer(params)](#Bitfinex#cancelOffer)
  * [.offerStatus(params)](#Bitfinex#offerStatus)
  * [.activeOffers()](#Bitfinex#activeOffers)
  * [.activeCredits()](#Bitfinex#activeCredits)
  * [.activeSwaps()](#Bitfinex#activeSwaps)
  * [.closeSwap(params)](#Bitfinex#closeSwap)
  * [.walletBalances(params)](#Bitfinex#walletBalances)
  * [.accountInfo(params)](#Bitfinex#accountInfo)

<a name="Bitfinex#ticker"></a>
### bitfinex.ticker(symbol)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param |
| --- |
| symbol | 

<a name="Bitfinex#stats"></a>
### bitfinex.stats(symbol)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param |
| --- |
| symbol | 

<a name="Bitfinex#lendbook"></a>
### bitfinex.lendbook(currency)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param |
| --- |
| currency | 

<a name="Bitfinex#orderbook"></a>
### bitfinex.orderbook(symbol)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param |
| --- |
| symbol | 

<a name="Bitfinex#trades"></a>
### bitfinex.trades(symbol)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param |
| --- |
| symbol | 

<a name="Bitfinex#lends"></a>
### bitfinex.lends(currency)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param |
| --- |
| currency | 

<a name="Bitfinex#symbols"></a>
### bitfinex.symbols()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#symbolsDetails"></a>
### bitfinex.symbolsDetails()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#newDeposit"></a>
### bitfinex.newDeposit(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.currency | <code>string</code> | 
| params.method | <code>string</code> | 
| params.wallet_name | <code>string</code> | 

<a name="Bitfinex#newOrder"></a>
### bitfinex.newOrder(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.symbol | <code>string</code> | 
| params.amount | <code>integer</code> | 
| params.price | <code>number</code> | 
| params.exchange | <code>string</code> | 
| params.side | <code>string</code> | 
| params.type | <code>string</code> | 
| params.is_hidden | <code>boolean</code> | 

<a name="Bitfinex#newMultiOrder"></a>
### bitfinex.newMultiOrder(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.symbol | <code>string</code> | 
| params.amount | <code>integer</code> | 
| params.price | <code>number</code> | 
| params.exchange | <code>string</code> | 
| params.side | <code>string</code> | 
| params.type | <code>string</code> | 

<a name="Bitfinex#cancelOrder"></a>
### bitfinex.cancelOrder(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.order_id | <code>string</code> | 

<a name="Bitfinex#cancelMultiOrder"></a>
### bitfinex.cancelMultiOrder(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.order_ids | <code>Array.&lt;integer&gt;</code> | 

<a name="Bitfinex#cancelAllOrders"></a>
### bitfinex.cancelAllOrders()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#replaceOrder"></a>
### bitfinex.replaceOrder(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.order_id | <code>integer</code> | 
| params.symbol | <code>string</code> | 
| params.amount | <code>number</code> | 
| params.price | <code>number</code> | 
| params.exchange | <code>string</code> | 
| params.side | <code>string</code> | 
| params.type | <code>string</code> | 
| params.is_hidden | <code>boolean</code> | 

<a name="Bitfinex#orderStatus"></a>
### bitfinex.orderStatus(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.order_id | <code>Array.&lt;integer&gt;</code> | 

<a name="Bitfinex#positions"></a>
### bitfinex.positions()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#claimPosition"></a>
### bitfinex.claimPosition(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.order_id | <code>integer</code> | 

<a name="Bitfinex#balanceHistory"></a>
### bitfinex.balanceHistory(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.currency | <code>string</code> | 
| params.since | <code>Date</code> | 
| params.until | <code>Date</code> | 
| params.limit | <code>integer</code> | 
| params.wallet | <code>string</code> | 

<a name="Bitfinex#movementHistory"></a>
### bitfinex.movementHistory(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.currency | <code>string</code> | 
| params.method | <code>string</code> | 
| params.since | <code>date</code> | 
| params.until | <code>number</code> | 
| params.limit | <code>integer</code> | 

<a name="Bitfinex#pastTrades"></a>
### bitfinex.pastTrades(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.currency | <code>string</code> | 
| params.timestamp | <code>string</code> | 
| params.limit_trades | <code>number</code> | 

<a name="Bitfinex#newOrder"></a>
### bitfinex.newOrder(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.currency | <code>string</code> | 
| params.amount | <code>amount</code> | 
| params.rate | <code>rate</code> | 
| params.period | <code>period</code> | 
| params.direction | <code>direction</code> | 

<a name="Bitfinex#cancelOffer"></a>
### bitfinex.cancelOffer(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.offer_id | <code>integer</code> | 

<a name="Bitfinex#offerStatus"></a>
### bitfinex.offerStatus(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.offer_id | <code>integer</code> | 

<a name="Bitfinex#activeOffers"></a>
### bitfinex.activeOffers()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#activeCredits"></a>
### bitfinex.activeCredits()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#activeSwaps"></a>
### bitfinex.activeSwaps()
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  
<a name="Bitfinex#closeSwap"></a>
### bitfinex.closeSwap(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.swap_id | <code>integer</code> | 

<a name="Bitfinex#walletBalances"></a>
### bitfinex.walletBalances(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.type | <code>string</code> | 
| params.currency | <code>string</code> | 
| params.amount | <code>number</code> | 
| params.available | <code>number</code> | 

<a name="Bitfinex#accountInfo"></a>
### bitfinex.accountInfo(params)
**Kind**: instance method of <code>[Bitfinex](#Bitfinex)</code>  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.pairs | <code>string</code> | 
| params.maker_fees | <code>number</code> | 
| params.taker_fees | <code>number</code> | 


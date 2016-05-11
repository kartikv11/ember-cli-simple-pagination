# Ember-cli-simple-pagination

Simple Pagination Ember Component providing all basic pagination functionalities.
- Uses [Material Design Lite](https://getmdl.io/index.html).

## Installation

```bash
ember install ember-cli-simple-pagination
```

## Cloning

* `git clone` this repository
* `npm install`
* `bower install`

## Usage & Actions

- `page_no` -- Initialize a Controller variable in who's template you want Pagination, e.g. `page_no: 1`
- `getByPageNumber` -- Action that returns `page_no` i.e. `the current page requested`, e.g.

```hbs
{{page-numbers totalPages=pageCount currentPage=page_no}}
```

```js
actions: {
  // Bubbled up action from addon
  // clicking on '2' after '5' or clicking 'previous' or 'next' buttons
  getByPageNumber: function(page_no){
      // Controller variable defined above to always contain the current requested page
      this.set('page_no', page_no);
      // whatever reload page functionality your page possesses
      this.send('reload');
    }
}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

*For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).*

import Ember from 'ember';

const PageNumberComponent = Ember.Component.extend({

  //to fetch the Caller Controller
  target: Ember.computed.alias("targetObject"),

  //pagesArray always contains less than or equal to 3 page numbers to be displayed
  pagesArray: [],
  //flag to check if there are more pages other than (currentPage - 1). This is used to show preceding ...(dots)
  hasPreviousPages: false,
  //flag to check if there are more pages other than (currentPage + 1). This is used to show succeeding ...(dots)
  hasNextPages: false,
  //flag to check if there is no content i.e. Zero pages
  hasZeroPages: false,

  /*
    initializeComponent is triggered upon Component initialization each time
   */
  initializeComponent: function(){
    var self = this;
    var pagesArray = [];
    var totalPages = Number(this.get("totalPages"));
    var currentPage = Number(this.get("currentPage"));
    if(totalPages !== 0){
      self.set('selectedPage',currentPage);
      for (var i = 1; i <= totalPages; i++) {
        if((i == (currentPage+1))||(i == (currentPage-1))||(i == currentPage)){
          pagesArray.push(i);
          continue;
        }
        if(i > (currentPage+1)){
          self.set('hasNextPages', true);
          continue;
        }
        if(i < (currentPage-1)){
          self.set('hasPreviousPages', true);
          continue;
        }
      }
      this.set('pagesArray', pagesArray.sort());
    }else{
      self.set('hasZeroPages',true);
    }
  }.on("init"),

  /*
    Maintains status(active, disabled) of prev Page Button in the Component.
   */
  canStepForward: function() {
    var page = Number(this.get("currentPage"));
    var totalPages = Number(this.get("totalPages"));
    return page < totalPages;
  }.property("currentPage", "totalPages"),

  /*
    Maintains status(active, disabled) of next Page Button in the Component.
   */
  canStepBackward: function() {
    var page = Number(this.get("currentPage"));
    return page > 1;
  }.property("currentPage"),

  actions: {
    /*
      Calls the target Controller's 'getByPageNumber' action with the page number to be loaded
     */
    pageClicked: function(number) {
      this.set("currentPage", number);
      this.get('target').send('getByPageNumber', number);
    },

    /*
      incrementPage is called whenever the buttons are clicked:
      - Previous page button click: function is called with num= -1
      - Next page button click: function is called with num= +1

      Calls the target Controller's 'getByPageNumber' action with the page number to be loaded
     */
    incrementPage: function(num) {
      var currentPage = Number(this.get("currentPage")),
          totalPages = Number(this.get("totalPages"));
      if(currentPage === totalPages && num === 1) { return false; }
      if(currentPage <= 1 && num === -1) { return false; }
      this.incrementProperty('currentPage', num);
      var newPage = this.get('currentPage');
      this.get('target').send('getByPageNumber', newPage);
    },

    /*
      Generates a list of PreviousPages. This is called when the preceding ...(dots) are clicked(if present)
     */
    listPreviousPages: function(){
      var self = this;
      var pagesArray = [];
      var page = this.get('selectedPage');
      self.set('hasNextPages', true);
      var totalPages = Number(this.get("totalPages"));
      if(page >= 3){
        for (var i = page-1; i >= 1; i--) {
          if(i >= (page-3)){
            pagesArray.push(i);
            continue;
          }
          if(i < (page-3)){
            self.set('hasPreviousPages', true);
            continue;
          }
        }
        this.set('pagesArray', pagesArray.sort());
        this.set('selectedPage',pagesArray[1]);
      }else {
        self.set('hasPreviousPages', false);
      }
    },

    /*
      Generates a list of NextPages. This is called when the succeeding ...(dots) are clicked(if present)
     */
    listNextPages: function(){
      var self = this;
      var pagesArray = [];
      var page = this.get('selectedPage');
      self.set('hasPreviousPages', true);
      var totalPages = Number(this.get("totalPages"));
      if(page <= (totalPages - 2)){
        for (var i = page+1; i <= totalPages; i++) {
          if(i <= (page+3)){
            pagesArray.push(i);
            continue;
          }
          if(i > (page+3)){
            self.set('hasNextPages', true);
            continue;
          }
        }
        this.set('pagesArray', pagesArray.sort());
        this.set('selectedPage',pagesArray[1]);
      }else{
        self.set('hasNextPages', false);
      }
    }
  }
});

export default PageNumberComponent;

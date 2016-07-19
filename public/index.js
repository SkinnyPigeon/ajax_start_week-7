window.onload = function() {
  console.log( "Window Loaded. Now Go Kill")

  var url = "https://restcountries.eu/rest/v1"
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.onload = function() {

    if( request.status === 200 ) {
      var jsonString = request.responseText;
      countries = JSON.parse( jsonString );
    } 
    main()
  }
  request.send( null );
}


function main() {

  var regions = [ "Asia", "Africa", "Americas", "Europe", "Oceania" ]

  regions.forEach( function( country ) {
    var optionRegion = document.createElement( "option" );
    optionRegion.innerHTML = country;
    var selectRegion = document.getElementById( "region-selector" );
    selectRegion.appendChild( optionRegion )
  })

  addedRegion = JSON.parse( localStorage.getItem( "region_list" ) ) || [];


  var regionButton = document.getElementById( "region-select" );
  var regionForm = document.getElementById( "region" );
  regionButton.onclick = function( event ) {
    event.preventDefault( event );
    var currentRegion = document.getElementById( "region-selector" ).value;
    // tryThis( currentRegion )
  }

  // function tryThis( currentRegion ) {
    countries.forEach( function( country ) {
      // if( country.region === currentRegion )
        var option = document.createElement( "option" );
      option.innerHTML = country.name;
      var select = document.getElementById( "selector" );
      select.appendChild( option );
    } )
  // }


  addedCountry = JSON.parse( localStorage.getItem( "country_app_list" ) ) || [];
  createEntry( addedCountry )

  var button = document.getElementById( "select" );
  var form = document.getElementById( "drop-down" );

  button.onclick = function( event ) {
    event.preventDefault( event )
    var current = document.getElementById( "selector" ).value
    displayCountry( current )
  }

  var displayCountry = function( current ) {
    var found = countries.filter( function( country ) {
      return country.name === current; 
    } )
    createEntry( found[0] );
  }

  function createEntry( found ){
   var ul = document.getElementById('country-list');
   if(ul.childNodes[0]){
     ul.removeChild(ul.childNodes[0]);
   }
   countryCard( ul, found )
 }

 function countryCard( ul, found ) {

  var li = document.createElement('li');
  var hr = document.createElement('hr');
  var he = document.createElement( "h2" );

  li.innerHTML =  "<h3>Name:</h3> " + found.name + " <h3>Capital:</h3> " + found.capital + " <h3>Pop:</h3> " + found.population
  he.innerHTML = "Neighbours:"

  ul.appendChild(li);
  li.appendChild(hr);
  li.appendChild( he );

  localStorage.setItem( "country_app_list" , JSON.stringify( found ) );
  borderCountries( found.borders )
}

function borderCountries( countryBorders ) {
  var borders = [];
  for( border of countryBorders ) {
    var neighbour = countries.filter( function( country ) {
      return country.alpha3Code === border;
    });
    borders.push( neighbour );
  } 
  borderCheck( borders )
}

function borderCheck( borders ) {
  var borderList = document.getElementById( "border-list" )
  while (borderList.childNodes[0] != null ) {
    borderList.removeChild( borderList.firstChild );
  }

  for( country of borders) {
    var li = document.createElement( "li" );
    var hr = document.createElement( "hr" );
    li.innerHTML = "<h4>Name:</h4>" + country[0].name + "<h4>Capital:</h4>" + country[0].capital + "<h4>Pop: </h4>" + country[0].population;
    borderList.appendChild( li );
    borderList.appendChild( hr );
  }
}

}







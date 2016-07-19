
window.onload = function() {
  console.log( "Window Loaded. Now Go Kill")

  var url = "https://restcountries.eu/rest/v1"
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.onload = function() {

    if( request.status === 200 ) {
      var jsonString = request.responseText;
      countries = JSON.parse( jsonString );
      // var country = countries[0];
    } 
    main()
  }
  request.send( null );
}

function main() {
  countries.forEach( function( country ) {
    var option = document.createElement( "option" );
    option.innerHTML = country.name;
    var select = document.getElementById( "selector" );
    select.appendChild( option );
  } )

  var button = document.getElementById( "select" );
  var form = document.getElementById( "drop-down" );
  button.onclick = function( event ) {
    event.preventDefault( event )
    var current = document.getElementById( "selector" ).value
    // console.log( current )
    displayCountry( current )
  }

  var displayCountry = function( current ) {
    var found = countries.filter( function( country ) {
      return country.name === current; 
    } )
      createEntry( found[0] );

  }

  var createEntry = function( found ) {
    var name = document.createElement( "li" )
    var capital = document.createElement( "li" )
    var population = document.createElement( "li" )
    var hr = document.createElement( "hr" )
    name.innerHTML = "Name: " + found.name
    capital.innerHTML = "Capital: " + found.capital
    population.innerHTML = "Population: " + found.population;
    var ul = document.getElementById( "country-list" );
    ul.appendChild( name )
    ul.appendChild( capital )
    ul.appendChild( population )
    ul.appendChild( hr )

  }

}







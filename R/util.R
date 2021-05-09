#'Utility Functions
#'
#'Load the shiny drag and drop javascript dependencies
#'@import shiny htmltools
.onAttach <- function(...) {

	# register the js input handler to make the element reactive
	shiny::registerInputHandler("dragdropshiny.dropper", function(data,...) {
		if (is.null(data) | data == "")
	  	return(NULL)
		else
	  	return(data)
	}, force = TRUE)

  # Create link to javascript and css files for package, referenced below
  shiny::addResourcePath("shinydndvested", system.file("www", package = "shinyDNDvested"))
}

# htmlDependency js and css will be used in other functions with attachDependency
shinyDNDDep = htmltools::htmlDependency("shinyDNDvested", packageVersion("shinyDNDvested"),
	src = c("href" = "shinydndvested"), script = "dragndrop.js", stylesheet = "dragndrop.css")

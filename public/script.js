
/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....

        // draw the board....
        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * You may find the following links helpful: 
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/ 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){

    var canvas = $("#canvas"); 

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 600, H = 600; 
    canvas.css("height", H); 
    canvas.css("width", W);

    // The actual SVG element to add to. 
    // we make a jQuery object out of this, so that 
    // we can manipulate it via calls to the jQuery API. 
    var svg = $(makeSVG(W, H));
	var arr = state.board;
	var size = state.size;
    // TODO: Implement board drawing. 
    
    //  You will want to append elements to the 
    //  svg variable using the svg.append(....) 
    //  method. 
	var lines=W/(size-1);
	var temp=(W/(size-1));
	var i=1;
	while(i<size){
		svg.append(makeLine(0,temp,W, temp, "black","rgb(255,0,0)"));
		svg.append(makeLine(temp,0,temp,W, "black","rgb(255,0,0)"));
		temp=temp+lines;
		i++;
	}
	for(i=0;i<arr.length;i++){
		for(j=0;j<arr.length;j++){
			if(arr[i][j]==1){
				svg.append(makeCircle(lines*i, lines*j, 10, "blue"));
			}
			if(arr[i][j]==2){
				svg.append(makeCircle(lines*i, lines*j, 10, "red"));
			}
		}
	}
	
    // append the svg object to the canvas object.
    canvas.append(svg);

}

function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
